import { FC } from "react";
import NewTimeslotForm from "./new-timeslot-form";

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
      <p suppressHydrationWarning>
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

      <NewTimeslotForm
        onSubmit={(data) => {
          console.debug(data);
        }}
      />
    </>
  );
};

export default Planner;
