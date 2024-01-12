import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { closeModal } from '../../slices/modalsSlice';
import filterProfanity from '../../utils/profanityChecker';
import toasts from '../../utils/toasts';
import { hooks } from '../../providers';

const RenameChannelModal = () => {
  const { t } = useTranslation();
  const { renameChannel } = hooks.useApi();
  const allChannels = useSelector((state) => state.channels.entities);
  const takenNames = Object.values(allChannels).map(({ name }) => name);
  const dispatch = useDispatch();
  const { invokedOn } = useSelector((state) => state.modals);
  const { name } = useSelector((state) => state
    .channels
    .entities[invokedOn]);

  const handleClose = () => dispatch(closeModal());

  const validationSchema = yup.object().shape({
    newNameOfChannel: yup
      .string()
      .min(3, t('errors.lengthFromTo', { from: 3, to: 20 }))
      .max(20, t('errors.lengthFromTo', { from: 3, to: 20 }))
      .required(t('errors.emptyField')),
  });

  const formik = useFormik({
    initialValues: {
      newNameOfChannel: name,
    },
    validationSchema,
    onSubmit: ({ newNameOfChannel }) => {
      const censoredName = filterProfanity(newNameOfChannel);
      if (takenNames.includes(censoredName)) {
        formik.values.channelName = censoredName;
        formik.setErrors({ newNameOfChannel: t('errors.channelAlreadyExist') });
        formik.setSubmitting(false);
        return;
      }
      formik.setErrors({});
      renameChannel(
        { name: censoredName, id: invokedOn },
        (err) => {
          if (err) {
            toasts.error(t('errors.networkError'));
            formik.setSubmitting(false);
            return;
          }
          handleClose();
          toasts.success(t('processes.channelRenamed'));
        },
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
              <Button disabled={formik.isSubmitting} variant="primary" type="submit">{t('actions.send')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
