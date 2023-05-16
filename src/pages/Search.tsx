import type { PopupPickerController } from "@picmo/popup-picker";
import type { Component } from "solid-js";

import type { Video } from "../types/types";

import { A, useNavigate } from "@solidjs/router";
import { createSignal, For, onMount, Show } from "solid-js";

import {
  CardsWrapper,
  DeleteConfirm,
  EditFolderForm,
  EditVideoForm,
  Modal,
  Pagenation,
  SearchedVideoCard,
  SearchForm,
  SegmentControl,
  Spinner,
} from "../components";
import {
  useConfirmModal,
  useModal,
  usePicmo,
  useSavingFolder,
  useSearch,
} from "../hooks/";
import { Head } from "../layout/Head";
import { truncateWithEllipsis12 } from "../scripts/util";
import {
  deletingVideoStore,
  foldersStore,
  savingVideoStore,
  searchStateStore,
  userStore,
  videosStore,
} from "../store";
import { componentStyles, register, top } from "../styles/style.css";

const Search: Component = () => {
  const addVideoModalId = "add_video_modal";
  const confirmModalId = "confirm_modal";
  const addFolderModalId = "add_folder_modal";
  const registerModalId = "register_modal";
  let emojiPopup: PopupPickerController | undefined;
  const [loadingSearch, setLoadingSearch] = createSignal<boolean>(false);
  const [searchType, setSearchType] = createSignal<"keyword" | "url">(
    "keyword",
  );

  const navigate = useNavigate();

  const { initApi: initSearchApi, searchVideo } = useSearch(setLoadingSearch);

  const { error, isValidForm, inputName, inputIcon, submit } =
    useSavingFolder();

  const { modalShow: addVideoModalShow, modalClose: addVideoModalClose } =
    useModal(addVideoModalId);
  const { modalShow: confirmModalShow, modalClose: confirmModalClose } =
    useModal(confirmModalId);
  const { modalShow: addFolderModalShow, modalClose: addFolderModalClose } =
    useModal(addFolderModalId);
  const { modalShow: registerModalShow, modalClose: registerModalClose } =
    useModal(registerModalId);

  const onClickSignUp = () => {
    registerModalClose();
    navigate("/signup");
  };

  const onClickSignIn = (e: Event) => {
    e.preventDefault();
    registerModalClose();
    navigate("/signin");
  };

  const { createPicmo, registerListener, toggleEmoji } = usePicmo();

  const { onConfirmVideoModalShow, onConfirmVideoModalDelete } =
    useConfirmModal({
      modalShow: confirmModalShow,
      modalClose: confirmModalClose,
    });

  const onAddVideoModalShow = (video: Video) => {
    if (userStore.data() == null) {
      registerModalShow();
      return;
    }
    savingVideoStore.setInfo(video);
    addVideoModalShow();
  };

  const onAddVideoModalClose = () => {
    addVideoModalClose();
    savingVideoStore.clearData();
  };

  const onToggleEmoji = (e: Event) => toggleEmoji(e, emojiPopup);

  const submitQuery = (e: Event) => {
    e.preventDefault();
    searchVideo(searchStateStore.data.inputValue, undefined, searchType());
  };

  const onClickMore = (e: Event) => {
    e.preventDefault();
    searchVideo(
      searchStateStore.data.currentWord,
      searchStateStore.data.nextPageToken,
      searchType(),
    );
  };

  const onChangeSearchType = (e: { currentTarget: HTMLInputElement }) => {
    const value = e.currentTarget.value as "keyword" | "url";
    setSearchType(value);
  };

  const deleteConfirmTitle = () => {
    if (!deletingVideoStore.data.folder_id) {
      return "";
    }
    const folder = foldersStore.getFolder(deletingVideoStore.data.folder_id);
    return `${folder!.name}${
      folder!.icon
    }フォルダから「${truncateWithEllipsis12(
      deletingVideoStore.data.title,
    )}」を削除しますか？`;
  };

  onMount(() => {
    videosStore.fetchData();
    foldersStore.fetchData();
    initSearchApi();
    emojiPopup = createPicmo();
    registerListener(emojiPopup, inputIcon);
  });

  return (
    <>
      <Head title="StockTube | 検索" />
      <Show when={userStore.data() == null}>
        <div class={top.wrapper}>
          <div class={top.container}>
            <h1 class={top.head}>見たい動画だけに集中する</h1>
            <div class={top.imageContainer}>
              <img src="./images/image.svg" alt="" class={top.image} />
            </div>
            <div class={top.descriptionContainer}>
              <p class={top.description}>
                StockTubeはYouTube動画をストックできるサービスです。
                <br />
                YouTubeを見ているとついつい関係ない動画を見てしまい、気づけば○○時間も…なんていう経験はありませんか？
                <br />
                StockTubeを使えば、レコメンド動画は表示されないため、自分の見たい動画だけに集中することができます。
              </p>
              <A href="/signup" class={top.signup}>
                登録
              </A>
              <A href="/signin" class={top.signin}>
                サインインはこちら &gt;
              </A>
            </div>
          </div>
        </div>
      </Show>
      <SegmentControl
        id="searchType"
        data={[
          {
            value: "keyword",
            text: "キーワード検索",
          },
          {
            value: "url",
            text: "URL検索",
          },
        ]}
        state={searchType()}
        onChange={onChangeSearchType}
      />
      <h2 class={componentStyles.hiddenText}>
        {searchType() === "keyword" ? "キーワード検索" : "URL検索"}
      </h2>
      <SearchForm
        submitQuery={submitQuery}
        placeholder={
          searchType() === "keyword"
            ? "検索ワードを入力してください"
            : "URLを入力してください"
        }
      />
      <Show when={!loadingSearch()} fallback={<Spinner />}>
        <CardsWrapper>
          <For each={searchStateStore.data.resultVideos}>
            {(video) => (
              <SearchedVideoCard
                video={video}
                addVideoModalShow={onAddVideoModalShow}
                confirmModalShow={onConfirmVideoModalShow}
              />
            )}
          </For>
        </CardsWrapper>
        <Pagenation
          nextPageToken={searchStateStore.data.nextPageToken}
          onClickMore={onClickMore}
        />
        <Modal
          id={addVideoModalId}
          modalClose={onAddVideoModalClose}
          fullWidth={false}
        >
          <EditVideoForm
            type={"new"}
            editVideoModalClose={onAddVideoModalClose}
            editFolderModalShow={addFolderModalShow}
          />
        </Modal>
        <Modal
          id={confirmModalId}
          modalClose={confirmModalClose}
          fullWidth={false}
        >
          <DeleteConfirm
            modalClose={confirmModalClose}
            onDelete={onConfirmVideoModalDelete}
            title={deleteConfirmTitle()}
            desc={"元に戻す場合は再度検索して追加する必要があります。"}
          />
        </Modal>
        <Modal
          id={addFolderModalId}
          modalClose={addFolderModalClose}
          fullWidth={false}
        >
          <EditFolderForm
            modalType={"new"}
            error={error}
            isValidForm={isValidForm}
            inputName={inputName}
            submit={submit}
            modalClose={addFolderModalClose}
            onToggleEmoji={onToggleEmoji}
          />
        </Modal>
        <Modal
          id={registerModalId}
          modalClose={registerModalClose}
          fullWidth={false}
        >
          <div class={register.container}>
            <div class={register.imageContainer}>
              <img src="./images/image2.svg" alt="" class={register.image} />
            </div>
            <div class={register.textContainer}>
              <p class={register.text}>ご利用するには会員登録が必要です</p>
              <button onClick={onClickSignUp} class={register.button}>
                登録する
              </button>
              <a
                href="/singin"
                onClick={onClickSignIn}
                class={register.loginLink}
              >
                サインインはこちら &gt;
              </a>
            </div>
          </div>
        </Modal>
      </Show>
    </>
  );
};

export default Search;
