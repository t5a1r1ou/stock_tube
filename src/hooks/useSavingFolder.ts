import { createSignal } from "solid-js";
import {
  getSavingFolder,
  setSavingFolderName,
  setSavingFolderIcon,
  setSavingFolderId,
} from "../store/savingFolder";
import { createStore } from "solid-js/store";
import { addFolder, getFolders } from "../store/folders";

type FolderError = {
  name: string;
  icon: string;
};

export const useSavingFolder = () => {
  const [error, setError] = createStore<FolderError>({
    name: "",
    icon: "",
  });
  const [isValidForm, setIsValidForm] = createSignal<boolean>(false);

  const savingFolder = () => getSavingFolder();

  const watchValidation = () => {
    if (savingFolder().name === "" || savingFolder().icon === "") {
      return false;
    }
    return true;
  };

  const onInputName = (value: string) => {
    setSavingFolderName(value);
    setIsValidForm(watchValidation());
    if (value === "") {
      setError({
        ...error,
        name: "新規フォルダを入力してください",
      });
    } else {
      setError({
        ...error,
        name: "",
      });
    }
  };

  const onInputIcon = (value: string) => {
    setSavingFolderIcon(value);
    setIsValidForm(watchValidation());
    if (value === "") {
      setError({
        ...error,
        icon: "アイコンを選択してください",
      });
    } else {
      setError({
        ...error,
        icon: "",
      });
    }
  };

  const submit = (e: Event) => {
    e.preventDefault();

    if (!watchValidation()) {
      return;
    }

    const folderCount = getFolders().length;
    setSavingFolderId(`temp${folderCount}`);

    addFolder(savingFolder());
  };

  return { error, isValidForm, onInputName, onInputIcon, submit };
};
