import { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal } from '../../slices/modalsSlice';
import useApi from '../../hooks/useApi';

const RenameChannelModal = () => {
  const { renameChannel } = useApi();
  const allChannels = useSelector((state) => state.channels.entities);
  const takenNames = Object.values(allChannels).map(({ name }) => name);
  const dispatch = useDispatch();
  const { invokedOn } = useSelector((state) => state.modals);
  const { name } = useSelector((state) => state
    .channels
    .entities[invokedOn]);

  const handleClose = () => dispatch(closeModal());

  const formik = useFormik({
    initialValues: {
      newNameOfChannel: name,
    },
    onSubmit: ({ newNameOfChannel }) => {
      if (takenNames.includes(newNameOfChannel)) {
        formik.setErrors({ newNameOfChannel: 'Канал с таким именем уже существует' });
        formik.setSubmitting(false);
        return;
      }
      formik.setErrors({});
      renameChannel(
        { name: newNameOfChannel, id: invokedOn },
        ({ status }) => {
          if (status === 'ok') {
            handleClose();
          }
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
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="form-group">
            <Form.Label className="visually-hidden" htmlFor="newNameOfChannel">
              Новое имя канала:
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
              <Button onClick={() => handleClose()} variant="secondary" className="me-2" type="button">Отменить</Button>
              <Button disabled={formik.isSubmitting} variant="primary" type="submit">Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannelModal;
