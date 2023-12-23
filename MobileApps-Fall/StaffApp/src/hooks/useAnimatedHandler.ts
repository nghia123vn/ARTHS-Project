import { useEvent, useHandler } from "react-native-reanimated";

export function useAnimatedHandler(handlers: any, dependencies: any[]) {
  const { context, doDependenciesDiffer } = useHandler(handlers, dependencies);
  const keyName = Object.keys(handlers)[0]
  const subscribeForEvents = [keyName];

  return useEvent(
    (event: any) => {
      "worklet";
      const onHandler = handlers[keyName];
      if (onHandler && event.eventName.endsWith(keyName)) {
        onHandler(event, context);
      }
    },
    subscribeForEvents,
    doDependenciesDiffer
  );
}
