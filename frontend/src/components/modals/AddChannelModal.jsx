import { Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';

import { closeModal } from '../../slices/modalsSlice';
import { addChannel } from '../../slices/channelsSlice';
import uniqueIdGenerator from '../../utils/uniqueIdGenerator';

const generateUniqueId = uniqueIdGenerator();

const AddChannel = () => {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  const handleSubmit = (name) => dispatch(addChannel({
    id: generateUniqueId(),
    name,
    removable: true,
  }));
  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: ({ channelName }) => {
      handleSubmit(channelName);
      formik.values.channelName = '';
      handleClose();
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
            <Form.Control
              className="form-control"
              autoFocus
              required
              id="channelName"
              name="channelName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.channelName}
            />
            <Form.Label className="visually-hidden" htmlFor="channelName">
              Имя канала
            </Form.Label>
            <div className="d-flex justify-content-end">
              <Form.Control onClick={() => handleClose()} className="me-2 btn btn-secondary" type="button" value="Отменить" />
              <Form.Control className="btn btn-primary" type="submit" value="Отправить" />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
