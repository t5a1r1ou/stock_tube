import { createStore } from "solid-js/store";
import { Folder, Video } from "../types/types";
import folders from "./folders";
import { supabase } from "../scripts/supabase";
import { createRoot } from "solid-js";

const videos = () => {
  const [data, setData] = createStore<Video[]>([]);

  const fetchData = async (callback?: () => void) => {
    const { data: videos, error } = await supabase
      .from("videos")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error();
    }

    setData(videos as Video[]);
    if (callback) {
      callback();
    }
  };

  const getFromFolder = (id: Folder["id"]) =>
    data.filter((video) => video.folder_id === id);

  const getFromUrl = (url_id: Folder["url_id"]) => {
    const targetFolder = folders.data.find(
      (folder) => folder.url_id === url_id
    );
    if (targetFolder) {
      return data.filter((video) => video.folder_id === targetFolder.id);
    }
    return [];
  };

  const addData = async (video: Video) => {
    const { data: newVideo, error } = await supabase
      .from("videos")
      .insert(video)
      .select()
      .single<Video>();

    if (error) {
      console.log(error);
      throw new Error();
    } else if (newVideo) {
      setData([...data, newVideo]);
    }
  };

  const editData = async ({
    youtube_id,
    folder_id,
  }: {
    youtube_id: Video["youtube_id"];
    folder_id: Video["folder_id"];
  }) => {
    const { data: updatedVideo, error } = await supabase
      .from("videos")
      .update({ folder_id })
      .eq("youtube_id", youtube_id)
      .select()
      .single<Video>();

    if (error) {
      throw new Error();
    } else {
      const newData = data.map((video) => {
        if (video.youtube_id === updatedVideo.youtube_id) {
          return updatedVideo;
        } else {
          return video;
        }
      });
      setData(newData);
    }
  };

  const removeData = async (youtubeId: Video["youtube_id"]) => {
    const { error } = await supabase
      .from("videos")
      .delete()
      .eq("youtube_id", youtubeId);

    if (error) {
      throw new Error();
    } else {
      setData([...data.filter((video) => video.youtube_id !== youtubeId)]);
    }
  };

  const clearData = () => setData([]);

  return {
    data,
    setData,
    fetchData,
    getFromFolder,
    getFromUrl,
    addData,
    editData,
    removeData,
    clearData,
  };
};

export default createRoot(videos);
