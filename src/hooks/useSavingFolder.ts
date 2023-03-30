import { createSignal } from "solid-js";
import {
  getSavingFolder,
  setSavingFolderName,
  setSavingFolderIcon,
  setSavingFolderId,
  setSavingFolderUrlId,
} from "../store/savingFolder";
import { createStore } from "solid-js/store";
import { addFolder, getFolders } from "../store/folders";
import { Folder } from "../types/types";

type FolderError = {
  name: string;
  icon: string;
  url_id: string;
};

export const useSavingFolder = () => {
  const [error, setError] = createStore<FolderError>({
    name: "",
    icon: "",
    url_id: "",
  });
  const [isValidForm, setIsValidForm] = createSignal<boolean>(false);

  const savingFolder = () => getSavingFolder();

  const validateEmpty = (value: Folder["name"] | Folder["icon"]) =>
    value === "";
  const validateUrlId = (value: Folder["url_id"]) => !/^\w+$/.test(value);

  const watchValidation = () => {
    const savingFolderData = savingFolder();
    if (
      validateEmpty(savingFolderData.name) ||
      validateEmpty(savingFolderData.icon) ||
      validateUrlId(savingFolderData.url_id)
    ) {
      return false;
    }
    return true;
  };

  const onInputName = (value: string) => {
    setSavingFolderName(value);
    setIsValidForm(watchValidation());
    if (validateEmpty(value)) {
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

  const onInputUrlId = (value: string) => {
    setSavingFolderUrlId(value);
    setIsValidForm(watchValidation());
    if (validateUrlId(value)) {
      setError({
        ...error,
        url_id: "半角英数字とアンダーバーのみで入力してください",
      });
    } else {
      setError({
        ...error,
        url_id: "",
      });
    }
  };

  const onInputIcon = (value: string) => {
    setSavingFolderIcon(value);
    setIsValidForm(watchValidation());
    if (validateEmpty(value)) {
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

  return { error, isValidForm, onInputName, onInputUrlId, onInputIcon, submit };
};
