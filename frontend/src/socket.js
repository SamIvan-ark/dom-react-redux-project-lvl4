import { io } from 'socket.io-client';

const socketEventsNames = {
  NEW_MESSAGE: 'newMessage',
  NEW_CHANNEL: 'newChannel',
  REMOVE_CHANNEL: 'removeChannel',
};

const socket = io({
  autoConnect: false,
});

socket.on('connect', () => console.log('connected'));

export const sendMessage = (data, cb = null) => {
  socket.emit(socketEventsNames.NEW_MESSAGE, data, cb);
};

export const addChannel = (data, cb = null) => {
  socket.emit(socketEventsNames.NEW_CHANNEL, data, cb);
};

export const removeChannel = (data, cb = null) => {
  socket.emit(socketEventsNames.REMOVE_CHANNEL, data, cb);
};

export default socket;
