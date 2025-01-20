import { toast } from "react-toastify";

export const useToast = () => {
  const showSuccess = (message) => {
    toast.success(message, { position: "top-right", autoClose: 3000 });
  };

  const showError = (message) => {
    toast.error(message, { position: "top-right", autoClose: 3000 });
  };

  return { showSuccess, showError };
};
