import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { closeModal } from '../../slices/modalsSlice';
import toasts from '../../utils/toasts';
import useApi from '../../hooks/useApi';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
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
          toasts.success(t('modals.removeChannel.notification'));
        }
      },
    );
  };
  return (
    <Modal show centered onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.removeChannel.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <p className="lead">{t('modals.removeChannel.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => handleClose()} variant="secondary" className="me-2" type="button">{t('modals.buttons.cancel')}</Button>
          <Button onClick={() => handleChannelRemove(invokedOn)} variant="danger">{t('modals.buttons.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
