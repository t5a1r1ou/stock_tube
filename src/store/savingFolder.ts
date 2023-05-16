import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";

import { SavingFolder } from "../types/types";

const savingFolder = () => {
  const [data, setData] = createStore<SavingFolder>({
    name: "",
    icon: "",
    url_id: "",
    id: "",
  });

  const clearData = () =>
    setData({
      name: "",
      icon: "",
      url_id: "",
      id: "",
    });

  const setName = (name: SavingFolder["name"]) => {
    setData({
      ...savingFolder,
      name,
    });
  };

  const setIcon = (icon: SavingFolder["icon"]) => {
    setData({
      ...data,
      icon,
    });
  };

  const setUrlId = (url_id: SavingFolder["url_id"]) => {
    setData({
      ...data,
      url_id,
    });
  };

  return { data, setData, clearData, setName, setIcon, setUrlId };
};

export default createRoot(savingFolder);
