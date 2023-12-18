import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import ChannelsListArea from './ChannelsListArea';
import MainArea from './MainArea';
import socket from '../../socket';
import { addMessage } from '../../slices/messagesSlice';
import { addChannel } from '../../slices/channelsSlice';

const Chat = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const onNewMessage = (message) => dispatch(addMessage(message));
    const onNewChannel = (newChannel) => dispatch(addChannel(newChannel));
    socket.on('newMessage', onNewMessage);
    socket.on('newChannel', onNewChannel);
    return () => {
      socket.off('newMessage', onNewMessage);
      socket.off('newChannel', onNewChannel);
    };
  }, []);

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelsListArea />
        </div>
        <div className="col p-0 h-100">
          <MainArea />
        </div>
      </div>
    </div>
  );
};

export default Chat;
