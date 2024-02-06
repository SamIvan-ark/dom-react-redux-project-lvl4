import { toast } from 'react-toastify';

const options = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  theme: 'light',
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  draggablePercent: 25,
};

export default {
  success: (message) => toast.success(message, options),
  error: (message) => toast.error(message, options),
  info: (message) => toast.info(message, options),
};
