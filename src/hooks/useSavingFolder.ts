import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";
import { foldersStore, savingFolderStore, userStore } from "../store/";
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

  const validateEmpty = (value: Folder["name"] | Folder["icon"]) =>
    value === "";
  const validateUrlId = (value: Folder["url_id"]) => !/^\w+$/.test(value);

  const validateDuplicatedName = (name: Folder["name"]) => {
    return foldersStore.data.some((folder) => folder.name === name);
  };

  const validateDuplicatedUrlId = (url_id: Folder["url_id"]) => {
    return foldersStore.data.some((folder) => folder.url_id === url_id);
  };

  const watchValidation = () => {
    if (
      validateEmpty(savingFolderStore.data.name) ||
      validateEmpty(savingFolderStore.data.icon) ||
      validateDuplicatedName(savingFolderStore.data.name) ||
      validateDuplicatedUrlId(savingFolderStore.data.url_id) ||
      validateUrlId(savingFolderStore.data.url_id)
    ) {
      return false;
    }
    return true;
  };

  const inputName = (value: string) => {
    savingFolderStore.setName(value);
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
    savingFolderStore.setUrlId(value);
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
    savingFolderStore.setIcon(value);
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

    foldersStore.addFolder({
      ...savingFolderStore.data,
      user_id: userStore.data()?.id,
    });
  };

  return { error, isValidForm, inputName, inputUrlId, onInputIcon, submit };
};
