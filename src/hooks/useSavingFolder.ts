import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import {
  getSavingFolder,
  setSavingFolderName,
  setSavingFolderIcon,
  setSavingFolderUrlId,
} from "../store/savingFolder";
import { addFolder, getFolders } from "../store/folders";
import { user } from "../store/user";
import type { Folder } from "../types/types";

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

  const validateDuplicatedName = (name: Folder["name"]) => {
    const folders = () => getFolders();
    return folders().some((folder) => folder.name === name);
  };

  const validateDuplicatedUrlId = (url_id: Folder["url_id"]) => {
    const folders = () => getFolders();
    return folders().some((folder) => folder.url_id === url_id);
  };

  const watchValidation = () => {
    const savingFolderData = savingFolder();
    if (
      validateEmpty(savingFolderData.name) ||
      validateEmpty(savingFolderData.icon) ||
      validateDuplicatedName(savingFolderData.name) ||
      validateDuplicatedUrlId(savingFolderData.url_id) ||
      validateUrlId(savingFolderData.url_id)
    ) {
      return false;
    }
    return true;
  };

  const inputName = (value: string) => {
    setSavingFolderName(value);
    setIsValidForm(watchValidation());
    if (validateEmpty(value)) {
      setError({
        ...error,
        name: "新規フォルダを入力してください",
      });
    } else if (validateDuplicatedName(value)) {
      setError({
        ...error,
        name: "すでに同じ名前のフォルダが登録されています",
      });
    } else {
      setError({
        ...error,
        name: "",
      });
    }
  };

  const inputUrlId = (value: string) => {
    setSavingFolderUrlId(value);
    setIsValidForm(watchValidation());
    if (validateUrlId(value)) {
      setError({
        ...error,
        url_id: "半角英数字とアンダーバーのみで入力してください",
      });
    } else if (validateDuplicatedUrlId(value)) {
      setError({
        ...error,
        url_id: "すでに同じ名前のURL_IDが登録されています",
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

    addFolder({ ...savingFolder(), user_id: user()?.id });
  };

  return { error, isValidForm, inputName, inputUrlId, onInputIcon, submit };
};
