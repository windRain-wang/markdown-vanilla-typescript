import { FontEnum, fontFunction } from "./types";

// **粗体**、*斜体*、~~删除文本~~
export const handleFont: fontFunction = (text, start, end, rule) => {
  const frontText = text.substring(0, start),
    usingText = text.substring(start, end),
    endText = text.substring(end);
  switch (rule) {
    case FontEnum.Blod:
      return frontText.concat(`**${usingText}**`, endText);
    case FontEnum.Italic:
      return frontText.concat(`*${usingText}*`, endText);
    case FontEnum.Del:
      return frontText.concat(`~~${usingText}~~`, endText);
    default:
      return text;
  }
};
