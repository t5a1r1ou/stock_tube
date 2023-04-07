import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import { Folder } from "../types/types";
import { supabase } from "../scripts/supabase";
import { useQueryFolders } from "../queries/useQueryFolders";
import { foldersStore } from ".";

const folders = () => {
  const [data, setData] = createStore<Folder[]>([]);

  const fetchData = async (callback: () => void) => {
    const { data: folders, error } = await useQueryFolders().finally(() =>
      callback()
    );

    if (error) {
      throw new Error();
    }

    setData(folders as Folder[]);
  };

  const getId = (id: Folder["id"]) => data.find((folder) => folder.id === id);

  const getFolderFromUrl = (url_id: Folder["url_id"]) =>
    data.find((folder) => folder.url_id === url_id);

  const getFolderName = (id: Folder["id"]) =>
    data.find((folder) => folder.id === id)?.name;

  const getFolderUrlId = (id: Folder["id"]) =>
    data.find((folder) => folder.id === id)?.url_id;

  const addData = async (folder: Omit<Folder, "id" | "created_at">) => {
    const { data: newFolder, error } = await supabase
      .from("folders")
      .insert(folder)
      .select()
      .single();

    if (error) {
      console.log(error);
      throw new Error();
    } else if (newFolder) {
      setData([...data, newFolder] as Folder[]);
    }
  };

  const removeData = async (id: Folder["id"]) => {
    const { error } = await supabase.from("folders").delete().eq("id", id);

    if (error) {
      throw new Error();
    } else {
      setData([...data.filter((folder) => folder.id !== id)]);
    }
  };

  const updateData = async (newFolder: Folder) => {
    const { data, error } = await supabase
      .from("folders")
      .update({ name: newFolder.name, icon: newFolder.icon })
      .eq("id", newFolder.id)
      .select()
      .single();

    if (error) {
      throw new Error();
    } else {
      const newFolders = foldersStore.data.map((folder) => {
        if (folder.id === newFolder.id) {
          return data;
        } else {
          return folder;
        }
      }) as Folder[];
      setData(newFolders);
    }
  };

  const clearData = () => {
    setData([]);
  };

  return {
    data,
    setData,
    fetchData,
    getId,
    getFolderFromUrl,
    getFolderName,
    getFolderUrlId,
    addData,
    removeData,
    updateData,
    clearData,
  };
};

export default createRoot(folders);
