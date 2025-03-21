import { useErrorHandler } from "./utils/useErrorHandler";
import axios from "axios";

const Axios = axios.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

export function useApi() {
  const { logApiRequestError, logApiResponseError } = useErrorHandler();

  const handleApiError = (error, url: string) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      logApiResponseError(error.response, url);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      logApiResponseError(error.request, url);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  };

  const getApi = async (url: string, params: URLSearchParams) => {
    try {
      const response = await Axios.get(url, { params });
      return response;
    } catch (error) {
      handleApiError(error, url);
    }
  };

  const postApi = async (url: string, body, params) => {
    try {
      const response = await Axios.post(url, body, params);
      return response;
    } catch (error) {
      handleApiError(error, url);
    }
  };

  const patchApi = async (url: string, body, params) => {
    try {
      const response = await Axios.patch(url, body, params);
      return response;
    } catch (error) {
      handleApiError(error, url);
    }
  };

  const deleteApi = async (url: string, body) => {
    try {
      const response = await Axios.delete(url, body);
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
