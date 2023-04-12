const truncateWithEllipsis = (maxLength: number) => (value: string) => {
  if (value.length <= maxLength) {
    // 文字数が制限以下の場合はそのまま返す
    return value;
  } else {
    // 文字数が制限を超える場合は省略して三点リーダーを追加して返す
    return value.slice(0, maxLength) + "...";
  }
};

export const truncateWithEllipsis12 = truncateWithEllipsis(12);

export const convertTimeString = (timeString: string) => {
  const result = timeString.replace(
    /^PT(\d*H)?(\d*M)?(\d*S)?$/,
    (_, hours, minutes, seconds) => {
      // 時間、分、秒が存在する場合にのみ結合して形式を整える
      const timeArray = [hours, minutes, seconds].map((time) => {
        if (!time) {
          return "0";
        }
        return time.match(/\d+/)[0]; // 数字があればその値を、なければ0を返す
      });
      return timeArray.join(":");
    }
  );
  return result;
};

export const getYoutubeIdFromUrl: (url: string) => string | undefined = (
  url
) => {
  const regex = /\?v=([^&]+)/;
  const match = url.match(regex);
  return match ? match[1] : undefined;
};
