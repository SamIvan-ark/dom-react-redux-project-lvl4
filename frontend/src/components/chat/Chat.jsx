import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import channelsApi from '../../api/channelsApi';
import messagesApi from '../../api/messagesApi';
import { hooks } from '../../providers';
import { setActive } from '../../slices/uiSlice';
import ChannelsListArea from './ChannelsListArea';
import MainArea from './MainArea';

const Chat = () => {
  const { socket } = hooks.useApi();
  const { getUsername } = hooks.useAuth();
  const username = getUsername();
  const { activeChannel, defaultChannel } = useSelector((state) => state.ui.channels);
  const dispatch = useDispatch();
  useEffect(() => {
    const onNewChannel = (newChannel) => {
      if (username === newChannel.author) {
        dispatch(setActive(newChannel));
      }
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        draft.push(newChannel);
      }));
    };
    const onNewMessage = (message) => {
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (draft) => {
        draft.push(message);
      }));
    };
    const onRenamingChannel = (channel) => {
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const updatedDraft = draft.map((oldChannel) => (
          oldChannel.id === channel.id
            ? channel
            : oldChannel
        ));
        return updatedDraft;
      }));
    };
    const onRemovingChannel = ({ id }) => {
      if (activeChannel.id === id) {
        dispatch(setActive(defaultChannel));
      }
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
        const updatedDraft = draft.filter((oldChannel) => oldChannel.id !== id);
        return updatedDraft;
      }));
    };
    socket.on('newChannel', onNewChannel);
    socket.on('newMessage', onNewMessage);
    socket.on('renameChannel', onRenamingChannel);
    socket.on('removeChannel', onRemovingChannel);
    return () => {
      socket.off('newChannel', onNewChannel);
      socket.off('newMessage', onNewMessage);
      socket.off('renameChannel', onRenamingChannel);
      socket.off('removeChannel', onRemovingChannel);
    };
  }, [dispatch, getUsername, socket, activeChannel]);

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
