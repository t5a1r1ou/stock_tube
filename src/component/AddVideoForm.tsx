import { Component, For, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { foldersStore, savingVideoStore } from "../store/";
import { useSavingVideo } from "../hooks/";
import { addVideoForm } from "../styles/style.css";

type Props = {
  modalClose: () => void;
};

export const AddVideoForm: Component<Props> = (props) => {
  const { submit, error, isValidForm, onInput } = useSavingVideo();
  const navigate = useNavigate();

  const onSubmit = (e: Event) => {
    const folder_url = foldersStore.data.find(
      (folder) => savingVideoStore.data.folder_id === folder.id
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
          src={savingVideoStore.data.thumbnail}
          alt={`サムネイル: ${savingVideoStore.data.title}`}
        />
      </div>
      <div class={addVideoForm.box}>
        <div>
          <h3 class={addVideoForm.title}>{savingVideoStore.data.title}</h3>
          <p class={addVideoForm.publishedAt}>
            公開日: {savingVideoStore.data.published_at.split("T").at(0)}
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
              value={savingVideoStore.data.folder_id}
            >
              <option value="">フォルダを選択してください</option>
              <For each={foldersStore.data}>
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
