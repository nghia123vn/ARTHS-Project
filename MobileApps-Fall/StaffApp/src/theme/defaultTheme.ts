import {Colors} from './index';

export const defaultTheme = {
  light: {
    ...Colors,
    backgroundColor: Colors.white,
    primaryColor: Colors.grey5,
  },
  dark: {
    ...Colors,
    backgroundColor: Colors.black,
    primaryColor: Colors.grey5,
    grey1: Colors.grey6,
    grey2: Colors.grey5,
    grey3: Colors.grey4,
    grey4: Colors.grey3,
    grey5: Colors.grey2,
    grey6: Colors.grey1,
    white: Colors.black,
    black: Colors.white,
  },
};
