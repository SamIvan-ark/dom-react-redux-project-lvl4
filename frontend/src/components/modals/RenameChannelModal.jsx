import { useRef, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal } from '../../slices/modalsSlice';
import { renameChannel } from '../../slices/channelsSlice';

const RenameChannelModal = () => {
  const dispatch = useDispatch();
  const { invokedOn } = useSelector((state) => state.modals);
  const { name } = useSelector((state) => state
    .channels
    .entities[invokedOn]);

  const handleClose = () => dispatch(closeModal());
  const handleSubmit = ({ name: newName, id }) => {
    dispatch(renameChannel({
      id,
      changes: {
        name: newName,
      },
    }));
    handleClose();
  };

  const formik = useFormik({
    initialValues: {
      channelName: name,
    },
    onSubmit: ({ channelName }) => {
      handleSubmit({ name: channelName, id: invokedOn });
    },
  });

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.select();
  }, []);
  return (
    <Modal show onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="form-group">
            <Form.Control
              ref={inputRef}
              className="form-control"
              selected
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

export default RenameChannelModal;
