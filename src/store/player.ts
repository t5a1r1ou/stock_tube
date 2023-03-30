import { createSignal } from "solid-js";

const [player, setPlayer] = createSignal<any>(null);

export const getPlayer = () => player();

export const setYoutubePlayer = (value: any) => setPlayer(value);
