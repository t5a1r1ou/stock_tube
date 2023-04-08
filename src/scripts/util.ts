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
