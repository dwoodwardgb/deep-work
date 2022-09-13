import { useTranslation } from "next-i18next";
import { useDeleteTimeblock } from "../timeblocks";
import { Timeblock } from "./planner";

export function Timeblock({
  timeblock,
  locale,
  onError,
  onSuccess,
  onMutate,
}: {
  timeblock: Timeblock;
  locale: string;
  onError: (s: string) => void;
  onSuccess: () => void;
  onMutate: () => void;
}) {
  const mutation = useDeleteTimeblock({
    onError,
    onSuccess,
    onMutate,
  });
  const { t } = useTranslation("common");
  return (
    <div>
      <span className="mr-2">
        {timeblock.start.toLocaleTimeString(locale, {
          timeStyle: "short",
        })}
        &nbsp;
        {t("to")}
        &nbsp;
        {timeblock.end.toLocaleTimeString(locale, {
          timeStyle: "short",
        })}
        :&nbsp;
        {timeblock.description}
      </span>
      &nbsp;
      <button
        className="button-sm"
        type="button"
        aria-label="delete"
        onClick={() => {
          mutation.mutate(timeblock);
        }}
        // this is less necessary because tb will be unmounted when being deleted
        disabled={mutation.isLoading}
      >
        delete
      </button>
    </div>
  );
}
