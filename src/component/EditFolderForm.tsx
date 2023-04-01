import { Accessor, Component } from "solid-js";
import { editFolderForm } from "../styles/style.css";
import { getSavingFolder } from "../store/savingFolder";
import { Show } from "solid-js";

type FolderError = {
  name: string;
  icon: string;
  url_id: string;
};

type Props = {
  error: FolderError;
  isValidForm: Accessor<boolean>;
  inputName: (value: string) => void;
  inputUrlId: (value: string) => void;
  submit: (e: Event) => void;
  modalClose: () => void;
  onToggleEmoji: (e: Event) => void;
};

export const EditFolderForm: Component<Props> = (props) => {
  const savingFolder = () => getSavingFolder();

  const onSubmit = (e: Event) => {
    props.submit(e);
    props.modalClose();
  };
  const onInputName = (e: { currentTarget: HTMLInputElement }) =>
    props.inputName(e.currentTarget.value);
  const onInputUrlId = (e: { currentTarget: HTMLInputElement }) =>
    props.inputUrlId(e.currentTarget.value);

  return (
    <div>
      <h3 class={editFolderForm.heading}>新規フォルダ作成</h3>
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
            value={savingFolder().name}
            onChange={onInputName}
            onInput={onInputName}
          />
          <Show when={props.error.name !== ""}>
            <p class={editFolderForm.error}>{props.error.name}</p>
          </Show>
        </div>
        <div class={editFolderForm.inputBlock}>
          <label class={editFolderForm.inputLabel} for="url_id">
            URL_ID（URLの末尾のIDになります。半角英数字とアンダーバーのみで入力できます。）
          </label>
          <input
            class={editFolderForm.input}
            type="text"
            name="name"
            id="name"
            value={savingFolder().url_id}
            onChange={onInputUrlId}
            onInput={onInputUrlId}
          />
          <Show when={props.error.url_id !== ""}>
            <p class={editFolderForm.error}>{props.error.url_id}</p>
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
            value={savingFolder().icon}
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
          追加する
        </button>
      </form>
    </div>
  );
};
