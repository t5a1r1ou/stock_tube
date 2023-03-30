import { createSignal } from "solid-js";
import { Video } from "../types/types";
import { addVideo } from "../store/videos";
import { useNavigate } from "@solidjs/router";
import { useCommon } from "./useCommon";

export const useSavingVideo = () => {
  const [inputValue, setInputValue] = createSignal<string>("");
  const [error, setError] = createSignal<string>("");
  const [isValidForm, setIsValidForm] = createSignal<boolean>(false);

  const { observeSearchStockedVideo } = useCommon();
  const navigate = useNavigate();

  const watchValidation = () => {
    if (inputValue() === "") {
      return false;
    }
    return true;
  };

  const onInput = (value: string) => {
    setInputValue(value);
    setIsValidForm(watchValidation());
  };

  const submitAddVideo = (e: Event, video: Video, modalClose: () => void) => {
    e.preventDefault();

    if (!watchValidation()) {
      setError("保存先のフォルダを設定してください");
      return;
    }

    addVideo({ ...video, folder_id: inputValue() });
    observeSearchStockedVideo();
    modalClose();
    navigate(`/library/${inputValue()}`);
  };

  return {
    inputValue,
    submitAddVideo,
    error,
    isValidForm,
    onInput,
  };
};
