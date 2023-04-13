import { AiFillDelete } from "solid-icons/ai";
import { FiEdit } from "solid-icons/fi";
import { convertTimeString } from "../scripts/util";
import { componentStyles, videoCard } from "../styles/style.css";
import youtubeIcon from "../images/youtube_icon.png";
import type { Component } from "solid-js";
import type { Video } from "../types/types";
import { Menu } from "./Menu";

type Props = {
  video: Video;
  deleteModalShow: (video: Video) => void;
  playModalShow: (id: Video["youtube_id"]) => void;
};

export const VideoCard: Component<Props> = (props) => {
  return (
    <div class={videoCard.container}>
      <div class={videoCard.contentWrapper}>
        <div
          class={videoCard.imgContainer}
          onClick={() => props.playModalShow(props.video.youtube_id)}
        >
          <img
            src={props.video.thumbnail}
            alt={`サムネイル: ${props.video.title}`}
            class={videoCard.img}
          />
          <img src={youtubeIcon} alt="" class={videoCard.youtubeIcon} />
        </div>
        <h3 class={videoCard.title}>{props.video.title}</h3>
        <div class={videoCard.box}>
          <div class={videoCard.detailsContainer}>
            <time datetime={props.video.published_at} class={videoCard.details}>
              公開日: {props.video.published_at.split("T").at(0)}
            </time>
            <p class={videoCard.details}>
              再生時間: {convertTimeString(props.video.duration)}
            </p>
          </div>
          <Menu
            id={props.video.youtube_id}
            containerClass={videoCard.menuButtonContainer}
          >
            <li role="menuitem">
              <button
                onClick={() => console.log("onClickEdit")}
                class={componentStyles.menu.bodyButton}
              >
                <FiEdit class={componentStyles.menu.menuIcon} />
                <span>編集</span>
              </button>
            </li>
            <li role="menuitem">
              <button
                onClick={() => props.deleteModalShow(props.video)}
                class={componentStyles.menu.bodyButtonDelete}
              >
                <AiFillDelete class={componentStyles.menu.menuIcon} />
                <span>削除</span>
              </button>
            </li>
          </Menu>
        </div>
      </div>
    </div>
  );
};
