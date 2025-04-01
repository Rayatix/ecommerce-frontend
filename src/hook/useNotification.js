import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

// To Make Notification To Any Component
const notify = (message, type) => {
  if (type === "success") {
    toast.success(message);
  } else if (type === "warning") {
    toast.warning(message);
  } else if (type === "error") {
    toast.error(message);
  } else {
    toast(message);
  }
};

export default notify;
