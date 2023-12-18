import { useSelector, useDispatch } from 'react-redux';
import { Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';

import { closeModal } from '../../slices/modalsSlice';
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
            handleClose();
          }
        },
      );
    },
  });

  return (
    <Modal show onHide={() => handleClose()}>
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
              disabled={formik.isSubmitting}
              className="form-control"
              autoFocus
              required
              id="channelName"
              name="channelName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.channelName}
            />
            {formik.errors.channelName ? <div className="text-danger">{formik.errors.channelName}</div> : null}
            <div className="d-flex justify-content-end">
              <Form.Control onClick={() => handleClose()} className="me-2 btn btn-secondary" type="button" value="Отменить" />
              <Form.Control disabled={formik.isSubmitting} className="btn btn-primary" type="submit" value="Отправить" />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
