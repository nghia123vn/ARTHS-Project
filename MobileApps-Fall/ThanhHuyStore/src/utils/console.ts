import {LogBox} from "react-native";

export const ignoreWarnings = (ignoreWarns: string[]) => {
  if (__DEV__) {
    const warn = console.warn;
    console.warn = (...arg) => {
      for (const warning of ignoreWarns) {
        if (arg[0].startsWith(warning)) {
          return;
        }
      }
      warn(...arg);
    };

    LogBox.ignoreLogs(ignoreWarns);
  }
}
export const ignoreErrors = (ignoreErrors: string[]) => {
  if (__DEV__) {
    const error = console.error;
    console.error = (...arg) => {
      for (const error of ignoreErrors) {
        if (arg[0].startsWith(error)) {
          return;
        }
      }
      error(...arg);
    };

    LogBox.ignoreLogs(ignoreErrors);
  }
}
