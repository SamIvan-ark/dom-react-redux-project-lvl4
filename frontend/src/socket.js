import { io } from 'socket.io-client';

const socket = io({
  autoConnect: false,
});

socket.on('connect', () => console.log('connected'));
export default socket;
