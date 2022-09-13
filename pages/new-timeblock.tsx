import type { NextPage } from "next";
import Head from "next/head";
import dayjs from "dayjs";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import NewTimeblockForm from "../components/new-timeblock-form";
import ScreenReaderFlash from "../components/screen-reader-flash";
import TimeblockList from "../components/timeblock-list";
import { useQuery } from "@tanstack/react-query";
import { fetchTimeblocks } from "../timeblocksApi";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

const NewTimeblockPage: NextPage = () => {
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

      <main className="ml-auto mr-auto max-w-6xl p-4 space-y-16">
        <section>
          <TimeblockList readonly timeblocks={query?.data} />
        </section>

        <section style={{ maxWidth: 370, minWidth: 370 }}>
          <NewTimeblockForm />
        </section>
      </main>
    </>
  );
};

export default NewTimeblockPage;
