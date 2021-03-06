import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import dayjs from "dayjs";
import Planner, { Timeslot } from "../components/planner";
import NewTimeslotForm, { TimeslotForm } from "../components/new-timeslot-form";

function parseTimeInputString(d: Date, i: string): Date {
  const [hours, minutes] = i.split(":");
  return dayjs(d)
    .hour(parseInt(hours))
    .minute(parseInt(minutes))
    .second(0)
    .toDate();
}

function timeslotFormToTimeslot(d: Date, form: TimeslotForm): Timeslot {
  return {
    start: parseTimeInputString(d, form.start),
    end: parseTimeInputString(d, form.end),
    description: form.description,
  };
}

function getStartOfToday() {
  return dayjs().startOf("day").toDate();
}

const Home: NextPage = () => {
  const [today, setToday] = useState<Date>(getStartOfToday());
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);

  return (
    <>
      <Head>
        <title>Timeslot planner</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="ml-auto mr-auto max-w-6xl md:flex p-4">
        <section className="flex-grow">
          <Planner
            day={today}
            timeslots={timeslots}
            onPrevious={() => {
              setToday(dayjs(today).add(-1, "day").toDate());
            }}
            onNext={() => {
              setToday(dayjs(today).add(1, "day").toDate());
            }}
          />
        </section>

        <section className="flex-grow ml-auto mr-auto max-w-xs mt-4 sm:max-w-md md:m-0 md:ml-4">
          <NewTimeslotForm
            onSubmit={(data) => {
              setTimeslots(
                timeslots.concat([timeslotFormToTimeslot(today, data)])
              );
            }}
          />
        </section>
      </main>
    </>
  );
};

export default Home;
