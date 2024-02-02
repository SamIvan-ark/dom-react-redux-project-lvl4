import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { useGetMessagesQuery } from '../../../api/messagesApi';
import CenteredSpinner from '../../CenteredSpinner';

const MessagesArea = () => {
  const { t } = useTranslation();
  const currentChannel = useSelector((state) => state.ui.channels.activeChannel);
  const lastItemRef = useRef();
  const { data: messages } = useGetMessagesQuery();
  const currentMessages = !messages ? [] : messages // сомнительно
    .filter((message) => message.channelId === currentChannel.id);

  const isLoading = !messages || !currentChannel;

  useEffect(() => {
    if (!isLoading) {
      lastItemRef.current.scrollIntoView();
    }
  }, [isLoading, messages]);

  return (isLoading) ? <CenteredSpinner /> : (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannel.name}`}</b>
        </p>
        <span className="text-muted">{t('entities.messages.count', { count: currentMessages.length })}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {currentMessages.map((message) => (
          <div key={message.id} className="text-break mb-2">
            <b>{message.author}</b>
            {`: ${message.text}`}
          </div>
        ))}
        <div ref={lastItemRef} />
      </div>
    </>
  );
};

export default MessagesArea;
