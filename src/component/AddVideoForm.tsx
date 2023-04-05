import { Component, For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { getSavingVideo } from "../store/savingVideo";
import { getFolders } from "../store/folders";
import { useSavingVideo } from "../hooks/";
import { addVideoForm } from "../styles/style.css";

type Props = {
  modalClose: () => void;
};

export const AddVideoForm: Component<Props> = (props) => {
  const { submit, error, isValidForm, onInput } = useSavingVideo();
  const savingVideo = () => getSavingVideo();
  const folders = () => getFolders();
  const navigate = useNavigate();

  const onSubmit = (e: Event) => {
    const folder_url = folders().find(
      (folder) => savingVideo().folder_id === folder.id
    )?.url_id;
    submit(e);
    props.modalClose();
    navigate(`/library/${folder_url}`);
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
        <form class={addVideoForm.formContainer} onSubmit={onSubmit}>
          <div class={addVideoForm.selectContainer}>
            <select
              name="folder"
              class={
                isValidForm() ? addVideoForm.select : addVideoForm.selectEmpty
              }
              onChange={(e) => onInput(e.currentTarget.value)}
              value={savingVideo().folder_id}
            >
              <option value="">フォルダを選択してください</option>
              <For each={folders()}>
                {(folder) => (
                  <option value={folder.id}>
                    {folder.name}
                    {folder.icon}
                  </option>
                )}
              </For>
            </select>
          </div>
          <Show when={error() !== ""}>
            <p class={addVideoForm.error}>{error()}</p>
          </Show>
          <button class={addVideoForm.submitButton} disabled={!isValidForm()}>
            保存する
          </button>
        </form>
      </div>
    </div>
  );
};
