import 'styled-components/native';
import {Colors} from './index';

type TColor = typeof Colors;

type _DefaultTheme = {
  name: string;
  backgroundColor: string;
  primaryColor: string;
  statusHeight: number;
  bottomSpace: number;
  windowHeight: number;
  windowWidth: number;
  // keyboardHeight: number;
} & TColor;

declare module 'styled-components/native' {
  export interface DefaultTheme extends _DefaultTheme {}
}

declare module 'styled-components' {
  export interface DefaultTheme extends _DefaultTheme {}
}
