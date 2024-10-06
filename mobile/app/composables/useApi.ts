import { computed } from "@vue/runtime-core";
import { Http } from "@nativescript/core";
import { useLocalStorageAuth } from "./useLocalStorageAuth";

const { localStorageAuthToken } = useLocalStorageAuth();

const BASE_URL = process.env.VUE_APP_API_URL;

const options = {
  baseURL: new URL("", BASE_URL).toString(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const customHeaders = computed(() => ({
  Authorization: `Bearer ${localStorageAuthToken.value}`,
  Accept: "application/json",
}));

export function useApi() {
  function getApi(url: string, params?: any, headers?: any) {
    return Http.request({
      url: url,
      method: "GET",
      headers: { ...customHeaders.value, ...headers },
      // @ts-ignore
      params: params,
    })
      .then(handleResolve)
      .catch(handleReject);
  }

  function postApi(url: string, body: any, headers?: any) {
    return Http.request({
      url: url,
      method: "POST",
      headers: { ...customHeaders.value, ...headers },
      content: JSON.stringify(body),
    })
      .then(handleResolve)
      .catch(handleReject);
  }

  function putApi(url: string, body: any, headers?: any) {
    return Http.request({
      url: url,
      method: "PUT",
      headers: { ...customHeaders.value, ...headers },
      content: JSON.stringify(body),
    })
      .then(handleResolve)
      .catch(handleReject);
  }

  function deleteApi(url: string, params?: any, headers?: any) {
    return Http.request({
      url: url,
      method: "DELETE",
      headers: { ...customHeaders.value, ...headers },
      content: JSON.stringify(params),
    })
      .then(handleResolve)
      .catch(handleReject);
  }

  function handleResolve(response: any) {
    if (response.statusCode >= 400) {
      throw new Error(response.content.toString());
    }
    return JSON.parse(response.content.toString());
  }

  function handleReject(err: any) {
    console.error("API Error:", err);
    throw err;
  }

  return {
    getApi,
    postApi,
    putApi,
    deleteApi,
  };
}
