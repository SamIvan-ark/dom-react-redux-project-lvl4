import { shallowEqual, useSelector } from 'react-redux';

import { useGetMessagesQuery } from '../../../api/messagesApi';
import CenteredSpinner from '../../CenteredSpinner';
import MessageInput from './MessageInput';
import MessagesArea from './MessagesArea';

const MainArea = () => {
  const currentChannel = useSelector((state) => state.ui.channels.activeChannel, shallowEqual);
  const { data: messages } = useGetMessagesQuery();
  const currentMessages = messages
    ?.filter((message) => message.channelId === currentChannel.id) ?? [];

  const isLoading = !messages || !currentChannel;

  return (
    <div className="d-flex flex-column h-100">
      {isLoading
        ? <CenteredSpinner />
        : <MessagesArea channel={currentChannel} messages={currentMessages} />}
      <MessageInput />
    </div>
  );
};

export default MainArea;
