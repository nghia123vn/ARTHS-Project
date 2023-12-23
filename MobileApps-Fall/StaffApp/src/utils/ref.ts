import { RefObject } from "react";

export const setMultiRef =
  <T>(...refs: RefObject<T>[]) =>
  (view: any) => {
    for (let ref of refs) {
      if (ref) {
        // @ts-ignore
        ref.current = view;
      }
    }
  };
