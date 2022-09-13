import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
import { useCreateTimeblock, Timeblock } from "../timeblocks";

export type TimeblockForm = {
  start: string;
  end: string;
  description: string;
};

function parseTimeInputString(i: string): Date {
  return dayjs(i).second(0).toDate();
}

function timeblockFormToTimeblock(form: TimeblockForm): Timeblock {
  return {
    start: parseTimeInputString(form.start),
    end: parseTimeInputString(form.end),
    description: form.description,
  };
}

const NewTimeblockForm = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getFieldState,
    reset,
  } = useForm<TimeblockForm>({
    shouldUseNativeValidation: false,
    reValidateMode: "onSubmit",
  });

  const { t } = useTranslation("common");
  const mutation = useCreateTimeblock({
    onSuccess() {
      reset();
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

  function validateForm(data: TimeblockForm) {
    const start = new Date(data.start);
    const end = new Date(data.end);
    if (start.getTime() > end.getTime()) {
      setError("end", {
        message: t("endAfterStart"),
      });
    } else {
      mutation.mutate(timeblockFormToTimeblock(data));
    }
  }

  const start = getFieldState("start");
  const end = getFieldState("end");
  const description = getFieldState("description");

  return (
    <>
      <h2 className="block text-center mb-4 text-xl">{t("addTimeblock")}</h2>
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
            {t("errorCreatingTimeblock")}
          </div>
        )}

        <div className="pt-2 self-end space-x-5">
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

export default NewTimeblockForm;
