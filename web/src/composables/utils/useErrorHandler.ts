import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { useNotify } from "../useSnackbar";
import { apiErrorMessages } from "./apiErrorMessages";

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

  const logApiResponseError = (
    response: AxiosResponse,
    url: string,
    errorMessage: string
  ) => {
    console.error(errorMessage, url);
    console.info(response.data);
    console.info(response.status);
    notifyError({
      title:
        apiErrorMessages[response.data.internalCode] || "Error receiving data",
    });
  };

  const logApiRequestError = (
    request: AxiosRequestConfig,
    url: string,
    errorMessage: string
  ) => {
    console.error(errorMessage, url);
    console.info(request.data);
    notifyError({ title: "Failed to connect to server" });
  };

  return {
    logErrorToConsole,
    logErrorToConsoleAndNotifyUser,

    logApiResponseError,
    logApiRequestError,
  };
}
