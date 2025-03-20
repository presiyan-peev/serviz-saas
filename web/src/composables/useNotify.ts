import type { VSnackbar } from "vuetify/lib/components/index.mjs";

// extracted from: https://stackoverflow.com/a/77201828
type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : A;
type VSnackbarProps = UnwrapReadonlyArray<VSnackbar["$props"]>;

type NotifyFunctionProps = {
  title?: string;
  explanation?: string;
  additionalProps?: VSnackbarProps;
};

type NotifyFunction = (props: NotifyFunctionProps) => void;

const WARNING_PROPS = {
  color: "warning",
};

const ERROR_PROPS = {
  color: "error",
};

const SUCCESS_PROPS = {
  color: "success",
};

const INFO_PROPS = {
  color: "success",
};

const snackbarProps = ref({});
const showSnackbar = ref(false);

export function useNotify() {
  const notifyError: NotifyFunction = ({
    title,
    explanation,
    additionalProps,
  }) => {
    snackbarProps.value = {
      ...ERROR_PROPS,
      additionalProps,
      title,
      explanation,
    };
    showSnackbar.value = true;
  };

  const notifyWarning: NotifyFunction = ({
    title,
    explanation,
    additionalProps,
  }) => {
    snackbarProps.value = {
      ...WARNING_PROPS,
      additionalProps,
      title,
      explanation,
    };
    showSnackbar.value = true;
  };

  const notifySuccess: NotifyFunction = ({
    title,
    explanation,
    additionalProps,
  }) => {
    snackbarProps.value = {
      ...SUCCESS_PROPS,
      additionalProps,
      title,
      explanation,
    };
    showSnackbar.value = true;
  };

  const notifyInfo: NotifyFunction = ({
    title,
    explanation,
    additionalProps,
  }) => {
    snackbarProps.value = {
      ...INFO_PROPS,
      additionalProps,
      title,
      explanation,
    };
    showSnackbar.value = true;
  };

  return {
    showSnackbar,
    snackbarProps,

    notifyError,
    notifyWarning,
    notifySuccess,
    notifyInfo,
  };
}
