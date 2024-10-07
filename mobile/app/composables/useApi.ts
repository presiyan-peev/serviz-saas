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
  function createRequestOptions(
    method: string,
    url: string,
    body?: any,
    headers?: any
  ): any {
    return {
      url: `${BASE_URL}${url}`,
      method: method,
      headers: { ...customHeaders.value, ...headers },
      content: body ? JSON.stringify(body) : undefined,
      allowLargeResponse: true,
      dontFollowRedirects: false,
      timeout: 10000,
      // Accept self-signed certificates
      rejectUnauthorized: false,
    };
  }

  function handleRequest(options: any) {
    return Http.request(options).then(handleResolve).catch(handleReject);
  }

  function getApi(url: string, params?: any, headers?: any) {
    const options = createRequestOptions("GET", url, undefined, headers);
    options.params = params;
    return handleRequest(options);
  }

  function postApi(url: string, body: any, headers?: any) {
    const options = createRequestOptions("POST", url, body, headers);
    return handleRequest(options);
  }

  function putApi(url: string, body: any, headers?: any) {
    const options = createRequestOptions("PUT", url, body, headers);
    return handleRequest(options);
  }

  function deleteApi(url: string, params?: any, headers?: any) {
    const options = createRequestOptions("DELETE", url, params, headers);
    return handleRequest(options);
  }

  function handleResolve(response: any) {
    if (response.statusCode >= 400) {
      throw new Error(response.content.toString());
    }
    return JSON.parse(response.content.toString());
  }

  function handleReject(err: any) {
    console.error("API Error:", err);

    if (err.message === "The network connection was lost.") {
      console.log(
        "Network connection lost. Please check your internet connection and server availability."
      );
      // You might want to add some code here to retry the request or notify the user
    }

    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", err.response.content.toString());
      console.error("Status code:", err.response.statusCode);
      console.error("Headers:", err.response.headers);
    } else if (err.request) {
      // The request was made but no response was received
      console.error("No response received. Request:", err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", err.message);
    }

    // You might want to add some code here to handle specific error types differently

    throw err;
  }

  return {
    getApi,
    postApi,
    putApi,
    deleteApi,
  };
}
