import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { ArrowRightSquare } from 'react-bootstrap-icons';

import { hooks } from '../../../providers';
import filterProfanity from '../../../utils/profanityChecker';
import { useAddMessageMutation } from '../../../api/messagesApi';

const MessageInput = () => {
  const { t } = useTranslation();
  const { getUsername } = hooks.useAuth();
  const inputRef = useRef();
  const [sendNewMessage, { isSuccess, isLoading }] = useAddMessageMutation();
  const currentChannel = useSelector((state) => state.ui.channels.activeChannel);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const username = getUsername();
      const { message } = values;
      const filteredMessage = filterProfanity(message);
      sendNewMessage({
        text: filteredMessage,
        author: username,
        channelId: currentChannel.id,
      });
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      inputRef.current.focus();
    }
  }, [isSuccess]);

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
        <InputGroup hasValidation>
          <Form.Control
            className="border-0 p-0 ps-2"
            ref={inputRef}
            disabled={isLoading}
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
            disabled={isLoading || formik.values.message === ''}
            type="submit"
            variant="group-vertical"
          >
            <ArrowRightSquare size={20} />
            <span className="visually-hidden">+</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessageInput;
