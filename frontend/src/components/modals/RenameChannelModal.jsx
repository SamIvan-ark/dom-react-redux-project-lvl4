import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { useEditChannelMutation, useGetChannelsQuery } from '../../api/channelsApi';
import { closeModal } from '../../slices/uiSlice';
import filterProfanity from '../../utils/profanityChecker';
import toasts from '../../utils/toasts';

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
    <Modal centered onHide={() => handleClose()} show>
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
              className="mb-2"
              disabled={formik.isSubmitting}
              id="newNameOfChannel"
              isInvalid={formik.errors.newNameOfChannel && formik.touched.newNameOfChannel}
              name="newNameOfChannel"
              onChange={formik.handleChange}
              ref={inputRef}
              required
              selected
              type="text"
              value={formik.values.newNameOfChannel}
            />
            {formik.errors.newNameOfChannel ? <div className="text-danger">{formik.errors.newNameOfChannel}</div> : null}
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

export default RenameChannelModal;
