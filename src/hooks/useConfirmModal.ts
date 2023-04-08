import { deletingVideo, videosStore } from "../store";
import { useCommon } from "./useCommon";
import type { Video } from "../types/types";

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
    }
  };

  return { onConfirmVideoModalShow, onConfirmVideoModalDelete };
};
