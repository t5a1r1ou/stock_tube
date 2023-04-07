import { createSignal, createUniqueId } from "solid-js";
import { createStore } from "solid-js/store";
import { foldersStore, savingFolderStore, userStore } from "../store/";
import type { Folder } from "../types/types";

type FolderError = {
  name: string;
  icon: string;
  url_id: string;
};

export const useSavingFolder = () => {
  const HAS_ERROR = true;
  const NO_ERROR = false;
  const [error, setError] = createStore<FolderError>({
    name: "",
    icon: "",
    url_id: "",
  });
  const [isValidForm, setIsValidForm] = createSignal<boolean>(false);

  const validateEmpty = (value: Folder["name"] | Folder["icon"]) => {
    if (value === "") {
      return HAS_ERROR;
    } else {
      return NO_ERROR;
    }
  };

  const validateDuplicatedName = (name: Folder["name"]) => {
    if (foldersStore.data.some((folder) => folder.name === name)) {
      return HAS_ERROR;
    } else {
      return NO_ERROR;
    }
  };

  const validateDuplicatedUrlId = (url_id: Folder["url_id"]) => {
    if (foldersStore.data.some((folder) => folder.url_id === url_id)) {
      return HAS_ERROR;
    } else {
      return NO_ERROR;
    }
  };

  const validateName = (value: Folder["name"]) => {
    if (validateEmpty(value)) {
      setError({
        ...error,
        name: "新規フォルダを入力してください",
      });
      return HAS_ERROR;
    } else if (validateDuplicatedName(value)) {
      setError({
        ...error,
        name: "すでに同じ名前のフォルダが登録されています",
      });
      return HAS_ERROR;
    } else {
      setError({
        ...error,
        name: "",
      });
      return NO_ERROR;
    }
  };

  const validateIcon = (value: Folder["icon"]) => {
    if (validateEmpty(value)) {
      setError({
        ...error,
        icon: "アイコンを選択してください",
      });
      return HAS_ERROR;
    } else {
      setError({
        ...error,
        icon: "",
      });
      return NO_ERROR;
    }
  };

  const watchValidation = () => {
    if (
      validateEmpty(savingFolderStore.data.name) ||
      validateEmpty(savingFolderStore.data.icon) ||
      validateDuplicatedName(savingFolderStore.data.name)
    ) {
      return false;
    } else {
      return true;
    }
  };

  const submitValidation = () => {
    const invalidName = validateName(savingFolderStore.data.name);
    const invalidIcon = validateIcon(savingFolderStore.data.icon);
    if (invalidName || invalidIcon) {
      return true;
    } else {
      return false;
    }
  };

  const inputName = (value: Folder["name"]) => {
    savingFolderStore.setName(value);
    setIsValidForm(watchValidation());
    validateName(value);
  };

  const inputIcon = (value: Folder["icon"]) => {
    savingFolderStore.setIcon(value);
    setIsValidForm(watchValidation());
    validateIcon(value);
  };

  const generateUrlId = () => {
    let urlId = encodeURI(createUniqueId());
    while (validateDuplicatedUrlId(urlId)) {
      urlId = encodeURI(createUniqueId());
    }
    return urlId;
  };

  const submit = (e: Event, type: "new" | "edit") => {
    e.preventDefault();

    if (submitValidation()) {
      return false;
    }

    if (type === "new") {
      foldersStore.addData({
        ...savingFolderStore.data,
        url_id: generateUrlId(),
        user_id: userStore.data()?.id,
      });
    } else if (type === "edit" && savingFolderStore.data.id) {
      foldersStore.updateData({
        ...savingFolderStore.data,
        id: savingFolderStore.data.id,
      });
    }
    return true;
  };

  return {
    error,
    isValidForm,
    inputName,
    inputIcon,
    submit,
  };
};
