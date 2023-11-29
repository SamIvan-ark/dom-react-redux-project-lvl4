import { Button, Modal } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { closeModal } from '../../slices/modalsSlice';
import { removeChannel } from '../../slices/channelsSlice';

const handleClose = (dispatch) => dispatch(closeModal());
const handleChannelRemove = (dispatch, id) => {
  dispatch(removeChannel({ id }));
  handleClose(dispatch);
};

const RemoveChannelModal = () => {
  const dispatch = useDispatch();
  const { invokedOn } = useSelector((state) => state.modals);
  return (
    <Modal show onHide={() => handleClose(dispatch)}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => handleClose(dispatch)} className="me-2 btn btn-secondary">Отменить</Button>
          <Button onClick={() => handleChannelRemove(dispatch, invokedOn)} variant="danger">Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
