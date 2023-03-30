import { createStore } from "solid-js/store";
import { Folder } from "../types/types";

const [folders, setFolders] = createStore<Folder[]>([
  { id: "default", name: "新規フォルダ", url_id: "default", icon: "🐱" },
]);

export const getFolders = () => folders;

export const getFolder = (id: Folder["id"]) =>
  folders.find((folder) => folder.id === id);

export const getFolderFromUrl = (url_id: Folder["url_id"]) =>
  folders.find((folder) => folder.url_id === url_id);

export const getFolderName = (id: Folder["id"]) =>
  folders.find((folder) => folder.id === id)?.name;

export const getFolderUrlId = (id: Folder["id"]) =>
  folders.find((folder) => folder.id === id)?.url_id;

export const addFolder = (folder: Folder) => {
  setFolders([...folders, folder]);
};

export const removeFolder = (id: Folder["id"]) => {
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
