import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import dayjs from "dayjs";
import Planner from "../components/planner";
import NewTimeslotForm from "../components/new-timeslot-form";
import ScreenReaderFlash from "../components/screen-reader-flash";

function getStartOfToday() {
  return dayjs().startOf("day").toDate();
}

const Home: NextPage = () => {
  const [today, setToday] = useState<Date>(getStartOfToday());

  return (
    <>
      <Head>
        <title>Timeslot planner</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="ml-auto mr-auto max-w-6xl md:flex p-4">
        <ScreenReaderFlash />

        <section className="flex-grow ml-auto mr-auto md:m-0">
          <Planner
            day={today}
            onPrevious={() => {
              setToday(dayjs(today).add(-1, "day").toDate());
            }}
            onNext={() => {
              setToday(dayjs(today).add(1, "day").toDate());
            }}
          />
        </section>

        <section
          className="ml-auto mr-auto mt-4 md:m-0 md:ml-4"
          style={{ maxWidth: 370, minWidth: 370 }}
        >
          <NewTimeslotForm />
        </section>
      </main>
    </>
  );
};

export default Home;
