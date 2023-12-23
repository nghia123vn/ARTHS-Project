import {
  runOnUI,
  useSharedValue,
  useWorkletCallback,
} from "react-native-reanimated";
import { useEffect, useMemo } from "react";
import {
  EmitterSubscription,
  Keyboard,
  KeyboardEventListener,
  Platform,
  KeyboardEvent,
} from "react-native";
import constate from "constate";

const _useAnimatedKeyboard = () => {
  const keyboardState = useSharedValue(0);
  const keyboardHeight = useSharedValue(0);
  const keyboardEvent = useSharedValue<KeyboardEvent | null>(null);
  const maxKeyboardHeight = useSharedValue(0);
  const extendedKeyboardHeight = useSharedValue(0);

  const onKeyboardShowHandler: KeyboardEventListener = useWorkletCallback(
    (e) => {
      keyboardEvent.value = e;
      keyboardState.value = 1;
      keyboardHeight.value = e.endCoordinates.height;

      extendedKeyboardHeight.value = e.endCoordinates.height;

      if (maxKeyboardHeight.value < e.endCoordinates.height) {
        maxKeyboardHeight.value = e.endCoordinates.height;
      }
    },
    []
  );

  const onKeyboardHideHandler: KeyboardEventListener = useWorkletCallback(
    (e) => {
      keyboardEvent.value = e;
      if (keyboardState.value != 0) keyboardState.value = 2;
      keyboardHeight.value = 0;
    },
    []
  );

  useEffect(() => {
    let keyboardWillShow: EmitterSubscription;
    let keyboardDidShow: EmitterSubscription;
    let keyboardWillHide: EmitterSubscription;
    let keyboardDidHide: EmitterSubscription;

    if (Platform.OS === "android") {
      keyboardDidShow = Keyboard.addListener(
        "keyboardDidShow",
        runOnUI(onKeyboardShowHandler)
      );
      keyboardDidHide = Keyboard.addListener(
        "keyboardDidHide",
        runOnUI(onKeyboardHideHandler)
      );
    } else {
      keyboardWillShow = Keyboard.addListener(
        "keyboardWillShow",
        runOnUI(onKeyboardShowHandler)
      );
      keyboardWillHide = Keyboard.addListener(
        "keyboardWillHide",
        runOnUI(onKeyboardHideHandler)
      );
    }

    return () => {
      if (Platform.OS === "android") {
        keyboardDidShow.remove();
        keyboardDidHide.remove();
      } else {
        keyboardWillShow.remove();
        keyboardWillHide.remove();
      }
    };
  });

  return useMemo(
    () => ({
      keyboardHeight,
      keyboardState,
      keyboardEvent,
      maxKeyboardHeight,
      extendedKeyboardHeight,
    }),
    [
      keyboardHeight,
      keyboardState,
      keyboardEvent,
      maxKeyboardHeight,
      extendedKeyboardHeight,
    ]
  );
};

export const [AnimatedKeyboardProvider, useAnimatedKeyboard] = constate(
  _useAnimatedKeyboard,
  (value) => value
);
