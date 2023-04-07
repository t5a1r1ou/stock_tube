import { Accessor, Component, Match, Show, Switch, createMemo } from "solid-js";
import { savingFolderStore } from "../store/";
import { editFolderForm } from "../styles/style.css";

type FolderError = {
  name: string;
  icon: string;
  url_id: string;
};

type Props = {
  modalType: Accessor<"new" | "edit">;
  error: FolderError;
  isValidForm: Accessor<boolean>;
  inputName: (value: string) => void;
  submit: (e: Event, type: "new" | "edit") => boolean;
  modalClose: () => void;
  onToggleEmoji: (e: Event) => void;
};

export const EditFolderForm: Component<Props> = (props) => {
  const isNew = createMemo(() => props.modalType() === "new");
  const isEdit = createMemo(() => props.modalType() === "edit");
  const onSubmit = (e: Event) => {
    const success = props.submit(e, props.modalType());
    if (success) {
      props.modalClose();
    }
  };
  const onInputName = (e: { currentTarget: HTMLInputElement }) =>
    props.inputName(e.currentTarget.value);

  return (
    <div>
      <h3 class={editFolderForm.heading}>
        <Switch>
          <Match when={isNew()}>新規フォルダ作成</Match>
          <Match when={isEdit()}>フォルダ編集</Match>
        </Switch>
      </h3>
      <form onSubmit={onSubmit}>
        <div class={editFolderForm.inputBlock}>
          <label class={editFolderForm.inputLabel} for="name">
            フォルダ名
          </label>
          <input
            class={editFolderForm.input}
            type="text"
            name="name"
            id="name"
            value={savingFolderStore.data.name}
            onChange={onInputName}
            onInput={onInputName}
          />
          <Show when={props.error.name !== ""}>
            <p class={editFolderForm.error}>{props.error.name}</p>
          </Show>
        </div>
        <div class={editFolderForm.inputBlock}>
          <label class={editFolderForm.inputLabel} for="icon">
            アイコン
          </label>
          <input
            class={editFolderForm.input}
            type="text"
            name="icon"
            id="icon"
            readOnly
            onFocus={props.onToggleEmoji}
            value={savingFolderStore.data.icon}
          />
          <Show when={props.error.icon !== ""}>
            <p class={editFolderForm.error}>{props.error.icon}</p>
          </Show>
        </div>
        <button
          class={editFolderForm.submitButton}
          type="submit"
          disabled={!props.isValidForm()}
        >
          <Switch>
            <Match when={isNew()}>追加する</Match>
            <Match when={isEdit()}>編集する</Match>
          </Switch>
        </button>
      </form>
    </div>
  );
};
