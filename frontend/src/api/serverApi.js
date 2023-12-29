import axios from 'axios';

export const sendData = (route, values) => axios.post(route, values);

export const fetchData = async (route, headers) => {
  const response = await axios.get(route, headers);
  return response;
};
