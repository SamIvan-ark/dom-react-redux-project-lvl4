import { toast } from 'react-toastify';

const options = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  draggable: true,
  theme: 'light',
};

export default {
  success: (message) => toast.success(message, options),
  error: (message) => toast.error(message, options),
};
