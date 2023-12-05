import { io } from 'socket.io-client';

const socket = io();
socket.on('newMessage', (message) => {
  console.log(message);
});

socket.on('connect', () => {
  console.log(socket.connected); // true
});

export default socket;
