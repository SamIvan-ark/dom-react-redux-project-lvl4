import { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { closeModal } from '../../slices/modalsSlice';
import { setNeedToMove } from '../../slices/channelsSlice';
import { addChannel } from '../../socket';

const AddChannel = () => {
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
        formik.setErrors({ channelName: 'Канал с таким именем уже существует' });
        formik.setSubmitting(false);
        return;
      }
      formik.setErrors({});
      addChannel(
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
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="form-group">
            <Form.Label className="visually-hidden" htmlFor="channelName">
              Имя канала
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
              <Button onClick={() => handleClose()} variant="secondary" className="me-2" type="button">Отменить</Button>
              <Button disabled={formik.isSubmitting} variant="primary" type="submit">Отправить</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
