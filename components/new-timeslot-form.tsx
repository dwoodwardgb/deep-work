import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { Timeslot } from "../components/planner";
import { createTimeslot } from "../client/dummyApi";

export type TimeslotForm = {
  start: string;
  end: string;
  description: string;
};

function parseTimeInputString(i: string): Date {
  return dayjs(i).second(0).toDate();
}

function timeslotFormToTimeslot(form: TimeslotForm): Timeslot {
  return {
    start: parseTimeInputString(form.start),
    end: parseTimeInputString(form.end),
    description: form.description,
  };
}

function dateIsValid(s: string) {
  s = s.trim();
  if (s.length > 0) {
    const d = new Date(s);
    if (isNaN(d.getTime())) {
      return "Cannot recognize date";
    } else {
      return true;
    }
  } else {
    return "Date required";
  }
}

const NewTimeslotForm = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getFieldState,
    reset,
  } = useForm<TimeslotForm>({
    shouldUseNativeValidation: false,
    reValidateMode: "onSubmit",
  });

  const queryClient = useQueryClient();
  const mutation = useMutation(createTimeslot, {
    onMutate: async (newTimeslot) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries(["timeslots"]);

      // Snapshot the previous value
      const previousTimeslots = queryClient.getQueryData(["timeslots"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["timeslots"], (old: Timeslot[] | undefined) => [
        ...(old || []),
        {
          ...newTimeslot,
          id: Math.round(Math.random() * 10000000000).toString(),
        },
      ]);

      // Return a context object with the snapshotted value
      return { previousTimeslots };
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["timeslots"], context?.previousTimeslots);
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries(["timeslots"]);
    },
  });

  function validateForm(data: TimeslotForm) {
    const start = new Date(data.start);
    const end = new Date(data.end);
    if (start.getTime() > end.getTime()) {
      setError("end", {
        message: "End must come after start",
      });
    } else {
      mutation.mutate(timeslotFormToTimeslot(data));
    }
  }

  const start = getFieldState("start");
  const end = getFieldState("end");
  const description = getFieldState("description");

  return (
    <>
      <p className="block text-center mb-4 text-xl">Add timeslot</p>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(validateForm)}
      >
        <div className="flex flex-col">
          <label className="" htmlFor="start">
            Start time *&nbsp;
            <span className="text-red-600 float-right word-break-word">
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
              maxLength: { value: 140, message: "Value is too long" },
            })}
          />
        </div>

        <div className="flex flex-col">
          <label className="" htmlFor="end">
            End time *&nbsp;
            <span className="text-red-600 float-right word-break-word">
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
              maxLength: { value: 140, message: "Value is too long" },
            })}
          />
        </div>

        <div className="flex flex-col">
          <label className="" htmlFor="description">
            Description *&nbsp;
            <span className="text-red-600 float-right word-break-word">
              {errors?.description?.message}
            </span>
          </label>
          <input
            className={`textbox ${description.error ? "error" : ""}`}
            id="description"
            type="text"
            aria-invalid={errors.description ? "true" : "false"}
            {...register("description", {
              required: "Description required",
              maxLength: {
                value: 140,
                message: "Description must be 140 characters or less",
              },
            })}
          />
        </div>

        <div className="mt-4 self-end space-x-4">
          <button
            className="button"
            type="button"
            onClick={() => {
              reset();
            }}
          >
            Reset
          </button>
          <button className="button" type="submit">
            Add
          </button>
        </div>
      </form>
    </>
  );
};

export default NewTimeslotForm;
