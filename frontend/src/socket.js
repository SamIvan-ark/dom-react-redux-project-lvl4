import { io } from 'socket.io-client';

const socket = io({
  autoConnect: false,
});

socket.on('connect', () => console.log('connected'));

export const sendMessage = (data, cb) => {
  socket.emit('newMessage', data, cb);
};

export const addChannel = (data, cb) => {
  socket.emit('newChannel', data, cb);
};

export default socket;
