// NotificationService.js
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Exportable functions for different types of notifications
const NotificationService = {
  success: (message) => {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000 // 3 seconds auto-close
    });
  },
  error: (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000
    });
  },
  info: (message) => {
    toast.info(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000
    });
  },
  warning: (message) => {
    toast.warn(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000
    });
  }
};

// Export a ToastContainer to include in your App component
export const NotificationContainer = () => <ToastContainer />;

export default NotificationService;
