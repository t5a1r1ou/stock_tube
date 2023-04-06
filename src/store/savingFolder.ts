import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import { Folder } from "../types/types";

const savingFolder = () => {
  const [data, setData] = createStore<Omit<Folder, "id" | "created_at">>({
    name: "",
    icon: "",
    url_id: "",
  });

  const clearData = () =>
    setData({
      name: "",
      icon: "",
      url_id: "",
    });

  const setName = (name: Folder["name"]) => {
    setData({
      ...savingFolder,
      name,
    });
  };

  const setIcon = (icon: Folder["icon"]) => {
    setData({
      ...data,
      icon,
    });
  };

  const setUrlId = (url_id: Folder["url_id"]) => {
    setData({
      ...data,
      url_id,
    });
  };

  return { data, setData, clearData, setName, setIcon, setUrlId };
};

export default createRoot(savingFolder);
