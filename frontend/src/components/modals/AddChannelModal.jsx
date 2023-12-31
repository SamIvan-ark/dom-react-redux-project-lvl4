import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { closeModal } from '../../slices/modalsSlice';
import filterProfanity from '../../utils/profanityChecker';
import { setNeedToMove } from '../../slices/channelsSlice';
import toasts from '../../utils/toasts';
import useApi from '../../hooks/useApi';

const AddChannel = () => {
  const { t } = useTranslation();
  const { newChannel } = useApi();
  const allChannels = useSelector((state) => state.channels.entities);
  const takenNames = Object.values(allChannels).map(({ name }) => name);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());

  const validationSchema = yup.object().shape({
    channelName: yup
      .string()
      .min(3, t('errors.lengthFromTo', { from: 3, to: 20 }))
      .max(20, t('errors.lengthFromTo', { from: 3, to: 20 }))
      .required(t('errors.emptyField')),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema,
    onSubmit: ({ channelName }) => {
      const censoredName = filterProfanity(channelName);
      if (takenNames.includes(censoredName)) {
        formik.values.channelName = censoredName;
        formik.setErrors({ channelName: t('errors.channelAlreadyExist') });
        formik.setSubmitting(false);
        return;
      }
      formik.setErrors({});
      newChannel(
        { name: censoredName },
        ({ status }) => {
          if (status === 'ok') {
            dispatch(setNeedToMove(true));
            handleClose();
            toasts.success(t('processes.channelCreated'));
          }
        },
      );
    },
  });

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [formik.errors.channelName]);

  return (
    <Modal show centered onHide={() => handleClose()}>
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
              ref={inputRef}
              isInvalid={formik.errors.channelName && formik.touched.channelName}
              disabled={formik.isSubmitting}
              className="mb-2"
              required
              id="channelName"
              name="channelName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.channelName}
            />
            {formik.errors.channelName ? <div className="text-danger">{formik.errors.channelName}</div> : null}
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

export default AddChannel;
