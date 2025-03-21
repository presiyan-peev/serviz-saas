import { useNotify } from "../useSnackbar";

const { notifyError } = useNotify();

export function useErrorHandler() {
  const logErrorToConsole = (err, vm, info) => {
    console.error("Error:", err);
    console.error("Vue component:", vm);
    console.error("Additional info:", info);
  };

  const logErrorToConsoleAndNotifyUser = (
    err,
    vm,
    info,
    errorMessage = "Unhandled Error"
  ) => {
    logErrorToConsole(err, vm, info);
    notifyError({ title: errorMessage });
  };

  const logApiResponseError = (response, url: string) => {
    console.error("FAILED RESPONSE FROM: ", url);
    console.error(response.data);
    console.error(response.status);
    console.error(response.headers);
  };

  const logApiRequestError = (request, url: string) => {
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
