import { createStore } from "solid-js/store";
import { Folder } from "../types/types";

const [savingFolder, setSavingFolder] = createStore<
  Omit<Folder, "id" | "created_at">
>({
  name: "",
  icon: "",
  url_id: "",
});

export const getSavingFolder = () => savingFolder;

export const clearSavingFolder = () =>
  setSavingFolder({
    name: "",
    icon: "",
    url_id: "",
  });

export const setSavingFolderName = (name: Folder["name"]) => {
  setSavingFolder({
    ...savingFolder,
    name,
  });
};

export const setSavingFolderIcon = (icon: Folder["icon"]) => {
  setSavingFolder({
    ...savingFolder,
    icon,
  });
};

export const setSavingFolderUrlId = (url_id: Folder["url_id"]) => {
  setSavingFolder({
    ...savingFolder,
    url_id,
  });
};
