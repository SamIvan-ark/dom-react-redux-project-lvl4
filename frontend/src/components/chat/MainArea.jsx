import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { ArrowRightSquare } from 'react-bootstrap-icons';

import useApi from '../../hooks/useApi';
import filterProfanity from '../../utils/profanityChecker';

const MainArea = () => {
  const { t } = useTranslation();
  const { newMessage } = useApi();
  const inputRef = useRef();
  const lastItemRef = useRef();
  const messages = useSelector((state) => state.messages.entities);
  const currentChannelId = useSelector((state) => state.channels.ui.active);
  const currentChannelInfo = useSelector((state) => state.channels.entities[currentChannelId]);
  const currentMessages = Object
    .values(messages)
    .filter((message) => message.channelId === currentChannelId);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const userData = localStorage.getItem('userId');
      const { username } = JSON.parse(userData);
      const { message } = values;
      const filteredMessage = filterProfanity(message);
      newMessage({
        text: filteredMessage,
        author: username,
        channelId: currentChannelId,
      }, ({ status }) => {
        if (status === 'ok') {
          formik.resetForm();
        }
      });
    },
  });

  useEffect(() => {
    inputRef.current.focus();
    lastItemRef.current.scrollIntoView();
  }, [currentMessages]);

  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b>{`# ${currentChannelInfo.name}`}</b>
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
      <div className="mt-auto px-5 py-3">
        <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
          <InputGroup hasValidation>
            <Form.Control
              className="border-0 p-0 ps-2"
              ref={inputRef}
              disabled={formik.isSubmitting}
              type="text"
              name="message"
              id="message"
              placeholder={t('userInteractions.enterMessage')}
              aria-label={t('entities.messages.newMessage')}
              required
              onChange={formik.handleChange}
              value={formik.values.message}
            />
            <Button
              className="border-0 p-0 ps-2"
              disabled={formik.isSubmitting || formik.values.message === ''}
              type="submit"
              variant="group-vertical"
            >
              <ArrowRightSquare size={20} />
              <span className="visually-hidden">+</span>
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default MainArea;
