import { supabase } from "../scripts/supabase";

export const useQueryFolders = async () => {
  return await supabase
    .from("folders")
    .select("*")
    .order("created_at", { ascending: true });
};
