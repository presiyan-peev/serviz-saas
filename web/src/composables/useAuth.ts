import { useApi } from "./useApi";
import type { AxiosResponse } from "axios";

export function useAuth() {
  const { postApi } = useApi();
  const login: (
    username: string,
    password: string
  ) => Promise<AxiosResponse<any, any> | undefined> = async (
    username,
    password
  ) => {
    return await postApi("/login", { username, password });
  };

  return {
    login,
  };
}
