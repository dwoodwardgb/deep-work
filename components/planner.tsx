import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTimeslots } from "../client/dummyApi";

export type Timeslot = {
  id?: string;
  start: Date;
  end: Date;
  description: string;
};

const Planner: FC<{
  day: Date;
  onPrevious: Function;
  onNext: Function;
}> = ({ day, onPrevious, onNext }) => {
  const { locale } = new Intl.NumberFormat().resolvedOptions();
  const { isLoading, error, data } = useQuery(["timeslots"], fetchTimeslots);

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
          className="block text-center mx-4 sm:mx-5 lg:mx-10 text-2xl"
          suppressHydrationWarning
        >
          Timeslot planner for {day.toLocaleDateString()}
        </p>
        <button type="button" className="button-sm" onClick={() => onNext()}>
          Next day
        </button>
      </div>
      {isLoading ? (
        <div role="progressbar">Loading</div>
      ) : error ? (
        <div>An error has occurred</div>
      ) : (
        <ol>
          {data!.map((ts) => (
            <li key={ts.id}>
              {ts.start.toLocaleTimeString(locale, { timeStyle: "short" })} to{" "}
              {ts.end.toLocaleTimeString(locale, { timeStyle: "short" })}:{" "}
              {ts.description}
            </li>
          ))}
        </ol>
      )}
    </>
  );
};

export default Planner;
