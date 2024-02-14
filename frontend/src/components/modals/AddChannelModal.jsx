import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { useAddChannelMutation, useGetChannelsQuery } from '../../api/channelsApi';
import { hooks } from '../../providers';
import { closeModal } from '../../slices/uiSlice';
import filterProfanity from '../../utils/profanityChecker';
import toasts from '../../utils/toasts';

const AddChannel = () => {
  const { t } = useTranslation();
  const { getUsername } = hooks.useAuth();
  const { data: allChannels } = useGetChannelsQuery();
  const takenNames = Object.values(allChannels).map(({ name }) => name);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  const [sendNewChannel, {
    isLoading,
    isSuccess,
  }] = useAddChannelMutation();

  const validationSchema = yup.object().shape({
    channelName: yup
      .string()
      .min(3, t('errors.lengthFromTo', { from: 3, to: 20 }))
      .max(20, t('errors.lengthFromTo', { from: 3, to: 20 }))
      .required(t('errors.emptyField'))
      .transform((value) => filterProfanity(value))
      .notOneOf(takenNames, t('errors.channelAlreadyExist')),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: ({ channelName }) => {
      const censoredName = filterProfanity(channelName);
      const username = getUsername();
      sendNewChannel(
        { name: censoredName, author: username },
      );
    },
  });

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      toasts.success(t('processes.channelCreated'));
    }
  }, [isSuccess, t]);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [formik.errors.channelName]);

  return (
    <Modal centered onHide={() => handleClose()} show>
      <Modal.Header closeButton>
        <Modal.Title>{t('actions.addChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="form-group">
            <Form.Label className="visually-hidden" htmlFor="channelName">
              {t('entities.channels.channelName')}
            </Form.Label>
            <Form.Control
              className="mb-2"
              disabled={isLoading}
              id="channelName"
              isInvalid={formik.errors.channelName && formik.touched.channelName}
              name="channelName"
              onChange={formik.handleChange}
              ref={inputRef}
              required
              type="text"
              value={formik.values.channelName}
            />
            {formik.errors.channelName ? <div className="text-danger">{formik.errors.channelName}</div> : null}
            <div className="d-flex justify-content-end">
              <Button className="me-2" onClick={() => handleClose()} type="button" variant="secondary">{t('actions.cancel')}</Button>
              <Button disabled={isLoading} type="submit" variant="primary">{t('actions.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
