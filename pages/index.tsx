import type { NextPage } from "next";
import Head from "next/head";
import Planner from "../components/planner";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Timeslot planner</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Planner day={new Date()} timeslots={[]} />
      </main>
    </>
  );
};

export default Home;
