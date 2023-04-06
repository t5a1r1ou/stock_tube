import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import { Folder } from "../types/types";
import { supabase } from "../scripts/supabase";
import { useQueryFolders } from "../queries/useQueryFolders";

const folders = () => {
  const [data, setData] = createStore<Folder[]>([]);

  const fetchData = async () => {
    const { data: folders, error } = await useQueryFolders();

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

  const addFolder = async (folder: Omit<Folder, "id" | "created_at">) => {
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

  const removeFolder = async (id: Folder["id"]) => {
    const { error } = await supabase.from("folders").delete().eq("id", id);

    if (error) {
      throw new Error();
    } else {
      setData([...data.filter((folder) => folder.id !== id)]);
    }
  };

  const updateFolder = (newFolder: Folder) => {
    const newFolders = [
      ...data.map((folder) => {
        if (newFolder.id === folder.id) {
          return newFolder;
        } else {
          return folder;
        }
      }),
    ];
    setData(newFolders);
  };

  const clearFolder = () => {
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
    addFolder,
    removeFolder,
    updateFolder,
    clearFolder,
  };
};

export default createRoot(folders);
