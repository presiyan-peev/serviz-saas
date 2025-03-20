import { useNotify } from "../useSnackbar";

const { notifyError } = useNotify();

export function useErrorHandler() {
  function logErrorToConsole(err, vm, info) {
    console.error("Error:", err);
    console.error("Vue component:", vm);
    console.error("Additional info:", info);
  }

  function logErrorToConsoleAndNotifyUser(
    err,
    vm,
    info,
    errorMessage = "Unhandled Error"
  ) {
    logErrorToConsole(err, vm, info);
    notifyError({ title: errorMessage });
  }

  return {
    logErrorToConsole,
    logErrorToConsoleAndNotifyUser,
  };
}
