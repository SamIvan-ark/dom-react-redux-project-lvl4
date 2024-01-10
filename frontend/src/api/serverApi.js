import axios from 'axios';

export const sendCredentials = (route, credentials) => axios.post(route, credentials);

export const fetchChatData = async (route, headers) => {
  const response = await axios.get(route, headers);
  return response;
};
