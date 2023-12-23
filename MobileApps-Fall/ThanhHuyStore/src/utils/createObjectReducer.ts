import {createSlice, PayloadAction, Store} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {TPrevFn} from '../types';
import {prevFn} from './functions';

export const createObjectReducer = <T>(name: string, initialState: T) => {
  const {actions, reducer} = createSlice({
    name,
    initialState: initialState,
    reducers: {
      set(state, action: PayloadAction<TPrevFn<T>>): T {
        // @ts-ignore
        return prevFn<T>(state, action.payload);
      },

      reset(): T {
        return initialState;
      },
    },
  });

  let _store: Store | undefined;

  const setStore = (store: Store) => {
    _store = store;
  };

  const getStore = (): Store => {
    if (!_store) {
      throw new Error(
        'You need to run setStore right after init store to use this function',
      );
    }

    return _store;
  };

  const use = (): T | undefined => {
    // @ts-ignore
    return useSelector(state => state[name]);
  };

  const get = (): T | undefined => {
    return getStore().getState()[name];
  };

  const sync = (item: TPrevFn<T>) => {
    return getStore().dispatch(actions.set(item));
  };

  const reset = () => {
    return getStore().dispatch(actions.reset());
  };

  return {
    name,
    setStore,
    getStore,
    get,
    sync,
    reset,
    use,
    reducer,
    actions,
  };
};
