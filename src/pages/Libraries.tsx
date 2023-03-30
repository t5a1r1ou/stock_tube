import { Component, For, Show } from "solid-js";
import { getFolders } from "../store/folders";
import { componentStyles, mixin } from "../styles/style.css";
import { CardsWrapper } from "../component/CardsWrapper";
import { FolderCard } from "../component/FolderCard";

const Library: Component = () => {
  const folders = () => getFolders();
  return (
    <>
      <h2 class={componentStyles.heading}>ライブラリ</h2>
      <button class={componentStyles.floatingButton.container}>
        <p class={mixin.visuallyHidden}>ライブラリを追加</p>
        <div class={componentStyles.floatingButton.iconAdd}></div>
      </button>
      <Show
        when={folders().length > 0}
        fallback={<p>フォルダが登録されていません。</p>}
      >
        <CardsWrapper>
          <For each={folders()}>{(folder) => <FolderCard {...folder} />}</For>
        </CardsWrapper>
      </Show>
    </>
  );
};

export default Library;
