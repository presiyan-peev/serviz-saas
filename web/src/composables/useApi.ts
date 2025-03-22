import axios from "axios";
import type { QueryParams } from "./useApi.types";
import { useErrorHandler } from "./utils/useErrorHandler";

const API_URL = import.meta.env.VITE_API_URL;

console.log({ env: import.meta.env });
const AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 4000,
  headers: { "X-Custom-Header": "foobar" },
});

export function useApi() {
  const { logApiRequestError, logApiResponseError } = useErrorHandler();

  const handleApiError = (error: any, url: string) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      logApiResponseError(error.response, url);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      logApiRequestError(error.request, url);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  };

  const getApi = async (url: string, params?: QueryParams) => {
    try {
      const response = await AxiosInstance.get(url, { params });
      return response;
    } catch (error) {
      handleApiError(error, url);
    }
  };

  const postApi = async (url: string, body: object, params?: QueryParams) => {
    try {
      const response = await AxiosInstance.post(url, body, { params });
      return response;
    } catch (error) {
      handleApiError(error, url);
    }
  };

  const patchApi = async (url: string, body: object, params?: QueryParams) => {
    try {
      const response = await AxiosInstance.patch(url, body, { params });
      return response;
    } catch (error) {
      handleApiError(error, url);
    }
  };

  const deleteApi = async (url: string, params: QueryParams) => {
    try {
      const response = await AxiosInstance.delete(url, { params });
      return response;
    } catch (error) {
      handleApiError(error, url);
    }
  };

  return {
    getApi,
    postApi,
    patchApi,
    deleteApi,
  };
}
