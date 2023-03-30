import { createStore } from "solid-js/store";

const [playerId, setPlayerId] = createStore<any>(null);

export const getPlayerId = () => playerId;

export const setYoutubePlayerId = (value: any) => setPlayerId(value);
