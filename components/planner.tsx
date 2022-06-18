import { FC } from "react";
import dayjs from "dayjs";
import NewTimeslotForm, { TimeslotForm } from "./new-timeslot-form";

export type Timeslot = {
  start: Date;
  end: Date;
  description: string;
};

function parseTimeInputString(i: string): Date {
  const [hours, minutes] = i.split(":");
  return dayjs()
    .hour(parseInt(hours))
    .minute(parseInt(minutes))
    .second(0)
    .toDate();
}

function timeslotFormToTimeslot(form: TimeslotForm): Timeslot {
  return {
    start: parseTimeInputString(form.start),
    end: parseTimeInputString(form.end),
    description: form.description,
  };
}

const Planner: FC<{
  day: Date;
  timeslots: Timeslot[];
  onNewTimeslot: (ts: Timeslot) => void;
}> = ({ day, timeslots, onNewTimeslot }) => {
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
          onNewTimeslot(timeslotFormToTimeslot(data));
        }}
      />
    </>
  );
};

export default Planner;
