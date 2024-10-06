import { ref } from "@vue/runtime-core";
import { useApi } from "./useApi";
import { useLocalStorageAuth } from "./useLocalStorageAuth";

export function useLogin() {
  const { postApi } = useApi();
  const { setAuthToken, clearAuthToken } = useLocalStorageAuth();
  const loading = ref(false);
  const error = ref(null);

  async function login(email: string, password: string) {
    loading.value = true;
    error.value = null;
    try {
      const response = await postApi("/login", { email, password });
      if (response.token) {
        setAuthToken(response.token);
        return true;
      }
      return false;
    } catch (err) {
      error.value = err.message || "Login failed";
      return false;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    clearAuthToken();
  }

  return {
    loading,
    error,
    login,
    logout,
  };
}
