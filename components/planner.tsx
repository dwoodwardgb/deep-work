import { FC } from "react";

export type Timeslot = {
  id: string;
  start: Date;
  end: Date;
  description: string;
};

const Planner: FC<{
  day: Date;
  timeslots: Timeslot[];
  onPrevious: Function;
  onNext: Function;
}> = ({ day, timeslots, onPrevious, onNext }) => {
  const { locale } = new Intl.NumberFormat().resolvedOptions();

  return (
    <>
      <div className="flex items-center mb-4">
        <button
          type="button"
          className="button-sm"
          onClick={() => onPrevious()}
        >
          Previous day
        </button>
        <p
          className="block text-center mx-10 text-2xl"
          suppressHydrationWarning
        >
          Timeslot planner for {day.toLocaleDateString()}
        </p>
        <button type="button" className="button-sm" onClick={() => onNext()}>
          Next day
        </button>
      </div>
      <ol>
        {timeslots.map((ts) => (
          <li key={ts.id}>
            {ts.start.toLocaleTimeString(locale, { timeStyle: "short" })} to{" "}
            {ts.end.toLocaleTimeString(locale, { timeStyle: "short" })}:{" "}
            {ts.description}
          </li>
        ))}
      </ol>
    </>
  );
};

export default Planner;
