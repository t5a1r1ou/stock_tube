import { createSignal, createUniqueId } from "solid-js";
import { createStore } from "solid-js/store";
import { foldersStore, savingFolderStore, userStore } from "../store/";
import type { Folder, SavingFolder } from "../types/types";

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

  const validateDuplicatedName = (newFolder: SavingFolder) => {
    const validateEditMode = () => {
      if (
        foldersStore.data.some(
          (folder) =>
            folder.id !== newFolder.id && folder.name === newFolder.name
        )
      ) {
        return HAS_ERROR;
      } else {
        return NO_ERROR;
      }
    };

    const validateNewMode = () => {
      if (foldersStore.data.some((folder) => folder.name === newFolder.name)) {
        return HAS_ERROR;
      } else {
        return NO_ERROR;
      }
    };
    // 編集モードの場合
    if (newFolder.id) {
      return validateEditMode();
    } else {
      return validateNewMode();
    }
  };

  const validateDuplicatedUrlId = (url_id: Folder["url_id"]) => {
    if (foldersStore.data.some((folder) => folder.url_id === url_id)) {
      return HAS_ERROR;
    } else {
      return NO_ERROR;
    }
  };

  const validateName = (folder: SavingFolder) => {
    if (validateEmpty(folder.name)) {
      setError({
        ...error,
        name: "新規フォルダを入力してください",
      });
      return HAS_ERROR;
    } else if (validateDuplicatedName(folder)) {
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
      validateDuplicatedName(savingFolderStore.data)
    ) {
      return false;
    } else {
      return true;
    }
  };

  const submitValidation = () => {
    const invalidName = validateName(savingFolderStore.data);
    const invalidIcon = validateIcon(savingFolderStore.data.icon);
    if (invalidName || invalidIcon) {
      return true;
    } else {
      return false;
    }
  };

  const inputName = (folder: SavingFolder) => {
    savingFolderStore.setName(folder.name);
    setIsValidForm(watchValidation());
    validateName(folder);
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

  const submit = (e: Event) => {
    e.preventDefault();

    if (submitValidation()) {
      return false;
    }

    if (savingFolderStore.data.id) {
      foldersStore.updateData({
        ...savingFolderStore.data,
        id: savingFolderStore.data.id,
      });
    } else {
      foldersStore.addData({
        ...savingFolderStore.data,
        url_id: generateUrlId(),
        user_id: userStore.data()?.id,
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
