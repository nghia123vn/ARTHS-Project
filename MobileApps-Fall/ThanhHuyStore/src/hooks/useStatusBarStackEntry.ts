import { useEffect } from "react";
import { ColorValue, StatusBar } from "react-native";

export const useStatusBarStackEntry = (
  isStack?: boolean,
  backgroundColor?: ColorValue,
) => {
  useEffect(() => {
    let stack =
      isStack === undefined || isStack
        ? StatusBar.pushStackEntry({
            showHideTransition: 'fade',
            networkActivityIndicatorVisible: true,
            animated: true,
            backgroundColor: backgroundColor || 'rgba(0,0,0,0.4)',
            hidden: false,
            barStyle: 'light-content',
          })
        : undefined;
    return () => {
      stack && StatusBar.popStackEntry(stack);
    };
  }, [isStack, backgroundColor]);
};
