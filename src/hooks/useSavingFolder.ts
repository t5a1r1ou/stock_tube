import type { Folder, SavingFolder } from "../types/types";

import { createSignal, createUniqueId } from "solid-js";
import { createStore } from "solid-js/store";
import toast from "solid-toast";

import { foldersStore, savingFolderStore, userStore } from "../store/";

type FolderError = {
  name: string;
  icon: string;
  url_id: string;
};

export const useSavingFolder = () => {
  const HAS_ERROR = true;
  const NO_ERROR = false;
  const VALID = true;
  const INVALID = false;
  const [error, setError] = createStore<FolderError>({
    name: "",
    icon: "",
    url_id: "",
  });
  const [isValidForm, setIsValidForm] = createSignal<boolean>(false);

  const validates = {
    empty: (value: Folder["name"] | Folder["icon"]) => {
      if (value === "") {
        return HAS_ERROR;
      } else {
        return NO_ERROR;
      }
    },
    duplicatedName: (newFolder: SavingFolder) => {
      if (
        foldersStore.data.some((folder) =>
          newFolder.id
            ? folder.id !== newFolder.id && folder.name === newFolder.name
            : folder.name === newFolder.name,
        )
      ) {
        return HAS_ERROR;
      } else {
        return NO_ERROR;
      }
    },
    duplicatedUrlId: (url_id: Folder["url_id"]) => {
      if (foldersStore.data.some((folder) => folder.url_id === url_id)) {
        return HAS_ERROR;
      } else {
        return NO_ERROR;
      }
    },
  };

  const validateName = (folder: SavingFolder) => {
    if (validates.empty(folder.name)) {
      setError({
        ...error,
        name: "新規フォルダを入力してください",
      });
      return HAS_ERROR;
    } else if (validates.duplicatedName(folder)) {
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
    if (validates.empty(value)) {
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
      validates.empty(savingFolderStore.data.name) === HAS_ERROR ||
      validates.empty(savingFolderStore.data.icon) === HAS_ERROR ||
      validates.duplicatedName(savingFolderStore.data) === HAS_ERROR
    ) {
      return INVALID;
    } else {
      return VALID;
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

  const submit: (e: Event) => boolean = (e) => {
    e.preventDefault();

    const submitValidation = () => {
      const invalidName = validateName(savingFolderStore.data);
      const invalidIcon = validateIcon(savingFolderStore.data.icon);
      if (invalidName || invalidIcon) {
        return INVALID;
      } else {
        return VALID;
      }
    };

    if (submitValidation() === INVALID) {
      return false;
    }

    const generateUrlId = () => {
      let urlId = encodeURI(createUniqueId());
      while (validates.duplicatedUrlId(urlId)) {
        urlId = encodeURI(createUniqueId());
      }
      return urlId;
    };

    if (savingFolderStore.data.id) {
      foldersStore.updateData({
        ...savingFolderStore.data,
        id: savingFolderStore.data.id,
      });
      toast.success("フォルダの更新が完了しました。");
    } else {
      foldersStore.addData({
        name: savingFolderStore.data.name,
        icon: savingFolderStore.data.icon,
        url_id: generateUrlId(),
        user_id: userStore.data()?.id,
      });
      toast.success("フォルダの作成が完了しました。");
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
