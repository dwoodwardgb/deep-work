import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Planner from "../components/planner";

const Home: NextPage = () => {
  const [now] = useState(new Date());
  return (
    <>
      <Head>
        <title>Timeslot planner</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Planner
          day={now}
          timeslots={[
            { description: "work", start: new Date(), end: new Date() },
          ]}
        />
      </main>
    </>
  );
};

export default Home;
