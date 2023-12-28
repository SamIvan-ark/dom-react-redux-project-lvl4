import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';

import { closeModal } from '../../slices/modalsSlice';
import { setNeedToMove } from '../../slices/channelsSlice';
import useApi from '../../hooks/useApi';

const AddChannel = () => {
  const { t } = useTranslation();
  const { newChannel } = useApi();
  const allChannels = useSelector((state) => state.channels.entities);
  const takenNames = Object.values(allChannels).map(({ name }) => name);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: ({ channelName }) => {
      if (takenNames.includes(channelName)) {
        formik.setErrors({ channelName: t('modals.errors.existing') });
        formik.setSubmitting(false);
        return;
      }
      formik.setErrors({});
      newChannel(
        { name: channelName },
        ({ status }) => {
          if (status === 'ok') {
            dispatch(setNeedToMove(true));
            handleClose();
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
        <Modal.Title>{t('modals.addChannel.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="form-group">
            <Form.Label className="visually-hidden" htmlFor="channelName">
              {t('modals.addChannel.label')}
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
              <Button onClick={() => handleClose()} variant="secondary" className="me-2" type="button">{t('modals.buttons.cancel')}</Button>
              <Button disabled={formik.isSubmitting} variant="primary" type="submit">{t('modals.buttons.submit')}</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
