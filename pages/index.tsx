import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import dayjs from "dayjs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import Planner from "../components/planner";
import NewTimeblockForm from "../components/new-timeblock-form";
import ScreenReaderFlash from "../components/screen-reader-flash";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

function getStartOfToday() {
  return dayjs().startOf("day").toDate();
}

const Home: NextPage = () => {
  const [today, setToday] = useState<Date>(getStartOfToday());
  const { t } = useTranslation("common");

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <nav>
          <ol className="flex space-x-6 justify-end pr-6 pt-2">
            <li>
              <Link href="/" locale="en">
                <a>EN</a>
              </Link>
            </li>
            <li>
              <Link href="/" locale="es">
                <a>ES</a>
              </Link>
            </li>
          </ol>
        </nav>
      </header>

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
          <NewTimeblockForm />
        </section>
      </main>
    </>
  );
};

export default Home;
