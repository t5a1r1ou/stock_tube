import type { User } from "@supabase/gotrue-js";

import { createRoot, createSignal } from "solid-js";

const user = () => {
  const [data, setData] = createSignal<User | null>(null);
  return { data, setData };
};

export default createRoot(user);
