import { useApi } from "./useApi";
import type { AxiosResponse } from "axios";

export function useAuth() {
  const { postApi } = useApi();
  const login: (
    email: string,
    password: string
  ) => Promise<AxiosResponse<any, any> | undefined> = async (
    email,
    password
  ) => {
    return await postApi("/auth/login", { email, password });
  };

  return {
    login,
  };
}
