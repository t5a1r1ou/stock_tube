import type { Component } from "solid-js";

import type { Folder } from "../types/types";

import { For, Show } from "solid-js";

import { useSavingVideo } from "../hooks";
import { convertTimeString } from "../scripts/util";
import { foldersStore, savingVideoStore } from "../store";
import { editVideoForm } from "../styles/style.css";

type Props = {
  type: "new" | "edit";
  editVideoModalClose: () => void;
  editFolderModalShow: () => void;
};

export const EditVideoForm: Component<Props> = (props) => {
  const { submit, error, isValidForm, onInput } = useSavingVideo();

  const newFolderOption: Pick<Folder, "id" | "name" | "icon"> = {
    id: "newFolder",
    name: "新規フォルダ作成",
    icon: "",
  };

  const onSubmit = (e: Event) => {
    submit(e, props.type);
    props.editVideoModalClose();
  };

  return (
    <div class={editVideoForm.container}>
      <div class={editVideoForm.videoWrapper}>
        <img
          class={editVideoForm.img}
          src={savingVideoStore.data.thumbnail}
          alt={`サムネイル: ${savingVideoStore.data.title}`}
        />
      </div>
      <div class={editVideoForm.box}>
        <div>
          <h3 class={editVideoForm.title}>{savingVideoStore.data.title}</h3>
          <p class={editVideoForm.details}>
            公開日: {savingVideoStore.data.published_at.split("T").at(0)}
          </p>
          <p class={editVideoForm.details}>
            再生時間: {convertTimeString(savingVideoStore.data.duration)}
          </p>
        </div>
        <form class={editVideoForm.formContainer} onSubmit={onSubmit}>
          <div class={editVideoForm.selectContainer}>
            <select
              name="folder"
              class={
                isValidForm() ? editVideoForm.select : editVideoForm.selectEmpty
              }
              onChange={(e) =>
                onInput(e.currentTarget.value, props.editFolderModalShow)
              }
              value={savingVideoStore.data.folder_id}
            >
              <option value="">フォルダを選択</option>
              <For each={[...foldersStore.data, newFolderOption]}>
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
            <p class={editVideoForm.error}>{error()}</p>
          </Show>
          <button class={editVideoForm.submitButton} disabled={!isValidForm()}>
            保存する
          </button>
        </form>
      </div>
    </div>
  );
};
