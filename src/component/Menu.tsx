import { Component } from "solid-js";

type Props = {
  menuId: string;
};

export const Menu: Component<Props> = (props) => {
  return (
    <div class="menu-button-actions">
      <button
        type="button"
        id="menubutton1"
        aria-haspopup="true"
        aria-controls={props.menuId}
      >
        Actions
        <div class="triangle"></div>
      </button>

      <ul id={props.menuId} role="menu" aria-labelledby="menubutton1">
        <li role="menuitem">Action 1</li>
        <li role="menuitem">Action 2</li>
        <li role="menuitem">Action 3</li>
        <li role="menuitem">Action 4</li>
      </ul>
    </div>
  );
};
