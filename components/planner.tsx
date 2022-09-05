import { FC } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";
import { fetchTimeblocks } from "../client/dummyApi";
import { useDeleteTimeblock } from "../timeblocks";

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
  const { isLoading, error, data } = useQuery(["timeblocks"], fetchTimeblocks);
  const mutation = useDeleteTimeblock();
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
          {t("timeblocksForDay", { day: day.toLocaleDateString() })}
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
                {data!.map((tb) => (
                  <li key={tb.id} className="space-y-3">
                    <span className="mr-2">
                      {tb.start.toLocaleTimeString(locale, {
                        timeStyle: "short",
                      })}
                      &nbsp;
                      {t("to")}
                      &nbsp;
                      {tb.end.toLocaleTimeString(locale, {
                        timeStyle: "short",
                      })}
                      :&nbsp;
                      {tb.description}
                    </span>
                    &nbsp;
                    <button
                      className="button-sm"
                      type="button"
                      aria-label="delete"
                      onClick={() => {
                        mutation.mutate(tb);
                      }}
                    >
                      delete
                    </button>
                  </li>
                ))}
              </ol>
            ) : undefined}
            {!error && !data?.length && <p>{t("noTimeblocks")}</p>}
          </>
        )}
      </section>
    </>
  );
};

export default Planner;
