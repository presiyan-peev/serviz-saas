import { useApi } from "./useApi";
import type { AxiosResponse } from "axios";
import type { LocationQueryValue } from "vue-router";

export function useAuth() {
  const { postApi, patchApi } = useApi();

  const login: (
    email: string,
    password: string
  ) => Promise<AxiosResponse<any, any> | undefined> = async (
    email,
    password
  ) => {
    return await postApi("/auth/login", { email, password });
  };

  const requestPasswordResetToken: (
    email: string
  ) => Promise<AxiosResponse<any, any> | undefined> = async (email) => {
    return await postApi("/auth/forgot-password", { email });
  };

  const resetPassword: (
    password: string,
    resetToken: LocationQueryValue
  ) => Promise<AxiosResponse<any, any> | undefined> = async (
    password,
    resetToken
  ) => {
    return await postApi("/auth/reset-password", {
      password,
      resetToken,
    });
  };

  const changePassword: (
    oldPassowrd: string,
    newPassword: string
  ) => Promise<AxiosResponse<any, any> | undefined> = async (
    oldPassowrd,
    newPassword
  ) => {
    return await patchApi("/auth/change-password", {
      oldPassowrd,
      newPassword,
    });
  };

  return {
    login,
    requestPasswordResetToken,
    resetPassword,
    changePassword,
  };
}
