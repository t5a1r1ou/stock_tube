import {
  deletingFolderStore,
  deletingVideoStore,
  foldersStore,
  videosStore,
} from "../store";
import type { Folder, Video } from "../types/types";
import toast from "solid-toast";

type Args = {
  modalShow: () => void;
  modalClose: () => void;
};

export const useConfirmModal = (args: Args) => {
  const onConfirmVideoModalShow = (video: Video) => {
    deletingVideoStore.setData({
      youtube_id: video.youtube_id,
      title: video.title,
      folder_id:
        video.folder_id ||
        videosStore.data.find(
          (stockedVideo) => stockedVideo.youtube_id === video.youtube_id
        )!.folder_id,
    });
    args.modalShow();
  };

  const onConfirmVideoModalDelete = () => {
    if (deletingVideoStore.data.youtube_id) {
      videosStore.removeData(deletingVideoStore.data.youtube_id);
      args.modalClose();
      toast.success("動画の削除が完了しました。");
    }
  };

  const onConfirmFolderModalShow = (folder: Folder) => {
    deletingFolderStore.setData({
      id: folder.id,
      name: folder.name,
    });
    args.modalShow();
  };

  const onConfirmFolderModalDelete = () => {
    if (deletingFolderStore.data.id) {
      foldersStore.removeData(deletingFolderStore.data.id);
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
