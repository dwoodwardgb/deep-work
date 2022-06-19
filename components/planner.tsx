import { FC } from "react";

export type Timeslot = {
  start: Date;
  end: Date;
  description: string;
};

const Planner: FC<{
  day: Date;
  timeslots: Timeslot[];
}> = ({ day, timeslots }) => {
  const { locale } = new Intl.NumberFormat().resolvedOptions();

  return (
    <>
      <p className="block text-center mb-4" suppressHydrationWarning>
        Timeslot planner for {day.toLocaleDateString()}
      </p>
      <ol>
        {timeslots.map((ts) => (
          <li key={ts.start.getTime() + ts.end.getTime()}>
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
