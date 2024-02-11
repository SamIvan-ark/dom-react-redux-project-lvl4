import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useAddMessageMutation } from '../../../api/messagesApi';
import { hooks } from '../../../providers';
import filterProfanity from '../../../utils/profanityChecker';

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
      <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
        <InputGroup hasValidation>
          <Form.Control
            aria-label={t('entities.messages.newMessage')}
            className="border-0 p-0 ps-2"
            disabled={isLoading}
            id="message"
            name="message"
            onChange={formik.handleChange}
            placeholder={t('userInteractions.enterMessage')}
            ref={inputRef}
            required
            type="text"
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
