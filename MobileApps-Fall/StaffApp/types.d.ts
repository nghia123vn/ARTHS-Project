declare module "@env" {
  export const SECRET_AUTH_KEY: string;
  export const ACCESS_GROUP: string;
  export const PROVIDER_NAME: string;
  export const IS_MASTER: "true" | "false";
}

declare module "react-native-google-recaptcha-v2";

declare type RootState = ReturnType<
  typeof import("./src/store")["store"]["getState"]
>;

declare module "react-redux" {
  export * from "react-redux/index";
  export function useSelector<TSelected = unknown>(
    selector: (state: RootState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected;
}

declare interface String {
  replaceBetween: (start: number, end: number, content: string) => string;
  replaceAsync(
    searchValue: string | RegExp,
    replaceValue: string
  ): Promise<string>;
  replaceAsync(
    searchValue: string | RegExp,
    replacer: (substring: string, ...args: any[]) => Promise<string> | string
  ): Promise<string>;
}

declare interface Array<T> {
  changeIndex: (oldIndex: number, newIndex: number) => T[];
  insert: (item: T, index?: number) => T[];
  sum: () => number;
}

declare module "@true/assets" {
  export * from "node_modules/@true/assets";
}
declare module "@true/components" {
  export * from "node_modules/@true/components";
}
declare module "@true/constants" {
  export * from "node_modules/@true/constants";
}
declare module "@true/helpers" {
  export * from "node_modules/@true/helpers";
}
declare module "@true/hooks" {
  export * from "node_modules/@true/hooks";
}
declare module "@true/services" {
  export * from "node_modules/@true/services";
}
declare module "@true/store" {
  export * from "node_modules/@true/store";
}
declare module "@true/theme" {
  export * from "node_modules/@true/theme";
}
declare module "@true/utils" {
  export * from "node_modules/@true/utils";
}
declare module "@true/global" {
  export * from "node_modules/@true/global";
}
declare module "@true/routes" {
  export * from "node_modules/@true/routes";
}
declare module "@true/types" {
  export * from "node_modules/@true/types";
}
