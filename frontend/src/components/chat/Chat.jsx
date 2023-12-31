import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChannelsListArea from './ChannelsListArea';
import MainArea from './MainArea';
import useApi from '../../hooks/useApi';
import { addMessage } from '../../slices/messagesSlice';
import {
  addChannel,
  removeChannel,
  renameChannel,
  setNeedToMove,
  setActive,
} from '../../slices/channelsSlice';

const Chat = () => {
  const { socket } = useApi();
  const dispatch = useDispatch();
  const needToMoveOnNewChannel = useSelector((state) => state.channels.ui.needToMove);
  const { active: activeChannelId, defaultChannel } = useSelector((state) => state.channels.ui);

  useEffect(() => {
    const onNewMessage = (message) => dispatch(addMessage(message));
    const onRenamingChannel = ({ id, name }) => {
      dispatch(renameChannel({
        id,
        changes: {
          name,
        },
      }));
    };
    socket.on('newMessage', onNewMessage);
    socket.on('renameChannel', onRenamingChannel);
    return () => {
      socket.off('newMessage', onNewMessage);
      socket.off('renameChannel', onRenamingChannel);
    };
  }, []);

  useEffect(() => {
    const onRemovingChannel = ({ id }) => {
      if (activeChannelId === id) {
        dispatch(setActive(defaultChannel));
      }
      dispatch(removeChannel(id));
    };
    socket.on('removeChannel', onRemovingChannel);
    return () => {
      socket.off('removeChannel', onRemovingChannel);
    };
  }, [activeChannelId]);

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
