import { Accessor, onCleanup, Setter } from "solid-js";

const clickOutside = (
  el: HTMLElement,
  accessor: Accessor<() => Setter<boolean>>,
) => {
  const onClick = (e: Event) => {
    if (!el.contains(e.target as HTMLElement)) {
      accessor()?.();
    }
  };
  document.body.addEventListener("click", onClick);

  onCleanup(() => document.body.removeEventListener("click", onClick));
};

export default clickOutside;
