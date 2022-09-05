import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useTranslation } from "next-i18next";
import { Timeblock } from "./components/planner";
import * as store from "./store";
import * as api from "./client/dummyApi";

export function useCreateTimeblock({ onSuccess }: { onSuccess: () => void }) {
  const { t } = useTranslation("common");
  const [_, setFlash] = useAtom(store.screenReaderFlashAtom);
  const queryClient = useQueryClient();
  const mutation = useMutation(api.createTimeblock, {
    onMutate: async (newTimeblock) => {
      await queryClient.cancelQueries(["timeblocks"]);

      const previousTimeblocks = queryClient.getQueryData(["timeblocks"]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["timeblocks"],
        (old: Timeblock[] | undefined) => [
          ...(old || []),
          {
            ...newTimeblock,
            id: Math.round(Math.random() * 10000000000).toString(),
          },
        ]
      );

      return { previousTimeblocks };
    },
    onSuccess: () => {
      setFlash("");
      setTimeout(() => {
        setFlash(t("timeblockCreated"));
      });
      onSuccess();
    },
    onError: (err: Error, _newTimeblock, context) => {
      queryClient.setQueryData(["timeblocks"], context?.previousTimeblocks);
      return Promise.reject(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["timeblocks"]);
    },
  });

  return mutation;
}

export function useDeleteTimeblock() {
  const { t } = useTranslation("common");
  const [_, setFlash] = useAtom(store.screenReaderFlashAtom);
  const queryClient = useQueryClient();
  const mutation = useMutation(api.deleteTimeblock, {
    onMutate: async (timeblockToDelete) => {
      await queryClient.cancelQueries(["timeblocks"]);

      const previousTimeblocks = queryClient.getQueryData(["timeblocks"]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["timeblocks"],
        (old: Timeblock[] | undefined) => [
          ...(old || []).filter((ts) => ts.id !== timeblockToDelete.id),
        ]
      );

      return { previousTimeblocks };
    },
    onSuccess: () => {
      setFlash("");
      setTimeout(() => {
        setFlash(t("timeblockDeleted"));
      });
    },
    onError: (err: Error, _newTimeblock, context) => {
      queryClient.setQueryData(["timeblocks"], context?.previousTimeblocks);
      return Promise.reject(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["timeblocks"]);
    },
  });

  return mutation;
}