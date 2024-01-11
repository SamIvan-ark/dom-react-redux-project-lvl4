import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ChannelsListArea from './ChannelsListArea';
import MainArea from './MainArea';
import { hooks } from '../../providers';
import { addMessage } from '../../slices/messagesSlice';
import {
  addChannel,
  removeChannel,
  renameChannel,
  setActive,
} from '../../slices/channelsSlice';

const Chat = () => {
  const { socket } = hooks.useApi();
  const { getUsername } = hooks.useAuth();
  const dispatch = useDispatch();
  const { active: activeChannelId, defaultChannel } = useSelector((state) => state.channels.ui);

  useEffect(() => {
    const onNewChannel = ({ author, ...newChannel }) => {
      const username = getUsername();
      if (username === author) {
        dispatch(setActive(newChannel.id));
      }
      dispatch(addChannel(newChannel));
    };
    const onNewMessage = (message) => dispatch(addMessage(message));
    const onRenamingChannel = ({ id, name }) => {
      dispatch(renameChannel({
        id,
        changes: {
          name,
        },
      }));
    };
    socket.on('newChannel', onNewChannel);
    socket.on('newMessage', onNewMessage);
    socket.on('renameChannel', onRenamingChannel);
    return () => {
      socket.off('newChannel', onNewChannel);
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
