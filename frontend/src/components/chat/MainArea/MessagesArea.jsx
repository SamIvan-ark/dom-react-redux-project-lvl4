import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const MessagesArea = ({ messages, channel }) => {
  const { t } = useTranslation();
  const lastItemRef = useRef();

  useEffect(() => {
    lastItemRef.current.scrollIntoView();
  }, [messages, channel]);

  return (
    <>
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${channel.name}`}</b>
        </p>
        <span className="text-muted">{t('entities.messages.count', { count: messages.length })}</span>
      </div>
      <div className="chat-messages overflow-auto px-5" id="messages-box">
        {messages.map((message) => (
          <div className="text-break mb-2" key={message.id}>
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
