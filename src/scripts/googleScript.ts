import type { GapiWindow } from "../types/types";

export const loadGoogleScript = () => {
  (() => {
    const id = "google-js";
    const srcs = [
      "https://apis.google.com/js/api.js",
      "https://apis.google.com/js/client:plusone.js",
    ];

    const firstJs = document.getElementsByTagName("script")[0];

    if (document.getElementById(id)) {
      return;
    }
    for (let i = 0; i < srcs.length; i++) {
      const js = document.createElement("script");
      js.id = id;
      js.src = srcs[i];
      if (srcs[i] === "https://apis.google.com/js/api.js") {
        js.onload = (window as GapiWindow).onGoogleScriptLoad;
      }
      firstJs.parentNode?.insertBefore(js, firstJs);
    }
  })();
};

export const initGoogleScript = async (gapi: any, callback: () => void) => {
  if (!gapi) {
    throw Error("読み込みに失敗しました。リロードしてください。");
  }
  await gapi.client
    .init({
      apiKey: import.meta.env.VITE_YOUTUBE_API_KEY,
    })
    .catch((reason: any) => {
      console.log("Error: " + reason.result.error.message);
    });

  await gapi.client.load("youtube", "v3", () => {
    callback();
  });
};
