export enum FontEnum {
  Blod,
  Italic,
  Del
}
export type ActionFunction = (
  text: string,
  start: number,
  end: number
) => string;
export type fontFunction = (
  text: string,
  start: number,
  end: number,
  rule: FontEnum
) => string;
