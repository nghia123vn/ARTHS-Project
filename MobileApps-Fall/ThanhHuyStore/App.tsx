/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from "react";
import { memo, useEffect } from "react";
import { LogBox, StatusBar, Text, TouchableOpacity, TextInput, Platform } from "react-native";
import { ignoreWarnings } from "@/utils/console";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import { setupStore, store } from "@/store";
import { AnimatedWindowProvider } from "@/context/AnimatedWindowContext";
import { Routes } from "@/Routes";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { getFcmToken, NotificationHandler } from "@/utils/notification";

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

ignoreWarnings([""]);
LogBox.ignoreLogs([""]);
// @ts-ignore
TouchableOpacity.defaultProps = {
  // @ts-ignore
  ...(TouchableOpacity.defaultProps || {}),
  activeOpacity: 0.6,
};
// @ts-ignore
Text.defaultProps = {
  // @ts-ignore
  ...(Text.defaultProps || {}),
  maxFontSizeMultiplier: 1.3,
};
// @ts-ignore
TextInput.defaultProps = {
  // @ts-ignore
  ...(TextInput.defaultProps || {}),
  maxFontSizeMultiplier: 1.3,
};
const App = memo(() => {
  useEffect(() => {
    // Request permission to receive push notifications on iOS
    getFcmToken().then();
    // requestUserPermission().then();
    NotificationHandler().then()
  }, []);
  const {persistor} = setupStore()
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <GestureHandlerRootView
          style={{
            flex: 1,
          }}
        >
          <AnimatedWindowProvider>
            <SafeAreaProvider>
              <StatusBar
                barStyle={"light-content"}
                backgroundColor={"transparent"}
                translucent={true}
              />
              <BottomSheetModalProvider>
                <Routes/>
              </BottomSheetModalProvider>
            </SafeAreaProvider>
          </AnimatedWindowProvider>
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
});

export default App;
