import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export type TimeslotForm = {
  start: string;
  end: string;
  description: string;
};

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

const NewTimeslotForm: FC<{ onSubmit: SubmitHandler<TimeslotForm> }> = ({
  onSubmit,
}) => {
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

  function validateForm(data: TimeslotForm) {
    const start = new Date(data.start);
    const end = new Date(data.end);
    if (start.getTime() > end.getTime()) {
      setError("end", {
        message: "End must come after start",
      });
    } else {
      onSubmit(data);
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
