import MicroModal from "micromodal";

export const useModal = (id: string) => {
  const modalShow = () => {
    MicroModal.show(id, {
      disableScroll: true,
    });
  };

  const modalClose = () => {
    MicroModal.close(id);
  };

  return { modalShow, modalClose };
};
