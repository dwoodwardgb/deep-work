import { FC } from "react";

type Timeslot = {
  start: Date;
  end: Date;
  description: string;
};

const Planner: FC<{ day: Date; timeslots: Timeslot[] }> = ({
  day,
  timeslots,
}) => {
  const { locale } = new Intl.NumberFormat().resolvedOptions();

  return (
    <>
      <p>Timeslot planner for {day.toLocaleDateString()}</p>
      <ol>
        {timeslots.map((ts) => (
          <li key={ts.start.getTime() + ts.end.getTime()}>
            {ts.start.toLocaleTimeString(locale, { timeStyle: "short" })} to{" "}
            {ts.end.toLocaleTimeString(locale, { timeStyle: "short" })}:{" "}
            {ts.description}
          </li>
        ))}
      </ol>

      <section className="ml-auto mr-auto max-w-xs sm:max-w-md">
        <p className="block text-center">Add timeslot</p>
        <form
          className="grid sm:grid-cols-[auto_1fr] sm:grid-rows-[repeat(4, auto)] gap-2 sm:gap-x-4 sm:gap-y-8 p-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label className="sm:justify-self-end self-center" htmlFor="start">
            Start time
          </label>
          <input className="textbox" id="start" name="start" type="time" />

          <label className="sm:justify-self-end self-center" htmlFor="end">
            End time
          </label>
          <input className="textbox" id="end" name="end" type="time" />

          <label className="sm:justify-self-end self-center" htmlFor="description">
            Description
          </label>
          <input
            className="textbox"
            id="description"
            name="description"
            type="text"
          />

          <button className="mt-2 sm:mt-0 sm:col-span-2 justify-self-end button" type="submit">
            Add
          </button>
        </form>
      </section>
    </>
  );
};

export default Planner;
