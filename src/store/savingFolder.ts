import { createStore } from "solid-js/store";
import { Folder } from "../types/types";

const [savingFolder, setSavingFolder] = createStore<Omit<Folder, "created_at">>(
  {
    id: "",
    name: "",
    icon: "",
  }
);

export const getSavingFolder = () => savingFolder;

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

export const setSavingFolderId = (id: Folder["id"]) => {
  setSavingFolder({
    ...savingFolder,
    id,
  });
};
