import { ref } from "@vue/runtime-core";
import { ApplicationSettings } from "@nativescript/core";

const AUTH_TOKEN_KEY = "auth_token";

export function useLocalStorageAuth() {
  const localStorageAuthToken = ref(
    ApplicationSettings.getString(AUTH_TOKEN_KEY) || ""
  );

  function setAuthToken(token: string) {
    ApplicationSettings.setString(AUTH_TOKEN_KEY, token);
    localStorageAuthToken.value = token;
  }

  function clearAuthToken() {
    ApplicationSettings.remove(AUTH_TOKEN_KEY);
    localStorageAuthToken.value = "";
  }

  return {
    localStorageAuthToken,
    setAuthToken,
    clearAuthToken,
  };
}
