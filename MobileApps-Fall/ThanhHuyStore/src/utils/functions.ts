import React, { forwardRef, memo, RefObject } from "react";
import { TPrevFn, TPrevPFn } from "../types";

// usage: get prevState when use set function
export const prevFn = <T>(prev: T, value: TPrevFn<T>): T =>
  // @ts-ignore
  typeof value === "function" ? value(prev) : value;

export const prevPFn = <P, T>(prev: P, value: TPrevPFn<P, T>): T =>
  // @ts-ignore
  typeof value === "function" ? value(prev) : value;

// interface ForwardRefRenderFunction<T, P = {}> {
//   (props: P, ref: RefObject<T>): ReactElement | null;
//   displayName?: string | undefined;
//   defaultProps?: never | undefined;
//   propTypes?: never | undefined;
// }

export const typeMemo: <T>(c: T) => T = memo;

export const memoForwardRef = <T, P = {}>(
  c: (props: P, ref: RefObject<T>) => React.ReactElement | null
): ((props: P & React.RefAttributes<T>) => React.ReactElement | null) =>
  // @ts-ignore
  memo(forwardRef(c));

export const noop = () => {}
