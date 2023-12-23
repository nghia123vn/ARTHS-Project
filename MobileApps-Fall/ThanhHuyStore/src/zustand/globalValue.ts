import create from "zustand/esm";
import shallow from "zustand/esm/shallow";

export interface RawGlobalValue {
  accessToken: string;
}

const globalValueStore = create<RawGlobalValue>(() => (
  {
    accessToken: ""
  }));

export const useGlobalValue = () => {
  return globalValueStore(state => state, shallow);
};
export const setGlobalValue = (value: RawGlobalValue) => {
  return globalValueStore.setState(value);
};
export const getGlobalValue = () => {
  return globalValueStore.getState();
};
