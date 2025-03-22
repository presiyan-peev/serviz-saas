import type { AxiosResponse } from "axios";

export type QueryParams = object | URLSearchParams | undefined;

export type PostFunction<T> = (
  url: string,
  body: T,
  params: Object
) => Promise<AxiosResponse<any, any> | undefined>;
