import { Component, Show } from "solid-js";
import { addVideoForm } from "../styles/style.css";
import { getSavingVideo } from "../store/savingVideo";
import { useSavingVideo } from "../hooks/useSavingVideo";

type Props = {
  modalClose: () => void;
};

export const AddVideoForm: Component<Props> = (props) => {
  const { submitAddVideo, error, inputValue, isValidForm, onInput } =
    useSavingVideo();
  const savingVideo = () => getSavingVideo();

  const onSubmit = (e: Event) => {
    submitAddVideo(e, savingVideo(), props.modalClose);
  };

  return (
    <div class={addVideoForm.container}>
      <div class={addVideoForm.videoWrapper}>
        <img
          class={addVideoForm.img}
          src={savingVideo().thumbnail}
          alt={`サムネイル: ${savingVideo().title}`}
        />
      </div>
      <div class={addVideoForm.box}>
        <div>
          <h3 class={addVideoForm.title}>{savingVideo().title}</h3>
          <p class={addVideoForm.publishedAt}>
            公開日: {savingVideo().published_at.split("T").at(0)}
          </p>
        </div>
        <form class={addVideoForm.formContainer} onSubmit={(e) => onSubmit(e)}>
          <input
            type="text"
            name="folder"
            placeholder="保存するフォルダを入力"
            class={addVideoForm.input}
            value={inputValue()}
            onInput={(e) => onInput(e.currentTarget.value)}
            onChange={(e) => onInput(e.currentTarget.value)}
          />
          <Show when={error() !== ""}>
            <p class={addVideoForm.error}>{error()}</p>
          </Show>
          <button class={addVideoForm.submitButton} disabled={isValidForm()}>
            保存する
          </button>
        </form>
      </div>
    </div>
  );
};
