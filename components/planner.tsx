import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { fetchTimeboxes } from "../client/dummyApi";

export type Timebox = {
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
  const { isLoading, error, data } = useQuery(["timeboxs"], fetchTimeboxes);
  const { t } = useTranslation("common");

  return (
    <>
      <div className="flex items-center mb-4">
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
          {t("timeboxsForDay", { day: day.toLocaleDateString() })}
        </h2>
        <button type="button" className="button-sm" onClick={() => onNext()}>
          {t("nextDay")}
        </button>
      </div>
      <section>
        {isLoading ? (
          <div role="progressbar" aria-busy="true">
            {t("loading")}
          </div>
        ) : (
          <>
            {!!error && (
              <div role="alert" className="alert error">
                {t("errorFetching")}
              </div>
            )}
            {data?.length ? (
              <ol style={{ wordBreak: "break-word" }}>
                {data!.map((ts) => (
                  <li key={ts.id}>
                    {ts.start.toLocaleTimeString(locale, {
                      timeStyle: "short",
                    })}{" "}
                    to{" "}
                    {ts.end.toLocaleTimeString(locale, { timeStyle: "short" })}:{" "}
                    {ts.description}
                  </li>
                ))}
              </ol>
            ) : undefined}
            {!error && !data?.length && <p>{t("noTimeboxes")}</p>}
          </>
        )}
      </section>
    </>
  );
};

export default Planner;
