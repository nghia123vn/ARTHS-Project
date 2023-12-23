import {
  Context,
  NativeEvent,
  WorkletFunction,
} from "react-native-reanimated/src/reanimated2/commonTypes";
import { findNodeHandle, NativeScrollEvent } from "react-native";
import { DependencyList } from "react-native-reanimated/src/reanimated2/hook/commonTypes";
import { RefObject, useEffect } from "react";
import { useEvent } from "react-native-reanimated/src/reanimated2/hook/utils";
import Animated from "react-native-reanimated";

export interface ScrollHandler<TContext extends Context>
  extends WorkletFunction {
  (event: NativeScrollEvent, context?: TContext): void;
}

export interface ScrollEvent
  extends NativeScrollEvent,
    NativeEvent<ScrollEvent> {
  eventName: string;
}
export interface ScrollHandlers<TContext extends Context> {
  [key: string]: ScrollHandler<TContext> | undefined;
  onScroll?: ScrollHandler<TContext>;
  onBeginDrag?: ScrollHandler<TContext>;
  onEndDrag?: ScrollHandler<TContext>;
  onMomentumBegin?: ScrollHandler<TContext>;
  onMomentumEnd?: ScrollHandler<TContext>;
}

export function useAnimatedRefScrollHandler<TContext extends Context>(
  aref: RefObject<Animated.ScrollView>,
  handlers: ScrollHandlers<TContext> | ScrollHandler<TContext>,
  dependencies: DependencyList = []
) {
  // case when handlers is a function
  const scrollHandlers: ScrollHandlers<TContext> =
    typeof handlers === "function" ? { onScroll: handlers } : handlers;

  // build event subscription array
  const subscribeForEvents = ["onScroll"];
  if (scrollHandlers.onBeginDrag !== undefined) {
    subscribeForEvents.push("onScrollBeginDrag");
  }
  if (scrollHandlers.onEndDrag !== undefined) {
    subscribeForEvents.push("onScrollEndDrag");
  }
  if (scrollHandlers.onMomentumBegin !== undefined) {
    subscribeForEvents.push("onMomentumScrollBegin");
  }
  if (scrollHandlers.onMomentumEnd !== undefined) {
    subscribeForEvents.push("onMomentumScrollEnd");
  }

  const event = useEvent<ScrollEvent>((event: ScrollEvent) => {
    "worklet";
    const { onScroll, onBeginDrag, onEndDrag, onMomentumBegin, onMomentumEnd } =
      scrollHandlers;
    if (onScroll && event.eventName.endsWith("onScroll")) {
      onScroll(event);
    } else if (onBeginDrag && event.eventName.endsWith("onScrollBeginDrag")) {
      onBeginDrag(event);
    } else if (onEndDrag && event.eventName.endsWith("onScrollEndDrag")) {
      onEndDrag(event);
    } else if (
      onMomentumBegin &&
      event.eventName.endsWith("onMomentumScrollBegin")
    ) {
      onMomentumBegin(event);
    } else if (
      onMomentumEnd &&
      event.eventName.endsWith("onMomentumScrollEnd")
    ) {
      onMomentumEnd(event);
    }
  }, subscribeForEvents);

  useEffect(() => {
    const viewTag = findNodeHandle(aref.current);
    event.current?.registerForEvents(viewTag as number);
  }, [aref.current, ...dependencies]);
}
