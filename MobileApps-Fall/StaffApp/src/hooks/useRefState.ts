import {useCallback, useRef, useState} from 'react';
import { prevFn } from "@/utils/functions";
import { TPrevFn } from "@/types";

export const useRefState = <T>(initVal: T): [T, (value: TPrevFn<T>) => void] => {
  const value = useRef(initVal)
  const setValue = useCallback((_value: TPrevFn<T>) => {
    value.current = prevFn<T>(value.current, _value)
  }, [value.current])

  return [value.current, setValue]
}
