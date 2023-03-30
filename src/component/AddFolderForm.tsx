import { Accessor, Component } from "solid-js";
import { addFolderForm } from "../styles/style.css";
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
  onInputName: (value: string) => void;
  onInputUrlId: (value: string) => void;
  submit: (e: Event) => void;
  modalClose: () => void;
  onToggleEmoji: (e: Event) => void;
};

export const AddFolderForm: Component<Props> = (props) => {
  const savingFolder = () => getSavingFolder();

  const onSubmit = (e: Event) => {
    props.submit(e);
    props.modalClose();
  };

  return (
    <div>
      <h3 class={addFolderForm.heading}>新規フォルダ作成</h3>
      <form onSubmit={onSubmit}>
        <div class={addFolderForm.inputBlock}>
          <label class={addFolderForm.inputLabel} for="name">
            フォルダ名
          </label>
          <input
            class={addFolderForm.input}
            type="text"
            name="name"
            id="name"
            value={savingFolder().name}
            onChange={(e) => props.onInputName(e.currentTarget.value)}
            onInput={(e) => props.onInputName(e.currentTarget.value)}
          />
          <Show when={props.error.name !== ""}>
            <p class={addFolderForm.error}>{props.error.name}</p>
          </Show>
        </div>
        <div class={addFolderForm.inputBlock}>
          <label class={addFolderForm.inputLabel} for="url_id">
            URL_ID（URLの末尾のIDになります。半角英数字とアンダーバーのみで入力できます。）
          </label>
          <input
            class={addFolderForm.input}
            type="text"
            name="name"
            id="name"
            value={savingFolder().url_id}
            onChange={(e) => props.onInputUrlId(e.currentTarget.value)}
            onInput={(e) => props.onInputUrlId(e.currentTarget.value)}
          />
          <Show when={props.error.url_id !== ""}>
            <p class={addFolderForm.error}>{props.error.url_id}</p>
          </Show>
        </div>
        <div class={addFolderForm.inputBlock}>
          <label class={addFolderForm.inputLabel} for="icon">
            アイコン
          </label>
          <input
            class={addFolderForm.input}
            type="text"
            name="icon"
            id="icon"
            readOnly
            onFocus={props.onToggleEmoji}
            value={savingFolder().icon}
          />
          <Show when={props.error.icon !== ""}>
            <p class={addFolderForm.error}>{props.error.icon}</p>
          </Show>
        </div>
        <button
          class={addFolderForm.submitButton}
          type="submit"
          disabled={!props.isValidForm()}
        >
          追加する
        </button>
      </form>
    </div>
  );
};
