import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import { Timebox } from "../components/planner";
import { createTimebox } from "../client/dummyApi";
import { screenReaderFlashAtom } from "../store";

export type TimeboxForm = {
  start: string;
  end: string;
  description: string;
};

function parseTimeInputString(i: string): Date {
  return dayjs(i).second(0).toDate();
}

function timeboxFormToTimebox(form: TimeboxForm): Timebox {
  return {
    start: parseTimeInputString(form.start),
    end: parseTimeInputString(form.end),
    description: form.description,
  };
}

const NewTimeboxForm = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getFieldState,
    reset,
  } = useForm<TimeboxForm>({
    shouldUseNativeValidation: false,
    reValidateMode: "onSubmit",
  });

  const [_, setFlash] = useAtom(screenReaderFlashAtom);

  const { t } = useTranslation("common");
  const queryClient = useQueryClient();
  const mutation = useMutation(createTimebox, {
    onMutate: async (newTimebox) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["timeboxs"]);

      // Snapshot the previous value
      const previousTimeboxes = queryClient.getQueryData(["timeboxs"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["timeboxs"], (old: Timebox[] | undefined) => [
        ...(old || []),
        {
          ...newTimebox,
          id: Math.round(Math.random() * 10000000000).toString(),
        },
      ]);

      // Return a context object with the snapshotted value
      return { previousTimeboxes };
    },
    onSuccess: () => {
      // TODO this is a hack but it works
      setFlash("");
      setTimeout(() => {
        setFlash(t("timeboxCreated"));
      });
      reset();
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err: Error, newTimebox, context) => {
      queryClient.setQueryData(["timeboxs"], context?.previousTimeboxes);
      return Promise.reject(err);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(["timeboxs"]);
    },
  });

  function dateIsValid(s: string) {
    s = s.trim();
    if (s.length > 0) {
      const d = new Date(s);
      if (isNaN(d.getTime())) {
        return t("badDate");
      } else {
        return true;
      }
    } else {
      return t("dateRequired");
    }
  }

  function validateForm(data: TimeboxForm) {
    const start = new Date(data.start);
    const end = new Date(data.end);
    if (start.getTime() > end.getTime()) {
      setError("end", {
        message: t("endAfterStart"),
      });
    } else {
      mutation.mutate(timeboxFormToTimebox(data));
    }
  }

  const start = getFieldState("start");
  const end = getFieldState("end");
  const description = getFieldState("description");

  console.debug("form render");

  return (
    <>
      <h2 className="block text-center mb-4 text-xl">{t("addTimebox")}</h2>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(validateForm)}
      >
        <div className="flex flex-col">
          <label className="" htmlFor="start">
            {t("startTime")} *
            <span className="text-red-600 font-bold float-right word-break-word">
              {errors?.start?.message}
            </span>
          </label>
          <input
            className={`textbox ${start.error ? "error" : ""}`}
            id="start"
            type="datetime-local"
            aria-invalid={errors.start ? "true" : "false"}
            {...register("start", {
              validate: dateIsValid,
              maxLength: { value: 140, message: t("valueTooLong") },
            })}
          />
        </div>

        <div className="flex flex-col">
          <label className="" htmlFor="end">
            {t("endTime")} *
            <span className="text-red-600 font-bold float-right word-break-word">
              {errors?.end?.message}
            </span>
          </label>
          <input
            className={`textbox ${end.error ? "error" : ""}`}
            id="end"
            type="datetime-local"
            aria-invalid={errors.end ? "true" : "false"}
            {...register("end", {
              validate: dateIsValid,
              maxLength: { value: 140, message: t("valueTooLong") },
            })}
          />
        </div>

        <div className="flex flex-col">
          <label className="" htmlFor="description">
            {t("description")} *
            <span className="text-red-600 font-bold float-right word-break-word">
              {errors?.description?.message}
            </span>
          </label>
          <input
            className={`textbox ${description.error ? "error" : ""}`}
            id="description"
            type="text"
            aria-invalid={errors.description ? "true" : "false"}
            {...register("description", {
              required: t("descriptionRequired"),
              maxLength: {
                value: 140,
                message: t("descriptionCharacterLimit"),
              },
            })}
          />
        </div>

        {mutation.isError && (
          <div className="alert error" role="alert">
            {t("errorCreatingTimebox")}
          </div>
        )}

        <div className="mt-4 self-end space-x-4">
          <button
            className="button"
            type="button"
            onClick={() => {
              reset();
              mutation.reset();
            }}
            disabled={mutation.isLoading}
          >
            {t("reset")}
          </button>
          <button
            className="button"
            type="submit"
            disabled={mutation.isLoading}
          >
            {t("add")}
          </button>
        </div>
      </form>
    </>
  );
};

export default NewTimeboxForm;
