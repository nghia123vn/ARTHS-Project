export type TPrevFn<T> = ((prev: T) => T) | T
export type TPrevPFn<P, T> = ((prev: P) => T) | T

export enum EImageSize {
  ORIGINAL = '',
  SIZE_0 = '0.',
  SIZE_1 = '1.',
  SIZE_2 = '2.',
  SIZE_3 = '3.'
}
export enum EReaction {
  LIKE = 'like',
  LOVE = 'love',
  HAHA = 'haha',
  WOW = 'wow',
  SAD = 'sad',
  CARE = 'care',
  ANGRY = 'angry',
}

export interface IReaction {
  user_id: string,
  reaction: EReaction
}

export enum ESystemColor {
  COLOR_0 = "0",
  COLOR_1 = "1",
  COLOR_2 = "2",
  COLOR_3 = "3",
  COLOR_4 = "4",
  COLOR_5 = "5",
  COLOR_6 = "6",
  COLOR_7 = "7",
  COLOR_8 = "8",
  COLOR_9 = "9",
}

export enum ELanguage {
  VI = 'vi',
  EN = 'en'
}

export interface IAttachment {
  download?: string,
  fid?: string,
  id: string,
  image?: number | string, //boolean for actually
  name: string,
  since?: number | string,
  size?: number | string,
  src?: string,
  type?: "file",
  url?: string,
  username?: string
}
