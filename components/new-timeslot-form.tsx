import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export type TimeslotForm = {
  start: string;
  end: string;
  description: string;
};

const NewTimeslotForm: FC<{ onSubmit: SubmitHandler<TimeslotForm> }> = ({
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TimeslotForm>();

  return (
    <>
      <p className="block text-center mb-4 text-xl">Add timeslot</p>
      <form
        className="grid sm:grid-cols-[auto_1fr] sm:grid-rows-[repeat(4, auto)] gap-2 sm:gap-x-4 sm:gap-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="sm:justify-self-end self-center" htmlFor="start">
          Start time
        </label>
        <input
          className="textbox"
          id="start"
          type="time"
          {...register("start")}
          required
        />

        <label className="sm:justify-self-end self-center" htmlFor="end">
          End time
        </label>
        <input
          className="textbox"
          id="end"
          type="time"
          {...register("end")}
          required
        />

        <label
          className="sm:justify-self-end self-center"
          htmlFor="description"
        >
          Description
        </label>
        <input
          className="textbox"
          id="description"
          type="text"
          {...register("description")}
          required
        />

        <button
          className="mt-2 sm:mt-0 sm:col-span-2 justify-self-end button"
          type="submit"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default NewTimeslotForm;
