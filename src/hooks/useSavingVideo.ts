import { createSignal } from "solid-js";
import { savingVideoStore, userStore, videosStore } from "../store/";
import type { Folder } from "../types/types";
import toast from "solid-toast";

export const useSavingVideo = () => {
  const [error, setError] = createSignal<string>("");
  const [isValidForm, setIsValidForm] = createSignal<boolean>(false);

  const watchValidation = () => {
    if (savingVideoStore.data.folder_id === "") {
      return false;
    }
    return true;
  };

  const onInput = (value: Folder["id"], addFolderModalShow: () => void) => {
    if (value === "newFolder") {
      addFolderModalShow();
      return;
    }
    savingVideoStore.setFolder(value);
    setIsValidForm(watchValidation());
  };

  const submit = (e: Event, type: "new" | "edit") => {
    e.preventDefault();

    if (!watchValidation()) {
      setError("保存先のフォルダを設定してください");
      return;
    }

    if (type === "new") {
      videosStore.addData({
        ...savingVideoStore.data,
        folder_id: savingVideoStore.data.folder_id,
        user_id: userStore.data()?.id,
      });
    } else {
      videosStore.editData({
        youtube_id: savingVideoStore.data.youtube_id,
        folder_id: savingVideoStore.data.folder_id,
      });
    }
    savingVideoStore.clearData();
    toast.success("動画の追加が完了しました。");
  };

  return {
    submit,
    error,
    isValidForm,
    onInput,
  };
};
