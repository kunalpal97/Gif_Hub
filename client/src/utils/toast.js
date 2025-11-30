import { useToast } from "../context/ToastContext";

export const useToaster = () => {
  const { showToast } = useToast();
  return { toastSuccess: (m) => showToast(m, "success"),
           toastError: (m) => showToast(m, "error"),
           toastWarn: (m) => showToast(m, "warning")
         };
};
