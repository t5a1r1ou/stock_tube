import { createSignal } from "solid-js";
import type { User } from "@supabase/gotrue-js";

export const [user, setUser] = createSignal<User | null>(null);
