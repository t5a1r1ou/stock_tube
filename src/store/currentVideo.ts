import { createSignal } from "solid-js";

export const [currentVideoId, setCurrentVideoId] = createSignal<String>("");

export const clearCurrentVideoId = () => setCurrentVideoId("");
