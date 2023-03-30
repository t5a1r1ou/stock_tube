import { supabase } from "../scripts/supabase";

export const useQueryVideos = async () => {
  return await supabase
    .from("videos")
    .select("*")
    .order("created_at", { ascending: true });
};
