import { useSelector } from 'react-redux';

import CenteredSpinner from '../../CenteredSpinner';
import MessagesArea from './MessagesArea';
import MessageInput from './MessageInput';
import { useGetMessagesQuery } from '../../../api/messagesApi';

const MainArea = () => {
  const currentChannel = useSelector((state) => state.ui.channels.activeChannel);
  const { data: messages } = useGetMessagesQuery();
  const currentMessages = !messages ? [] : messages // сомнительно
    .filter((message) => message.channelId === currentChannel.id);

  const isLoading = !messages || !currentChannel;

  return (
    <div className="d-flex flex-column h-100">
      {isLoading
        ? <CenteredSpinner />
        : <MessagesArea messages={currentMessages} channel={currentChannel} />}
      <MessageInput />
    </div>
  );
};

export default MainArea;
