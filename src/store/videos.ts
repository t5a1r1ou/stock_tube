import { createStore } from "solid-js/store";
import { Folder, Video } from "../types/types";
import { getFolders } from "./folders";
import { supabase } from "../scripts/supabase";

const [videos, setVideos] = createStore<Video[]>([]);

export const getVideos = () => videos;

export const setAllVideos = (data: Video[]) => setVideos(data);

export const getFolderVideos = (id: Folder["id"]) =>
  videos.filter((video) => video.folder_id === id);

export const getFolderVideosFromUrl = (url_id: Folder["url_id"]) => {
  const targetFolder = getFolders().find((folder) => folder.url_id === url_id);
  if (targetFolder) {
    return videos.filter((video) => video.folder_id === targetFolder.id);
  }
  return [];
};

export const addVideo = async (video: Video) => {
  const { data: newVideo, error } = await supabase
    .from("videos")
    .insert(video)
    .select();

  if (error) {
    console.log(error);
    throw new Error();
  } else if (newVideo) {
    setVideos([...videos, newVideo[0]] as Video[]);
  }
};

export const removeVideo = async (youtubeId: Video["youtube_id"]) => {
  const { error } = await supabase
    .from("videos")
    .delete()
    .eq("youtube_id", youtubeId);

  if (error) {
    throw new Error();
  } else {
    setVideos([...videos.filter((video) => video.youtube_id !== youtubeId)]);
  }
};
