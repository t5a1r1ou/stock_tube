import { createSignal } from "solid-js";
import { addVideo } from "../store/videos";
import {
  clearSavingVideo,
  getSavingVideo,
  getSavingVideoFolder,
  setSavingVideoFolder,
} from "../store/savingVideo";
import { user } from "../store/user";
import { useCommon } from "./useCommon";

export const useSavingVideo = () => {
  const [error, setError] = createSignal<string>("");
  const [isValidForm, setIsValidForm] = createSignal<boolean>(false);
  const savingVideo = () => getSavingVideo();
  const savingVideoFolder = () => getSavingVideoFolder();

  const { observeSearchStockedVideo } = useCommon();

  const watchValidation = () => {
    if (savingVideoFolder() === "") {
      return false;
    }
    return true;
  };

  const onInput = (value: string) => {
    setSavingVideoFolder(value);
    setIsValidForm(watchValidation());
  };

  const submit = (e: Event) => {
    e.preventDefault();

    if (!watchValidation()) {
      setError("保存先のフォルダを設定してください");
      return;
    }

    addVideo({
      ...savingVideo(),
      folder_id: savingVideoFolder(),
      user_id: user()?.id,
    });
    observeSearchStockedVideo();
    clearSavingVideo();
  };

  return {
    submit,
    error,
    isValidForm,
    onInput,
  };
};
