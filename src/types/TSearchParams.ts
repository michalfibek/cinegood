import { URLSearchParamsInit } from "react-router";

export type TSearchParams =
  | URLSearchParamsInit
  | ((prev: URLSearchParams) => URLSearchParamsInit)
  | undefined;
