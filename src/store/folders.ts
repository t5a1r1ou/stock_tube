import { createStore } from "solid-js/store";
import { Folder } from "../types/types";

const [folders, setFolders] = createStore<Folder[]>([
  { id: "test", name: "テスト", icon: "🐱" },
  { id: "test1", name: "テスト1", icon: "🐶" },
]);

export const getFolders = () => folders;

export const getFolderName = (id: Folder["id"]) =>
  folders.find((folder) => folder.id === id)?.name;

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
