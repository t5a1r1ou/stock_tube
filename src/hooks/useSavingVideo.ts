import { createSignal } from "solid-js";
import { Video } from "../types/types";
import { addVideo } from "../store/videos";
import { useNavigate } from "@solidjs/router";

export const useSavingVideo = () => {
  const [inputValue, setInputValue] = createSignal<string>("");
  const [error, setError] = createSignal<string>("");
  const [isValidForm, setIsValidForm] = createSignal<boolean>(true);

  const navigate = useNavigate();

  const watchValidation = () => {
    if (inputValue() === "") {
      return false;
    }
    return true;
  };

  const onInput = (value: string) => {
    setInputValue(value);
    setIsValidForm(!watchValidation());
  };

  const submitAddVideo = (e: Event, video: Video, modalClose: () => void) => {
    e.preventDefault();

    if (!watchValidation()) {
      setError("保存先のフォルダを設定してください");
      return;
    }

    addVideo({ ...video, folder: inputValue() });
    modalClose();
    navigate("/");
  };

  return {
    inputValue,
    submitAddVideo,
    error,
    isValidForm,
    onInput,
  };
};
