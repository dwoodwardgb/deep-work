import { useTranslation } from "next-i18next";
import { useDeleteTimeblock, Timeblock } from "../timeblocks";

export function Timeblock({
  timeblock,
  locale,
  onError,
  onSuccess,
  onMutate,
  readonly,
}: {
  timeblock: Timeblock;
  locale: string;
  onError: (s: string) => void;
  onSuccess: () => void;
  onMutate: () => void;
  readonly: boolean;
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
      {!readonly && (
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
      )}
    </div>
  );
}
