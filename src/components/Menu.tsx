import { createSignal } from "solid-js";
import { componentStyles } from "../styles/style.css";
import { BsThreeDots } from "../lib/solid-icons/BsThreeDots";
// @ts-ignore
import clickOutside from "../directives/clickOutside";
import type { Component, JSX } from "solid-js";

type Props = {
  id: string;
  containerClass?: string;
  positionClass: string;
  children: JSX.Element;
};

export const Menu: Component<Props> = (props) => {
  let containerClass: string;
  if (!props.containerClass) {
    containerClass = componentStyles.menu.container;
  } else {
    containerClass = props.containerClass;
  }
  let list: HTMLUListElement | undefined;
  const [isMenuOpened, setIsMenuOpened] = createSignal<boolean>(false);

  const onClickMenu = (e: Event) => {
    const firstMenuItem = list?.querySelector("li")?.querySelector("button");
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget;
    if (isMenuOpened()) {
      setIsMenuOpened(false);
      (target as HTMLElement).focus();
    } else if (!isMenuOpened()) {
      setIsMenuOpened(true);
      (target as HTMLElement).blur();
      if (firstMenuItem) {
        firstMenuItem.focus();
      }
    }
  };
  return (
    <div class={`${containerClass} ${props.positionClass}`}>
      <button
        class={componentStyles.menu.button}
        onClick={onClickMenu}
        id={props.id}
        aria-haspopup={true}
        aria-controls={`${props.id}_menu`}
        aria-expanded={isMenuOpened()}
        use:clickOutside={() => setIsMenuOpened(false)}
      >
        <BsThreeDots className={componentStyles.menu.buttonIcon} />
        <span class={componentStyles.hiddenText}>メニュー</span>
      </button>
      <ul
        id={`${props.id}_menu`}
        class={componentStyles.menu.body}
        role="menu"
        aria-labelledby={props.id}
        ref={list}
      >
        {props.children}
      </ul>
    </div>
  );
};
