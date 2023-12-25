import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { closeModal } from '../../slices/modalsSlice';
import useApi from '../../hooks/useApi';

const RemoveChannelModal = () => {
  const { removeChannel } = useApi();
  const dispatch = useDispatch();
  const { invokedOn } = useSelector((state) => state.modals);
  const handleClose = () => dispatch(closeModal());
  const handleChannelRemove = (id) => {
    removeChannel(
      { id },
      ({ status }) => {
        if (status === 'ok') {
          handleClose();
        }
      },
    );
  };
  return (
    <Modal show centered onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => handleClose()} variant="secondary" className="me-2">Отменить</Button>
          <Button onClick={() => handleChannelRemove(invokedOn)} variant="danger">Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
