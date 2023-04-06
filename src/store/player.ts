import { createRoot, createSignal } from "solid-js";

const player = () => {
  const [data, setData] = createSignal<any>(null);
  return { data, setData };
};

export default createRoot(player);
