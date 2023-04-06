import { createSignal } from "solid-js";
import { savingVideoStore, userStore, videosStore } from "../store/";
import { useCommon } from "./useCommon";
import type { Folder } from "../types/types";

export const useSavingVideo = () => {
  const [error, setError] = createSignal<string>("");
  const [isValidForm, setIsValidForm] = createSignal<boolean>(false);

  const { observeSearchStockedVideo } = useCommon();

  const watchValidation = () => {
    if (savingVideoStore.data.folder_id === "") {
      return false;
    }
    return true;
  };

  const onInput = (value: Folder["id"]) => {
    savingVideoStore.setFolder(value);
    setIsValidForm(watchValidation());
  };

  const submit = (e: Event) => {
    e.preventDefault();

    if (!watchValidation()) {
      setError("保存先のフォルダを設定してください");
      return;
    }

    videosStore.addData({
      ...savingVideoStore.data,
      folder_id: savingVideoStore.data.folder_id,
      user_id: userStore.data()?.id,
    });
    observeSearchStockedVideo();
    savingVideoStore.clearData();
  };

  return {
    submit,
    error,
    isValidForm,
    onInput,
  };
};
