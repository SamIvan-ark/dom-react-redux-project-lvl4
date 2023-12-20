import { io } from 'socket.io-client';

const socketEventsNames = {
  NEW_MESSAGE: 'newMessage',
  NEW_CHANNEL: 'newChannel',
  REMOVE_CHANNEL: 'removeChannel',
  RENAME_CHANNEL: 'renameChannel',
};

const socket = io({
  autoConnect: false,
});

socket.on('connect', () => console.log('connected'));
// TODO: а как лучше — оставить так, что на каждое событие своя функция,
// или сделать одну функцию на все события сразу?
// Если одна абстракция лучше, где хранить все эти красивые имена событий?
// С одной стороны, сейчас достаточно удобно сделано, с другой — много дублирования
export const sendMessage = (data, cb = null) => {
  socket.emit(socketEventsNames.NEW_MESSAGE, data, cb);
};

export const addChannel = (data, cb = null) => {
  socket.emit(socketEventsNames.NEW_CHANNEL, data, cb);
};

export const removeChannel = (data, cb = null) => {
  socket.emit(socketEventsNames.REMOVE_CHANNEL, data, cb);
};

export const renameChannel = (data, cb = null) => {
  socket.emit(socketEventsNames.RENAME_CHANNEL, data, cb);
};

export default socket;
