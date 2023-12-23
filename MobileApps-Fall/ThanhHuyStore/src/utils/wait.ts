import { createRef } from "react";
import { InteractionManager } from "react-native";

export function wait(ms: number) {
  return new Promise((resolve: any) => setTimeout(resolve, ms));
}

const _timeoutRef = createRef<number | null>();

export const interactManager = (
  fn: () => void,
  wait: number = 0,
  isClearTimeout?: boolean,
  timeoutRef?: any
) => {
  const _timeout = timeoutRef || _timeoutRef;

  return InteractionManager.runAfterInteractions(() => {
    if (isClearTimeout) {
      if (_timeout.current !== null) {
        clearTimeout(_timeout.current);
      }
      // @ts-ignore
      _timeout.current = setTimeout(() => {
        fn();
      }, wait);
    } else {
      setTimeout(() => {
        fn();
      }, wait);
    }
  });
};
