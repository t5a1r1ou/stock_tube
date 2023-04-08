import { createRoot } from "solid-js";
import { createStore } from "solid-js/store";
import { SavingFolder } from "../types/types";

const deletingFolder = () => {
  const [data, setData] = createStore<Pick<SavingFolder, "id" | "name">>({
    name: "",
    id: "",
  });

  const clearData = () =>
    setData({
      name: "",
      id: "",
    });

  return { data, setData, clearData };
};

export default createRoot(deletingFolder);
