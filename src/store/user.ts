import { createRoot, createSignal } from "solid-js";
import type { User } from "@supabase/gotrue-js";

const user = () => {
  const [data, setData] = createSignal<User | null>(null);
  return { data, setData };
};

export default createRoot(user);
