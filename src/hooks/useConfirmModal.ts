import {
  deletingFolder,
  deletingVideo,
  foldersStore,
  videosStore,
} from "../store";
import { useCommon } from "./useCommon";
import type { Folder, Video } from "../types/types";
import toast from "solid-toast";

type Args = {
  modalShow: () => void;
  modalClose: () => void;
};

export const useConfirmModal = (args: Args) => {
  const { observeSearchStockedVideo } = useCommon();
  const onConfirmVideoModalShow = (video: Video) => {
    deletingVideo.setData({
      youtube_id: video.youtube_id,
      title: video.title,
    });
    args.modalShow();
  };

  const onConfirmVideoModalDelete = () => {
    if (deletingVideo.data.youtube_id) {
      videosStore.removeData(deletingVideo.data.youtube_id);
      observeSearchStockedVideo();
      args.modalClose();
      toast.success("動画の削除が完了しました。");
    }
  };

  const onConfirmFolderModalShow = (folder: Folder) => {
    deletingFolder.setData({
      id: folder.id,
      name: folder.name,
    });
    args.modalShow();
  };

  const onConfirmFolderModalDelete = () => {
    if (deletingFolder.data.id) {
      foldersStore.removeData(deletingFolder.data.id);
      args.modalClose();
      toast.success("フォルダの削除が完了しました。");
    }
  };

  return {
    onConfirmVideoModalShow,
    onConfirmVideoModalDelete,
    onConfirmFolderModalShow,
    onConfirmFolderModalDelete,
  };
};
