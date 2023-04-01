import { createSignal } from "solid-js";

export const [currentYoutubeId, setCurrentYoutubeId] = createSignal<String>("");

export const clearCurrentYoutubeId = () => setCurrentYoutubeId("");
