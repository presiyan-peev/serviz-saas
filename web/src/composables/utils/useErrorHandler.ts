import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { useNotify } from "../useSnackbar";

const { notifyError } = useNotify();
// err: unknown, instance: ComponentPublicInstance | null, info: string
export function useErrorHandler() {
  const logErrorToConsole = (
    err: unknown,
    vm: ComponentPublicInstance | null,
    info: string
  ) => {
    console.error("Error:", err);
    console.error("Vue component:", vm);
    console.error("Additional info:", info);
  };

  const logErrorToConsoleAndNotifyUser = (
    err: unknown,
    vm: ComponentPublicInstance | null,
    info: string,
    errorMessage = "Unhandled Error"
  ) => {
    logErrorToConsole(err, vm, info);
    notifyError({ title: errorMessage });
  };

  const logApiResponseError = (response: AxiosResponse, url: string) => {
    console.error("FAILED RESPONSE FROM: ", url);
    console.error(response.data);
    console.error(response.status);
    console.error(response.headers);
  };

  const logApiRequestError = (request: AxiosRequestConfig, url: string) => {
    console.error("FAILED REQUEST TO: ", url);
    console.error(request.data);
  };

  return {
    logErrorToConsole,
    logErrorToConsoleAndNotifyUser,

    logApiResponseError,
    logApiRequestError,
  };
}
