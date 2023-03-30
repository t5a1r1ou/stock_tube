import { createStore } from "solid-js/store";
import { Folder } from "../types/types";
import { supabase } from "../scripts/supabase";

const [folders, setFolders] = createStore<Folder[]>([]);

export const getFolders = () => folders;

export const setAllFolders = (data: Folder[]) => setFolders([...data]);

export const getFolder = (id: Folder["id"]) =>
  folders.find((folder) => folder.id === id);

export const getFolderFromUrl = (url_id: Folder["url_id"]) =>
  folders.find((folder) => folder.url_id === url_id);

export const getFolderName = (id: Folder["id"]) =>
  folders.find((folder) => folder.id === id)?.name;

export const getFolderUrlId = (id: Folder["id"]) =>
  folders.find((folder) => folder.id === id)?.url_id;

export const addFolder = async (folder: Omit<Folder, "id" | "created_at">) => {
  const { data: newFolder, error } = await supabase
    .from("folders")
    .insert(folder)
    .select();

  if (error) {
    console.log(error);
    throw new Error();
  } else if (newFolder) {
    setFolders([...folders, newFolder[0]] as Folder[]);
  }
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
