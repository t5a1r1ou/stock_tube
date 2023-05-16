import { createPopup, PopupPickerController } from "@picmo/popup-picker";

import ja from "../lib/picmo/lang-ja";

export const usePicmo = () => {
  const createPicmo = () =>
    createPopup(
      {
        animate: false,
        emojiSize: "1.2rem",
        showVariants: false,
        showPreview: false,
        i18n: ja,
        locale: "ja",
        autoFocus: "none",
      },
      {
        position: {
          top: "3rem",
        },
        hideOnClickOutside: false,
        hideOnEmojiSelect: true,
        showCloseButton: true,
        hideOnEscape: true,
      },
    );

  const registerListener = (
    picmo: PopupPickerController | undefined,
    input: (icon: string) => void,
  ) => {
    if (picmo) {
      picmo.addEventListener("emoji:select", (selection) => {
        input(selection.emoji);
        picmo?.close();
      });
    }
  };

  const toggleEmoji = (e: Event, picmo: PopupPickerController | undefined) => {
    if (picmo) {
      e.preventDefault();
      picmo.toggle();
    }
  };

  return { createPicmo, registerListener, toggleEmoji };
};
