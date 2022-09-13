import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import dayjs from "dayjs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useQuery } from "@tanstack/react-query";
import ScreenReaderFlash from "../components/screen-reader-flash";
import { fetchTimeblocks } from "../timeblocksApi";
import TimeblockList from "../components/timeblock-list";

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
  const query = useQuery(["timeblocks"], fetchTimeblocks);

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

      <ScreenReaderFlash />

      <main className="ml-auto mr-auto max-w-6xl p-4 space-y-10">
        <section>
          <div className="flex items-center mb-7">
            <button
              type="button"
              className="button-sm"
              onClick={() => setToday(dayjs(today).add(-1, "day").toDate())}
            >
              {t("previousDay")}
            </button>
            <h2
              className="block text-center mx-4 sm:mx-5 lg:mx-10 text-2xl"
              suppressHydrationWarning
            >
              {today.toLocaleDateString()}
            </h2>
            <button
              type="button"
              className="button-sm"
              onClick={() => setToday(dayjs(today).add(1, "day").toDate())}
            >
              {t("nextDay")}
            </button>
          </div>
          <TimeblockList readonly={false} timeblocks={query?.data} />
        </section>
        <nav className="space-x-5">
          <Link href="/">
            {/* TODO localize */}
            <a className="button">Home</a>
          </Link>
          <Link href="/new-task">
            {/* TODO localize */}
            <a className="button">Add task</a>
          </Link>
          <Link href="/new-timeblock">
            {/* TODO localize */}
            <a className="button">Add timeblock</a>
          </Link>
        </nav>
      </main>
    </>
  );
};

export default Home;
