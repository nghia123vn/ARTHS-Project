import { createSlice, PayloadAction, Store } from "@reduxjs/toolkit";
import _ from "lodash";
import { useSelector } from "react-redux";
import { TPrevFn, TPrevPFn } from "@/types";
import { prevFn, prevPFn } from "./functions";

type TQuery = string[];

export type DynamicState<T> = {
  byKey: Record<string, T>;
  query: Record<string, TQuery>;
};

export const createArrayReducer = <T extends { [id: string]: any }>(
  name: string,
  mainKey: string[],
  initialState: DynamicState<T> = { byKey: {}, query: {} }
) => {
  const { actions, reducer } = createSlice({
    name,
    initialState: initialState,
    reducers: {
      multiSet(
        state,
        action: PayloadAction<TPrevPFn<Record<string, T>, T[]>>
      ): DynamicState<T> {
        let pairs = [];
        for (let key of mainKey) {
          // @ts-ignore
          for (let item of prevPFn<Record<string, T>, T[]>(
            //@ts-ignore
            state?.byKey,
            action.payload
          )) {
            pairs.push([item[key], item]);
          }
        }
        return {
          ...state,
          byKey: {
            ...state?.byKey,
            ..._.fromPairs(pairs),
          },
        };
      },
      delete(state, action: PayloadAction<T[]>): DynamicState<T> {
        let pairs = [];
        for (let key of mainKey) {
          for (let item of action.payload) {
            pairs.push([item[key], undefined]);
          }
        }
        return {
          ...state,
          byKey: {
            ...state?.byKey,
            ..._.fromPairs(pairs),
          },
        };
      },
      setQueries(
        state,
        action: PayloadAction<TPrevFn<Record<string, TQuery>>>
      ): DynamicState<T> {
        const newQuery = prevFn<Record<string, TQuery>>(
          state.query,
          action.payload
        );
        return {
          ...state,
          query: newQuery,
        } as DynamicState<T>;
      },
      reset(): DynamicState<T> {
        return {
          ...initialState,
        } as DynamicState<T>;
      },
    },
  });

  const use = (): Record<string, T> => {
    // @ts-ignore
    return useSelector((state) => state[name]?.byKey);
  };

  const useByKey = (key?: string | number): T | undefined => {
    // @ts-ignore
    return useSelector((state) => state[name]?.byKey[key]);
  };

  const emptyArray: string[] = [];
  const useKeysByQuery = (query: string = "default"): TQuery => {
    // @ts-ignore
    return useSelector((state) => state?.[name]?.query?.[query]) || emptyArray;
  };

  let _store: Store | undefined;
  const setStore = (store: Store) => {
    _store = store;
  };

  const _getStore = (): Store => {
    if (!_store) {
      throw new Error(
        "You need to run setStore right after init store to use this function"
      );
    }

    return _store;
  };

  const get = (): Record<string, T> => {
    return _getStore().getState()[name]?.byKey;
  };

  const getByKey = (key: string | number): T | undefined => {
    return _getStore().getState()[name]?.byKey[key];
  };

  const getKeysByQuery = (query: string): TQuery => {
    return _getStore().getState()[name].query[query] || emptyArray;
  };

  const sync = (items: TPrevPFn<Record<string, T>, T[]>) => {
    return _getStore().dispatch(actions.multiSet(items));
  };

  const deleteItem = (items: T[]) => {
    return _getStore().dispatch(actions.delete(items));
  };

  const setQueries = (fn: TPrevFn<Record<string, TQuery>>) => {
    return _getStore().dispatch(actions.setQueries(fn));
  };

  const reset = () => {
    return _getStore().dispatch(actions.reset());
  };

  return {
    name,
    actions,
    reducer,
    use,
    get,
    useByKey,
    useKeysByQuery,
    getByKey,
    getKeysByQuery,
    setStore,
    sync,
    deleteItem,
    setQueries,
    reset,
  };
};
