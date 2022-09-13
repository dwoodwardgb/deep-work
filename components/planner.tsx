import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { fetchTimeblocks } from "../client/dummyApi";
import { Timeblock } from "./timeblock";

export type Timeblock = {
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
  const query = useQuery(["timeblocks"], fetchTimeblocks);
  const { t } = useTranslation("common");
  const [childError, setChildError] = useState("");

  function clearError() {
    setChildError("");
  }

  return (
    <>
      <div className="flex items-center mb-7">
        <button
          type="button"
          className="button-sm"
          onClick={() => onPrevious()}
        >
          {t("previousDay")}
        </button>
        <h2
          className="block text-center mx-4 sm:mx-5 lg:mx-10 text-2xl"
          suppressHydrationWarning
        >
          {t("timeblocksForDay", { day: day.toLocaleDateString() })}
        </h2>
        <button type="button" className="button-sm" onClick={() => onNext()}>
          {t("nextDay")}
        </button>
      </div>
      <section className="space-y-3">
        {query.isLoading ? (
          <div role="progressbar" aria-busy="true">
            {t("loading")}
          </div>
        ) : (
          <>
            {!!query.error ? (
              <div role="alert" className="alert error">
                {t("errorFetching")}
              </div>
            ) : (
              !!childError && (
                <div role="alert" className="alert error">
                  {childError}
                </div>
              )
            )}
            {query.data?.length ? (
              <ol style={{ wordBreak: "break-word" }} className="space-y-3">
                {query.data!.map((tb) => (
                  <li key={tb.id} className="">
                    <Timeblock
                      timeblock={tb}
                      locale={locale}
                      onMutate={clearError}
                      onError={setChildError}
                      onSuccess={clearError}
                    />
                  </li>
                ))}
              </ol>
            ) : undefined}
            {!query.error && !query.data?.length && <p>{t("noTimeblocks")}</p>}
          </>
        )}
      </section>
    </>
  );
};

export default Planner;
