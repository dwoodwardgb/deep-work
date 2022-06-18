import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Planner, { Timeslot } from "../components/planner";

const Home: NextPage = () => {
  const [timeslots, setTimeslots] = useState<Timeslot[]>([]);

  return (
    <>
      <Head>
        <title>Timeslot planner</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Planner
          day={new Date()}
          timeslots={timeslots}
          onNewTimeslot={(newTimeslot) =>
            setTimeslots(timeslots.concat([newTimeslot]))
          }
        />
      </main>
    </>
  );
};

export default Home;
