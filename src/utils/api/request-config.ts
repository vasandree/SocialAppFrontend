import type { AxiosRequestConfig } from 'axios';

export type RequestConfig<Params = undefined> = Params extends undefined
  ? { config?: AxiosRequestConfig; queryParams?: Record<string, string> }
  : { params: Params; config?: AxiosRequestConfig; queryParams?: Record<string, string> };
