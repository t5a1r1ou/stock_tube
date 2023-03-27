import { createStore } from "solid-js/store";
import { Folder } from "../types/types";

const [folders, setFolders] = createStore<Folder[]>([]);

export const getFolders = () => folders;

export const addFolder = (folder: Folder) => {
  setFolders([...folders, folder]);
};

export const removeVideo = (id: Folder["id"]) => {
  setFolders([...folders.filter((folder) => folder.id !== id)]);
};

export const update = (newFolder: Folder) => {
  const newFolders = [
    ...folders.map((folder) => {
      if (newFolder.id === folder.id) {
        return newFolder;
      } else {
        return folder;
      }
    }),
  ];
  setFolders(newFolders);
};