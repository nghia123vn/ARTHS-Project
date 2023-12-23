import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";

export const flatStyles = (
  ...arr: (
    | StyleProp<ViewStyle | TextStyle | ImageStyle>
    | StyleProp<ViewStyle | TextStyle | ImageStyle>[]
    | undefined
    | null
  )[]
) => {
  if (!Array.isArray(arr)) return arr;
  //@ts-ignore
  return arr.flat() as object;
};

Array.prototype.changeIndex = function (old_index, new_index) {
  if (new_index >= this.length) {
    let k = new_index - this.length + 1;
    while (k--) {
      this.push(undefined);
    }
  }
  this.splice(new_index, 0, this.splice(old_index, 1)[0]);
  return this; // for testing
};

Array.prototype.insert = function (item: any, index?: number) {
  if (index === undefined || index > this.length - 1) {
    this.push();
    return this;
  }
  if (index === 0) {
    this.unshift();
    return this;
  }
  this.splice(index, 0, item);
  return this;
};

Array.prototype.sum = function () {
  return this.reduce((partialSum, a) => partialSum + a, 0);
};
