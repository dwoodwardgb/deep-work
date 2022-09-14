import { FC, useState } from "react";
import { Timeblock } from "../timeblocks";
import { TimeblockRow } from "./timeblock-row";

const TimeblockList: FC<{
  readonly: boolean;
  timeblocks?: Timeblock[];
}> = ({ readonly, timeblocks }) => {
  const { locale } = new Intl.NumberFormat().resolvedOptions();
  const [childError, setChildError] = useState("");

  function clearError() {
    setChildError("");
  }

  return (
    <section className="space-y-3">
      {!!childError && (
        <div role="alert" className="alert error">
          {childError}
        </div>
      )}
      {timeblocks?.length ? (
        <ol style={{ wordBreak: "break-word" }} className="space-y-3">
          {timeblocks!.map((tb) => (
            <li key={tb.id} className="">
              <TimeblockRow
                readonly={readonly}
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
    </section>
  );
};

export default TimeblockList;
