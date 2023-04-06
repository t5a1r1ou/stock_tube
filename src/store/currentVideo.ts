import { createSignal, createRoot } from "solid-js";

const currentVideo = () => {
  const [id, setId] = createSignal<String>("");
  const clearId = () => setId("");
  return { id, setId, clearId };
};

export default createRoot(currentVideo);
