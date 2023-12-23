import { SharedValue, useSharedValue } from "react-native-reanimated";
import {useCallback} from 'react';

export const useAnimatedPause = (
  init: boolean = true,
  timeout: number = 300,
) => {
  const _timeout = useSharedValue<number | null>(null);
  const pause = useSharedValue(init);

  const onPause = useCallback(() => {
    pause.value = true;
    if (_timeout.value !== null) clearTimeout(_timeout.value);
    _timeout.value = setTimeout(() => {
      pause.value = false;
    }, timeout);
  }, [_timeout, pause]);

  return [pause, onPause] as [SharedValue<boolean>, () => void];
};
