import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { closeModal } from '../../slices/uiSlice';
import filterProfanity from '../../utils/profanityChecker';
import toasts from '../../utils/toasts';
import { useGetChannelsQuery, useEditChannelMutation } from '../../api/channelsApi';

const RenameChannelModal = () => {
  const { t } = useTranslation();
  const [renameChannel, {
    isLoading,
    isSuccess,
  }] = useEditChannelMutation();
  const { data: allChannels } = useGetChannelsQuery();
  const takenNames = Object.values(allChannels).map(({ name }) => name);
  const dispatch = useDispatch();
  const { invokedOn } = useSelector((state) => state.ui.modal);
  const { name } = invokedOn;

  const handleClose = () => dispatch(closeModal());

  const validationSchema = yup.object().shape({
    newNameOfChannel: yup
      .string()
      .min(3, t('errors.lengthFromTo', { from: 3, to: 20 }))
      .max(20, t('errors.lengthFromTo', { from: 3, to: 20 }))
      .required(t('errors.emptyField'))
      .transform((value) => filterProfanity(value))
      .notOneOf(takenNames, t('errors.channelAlreadyExist')),
  });

  const formik = useFormik({
    initialValues: {
      newNameOfChannel: name,
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: ({ newNameOfChannel }) => {
      const censoredName = filterProfanity(newNameOfChannel);
      renameChannel(
        { data: { name: censoredName }, id: invokedOn.id },
      );
    },
  });

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.select();
  }, []);

  useEffect(() => {
    inputRef.current.focus();
  }, [formik.errors.newNameOfChannel]);

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      toasts.success(t('processes.channelRenamed'));
    }
  }, [isSuccess, t]);

  return (
    <Modal show centered onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('actions.renameChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="form-group">
            <Form.Label className="visually-hidden" htmlFor="newNameOfChannel">
              {t('entities.channels.channelName')}
            </Form.Label>
            <Form.Control
              isInvalid={formik.errors.newNameOfChannel && formik.touched.newNameOfChannel}
              disabled={formik.isSubmitting}
              ref={inputRef}
              className="mb-2"
              selected
              required
              id="newNameOfChannel"
              name="newNameOfChannel"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.newNameOfChannel}
            />
            {formik.errors.newNameOfChannel ? <div className="text-danger">{formik.errors.newNameOfChannel}</div> : null}
            <div className="d-flex justify-content-end">
              <Button onClick={() => handleClose()} variant="secondary" className="me-2" type="button">{t('actions.cancel')}</Button>
              <Button disabled={isLoading} variant="primary" type="submit">{t('actions.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
