import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { closeModal } from '../../slices/modalsSlice';
import { removeChannel } from '../../socket';

const RemoveChannelModal = () => {
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
    <Modal show onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => handleClose()} className="me-2 btn btn-secondary">Отменить</Button>
          <Button onClick={() => handleChannelRemove(invokedOn)} variant="danger">Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
