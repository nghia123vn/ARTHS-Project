import { useEffect, useState } from "react";
import { BackHandler, Platform, ToastAndroid } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const useExitApp = () => {
  const [exitApp, setExitApp] = useState(0);
  const { canGoBack } = useNavigation();

  useEffect(() => {
    // Exit app handler
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (Platform.OS == "android" && !canGoBack()) {
          setTimeout(() => setExitApp(0), 2000);
          if (exitApp == 0) {
            setExitApp((prev) => prev + 1);
            ToastAndroid.show("Tab back again to exit", ToastAndroid.SHORT);
          } else if (exitApp == 1) {
            BackHandler.exitApp();
          }
          return true;
        }
      }
    );

    return () => {
      backHandler.remove();
    };
  }, [exitApp, canGoBack]);
};
