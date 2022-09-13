import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useTranslation } from "next-i18next";
//import { useCreateTimeblock, Timeblock } from "../timeblocks";

export type TaskForm = {
  description: string;
};

const NewTaskForm = ({}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getFieldState,
    reset,
  } = useForm<TaskForm>({
    shouldUseNativeValidation: false,
    reValidateMode: "onSubmit",
  });

  const { t } = useTranslation("common");
  // const mutation = useCreateTimeblock({
  //   onSuccess() {
  //     reset();
  //   },
  // });

  function validateForm(data: TaskForm) {
    // const start = new Date(data.start);
    // const end = new Date(data.end);
    // if (start.getTime() > end.getTime()) {
    //   setError("end", {
    //     message: t("endAfterStart"),
    //   });
    // } else {
    //   mutation.mutate(timeblockFormToTimeblock(data));
    // }
  }

  const description = getFieldState("description");

  return (
    <>
      <h2 className="block text-center mb-4 text-xl">Add task</h2>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(validateForm)}
      >
        <div className="flex flex-col">
          <label className="" htmlFor="description">
            {t("description")} *
            <span className="text-red-600 font-bold float-right word-break-word">
              {errors?.description?.message}
            </span>
          </label>
          <input
            className={`textbox ${description.error ? "error" : ""}`}
            id="description"
            type="text"
            aria-invalid={errors.description ? "true" : "false"}
            {...register("description", {
              required: t("descriptionRequired"),
              maxLength: {
                value: 140,
                message: t("descriptionCharacterLimit"),
              },
            })}
          />
        </div>

        {/* {mutation.isError && (
          <div className="alert error" role="alert">
            {t("errorCreatingTimeblock")}
          </div>
        )} */}

        <div className="pt-2 self-end space-x-5">
          <button
            className="button"
            type="button"
            onClick={() => {
              reset();
              // mutation.reset();
            }}
          >
            {t("reset")}
          </button>
          <button className="button" type="submit">
            {t("add")}
          </button>
        </div>
      </form>
    </>
  );
};

export default NewTaskForm;
