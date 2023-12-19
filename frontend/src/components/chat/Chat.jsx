import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChannelsListArea from './ChannelsListArea';
import MainArea from './MainArea';
import socket from '../../socket';
import { addMessage } from '../../slices/messagesSlice';
import { addChannel, setNeedToMove, setActive } from '../../slices/channelsSlice';

const Chat = () => {
  const dispatch = useDispatch();
  const needToMoveOnNewChannel = useSelector((state) => state.channels.ui.needToMove);

  useEffect(() => {
    const onNewMessage = (message) => dispatch(addMessage(message));
    socket.on('newMessage', onNewMessage);
    return () => {
      socket.off('newMessage', onNewMessage);
    };
  }, []);

  useEffect(() => {
    const onNewChannel = (newChannel) => {
      if (needToMoveOnNewChannel) {
        dispatch(setActive(newChannel.id));
        dispatch(setNeedToMove(false));
      }
      dispatch(addChannel(newChannel));
    };
    socket.on('newChannel', onNewChannel);
    return () => {
      socket.off('newChannel', onNewChannel);
    };
  }, [needToMoveOnNewChannel]);

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
