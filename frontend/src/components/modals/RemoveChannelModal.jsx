import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { closeModal } from '../../slices/modalsSlice';
import toasts from '../../utils/toasts';
import { hooks } from '../../providers/index';

const RemoveChannelModal = () => {
  const { t } = useTranslation();
  const { removeChannel } = hooks.useApi();
  const dispatch = useDispatch();
  const { invokedOn } = useSelector((state) => state.modals);
  const handleClose = () => dispatch(closeModal());
  const handleChannelRemove = (id) => {
    removeChannel(
      { id },
      ({ status }) => {
        if (status === 'ok') {
          handleClose();
          toasts.success(t('processes.channelRemoved'));
        }
      },
    );
  };
  return (
    <Modal show centered onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('actions.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <p className="lead">{t('userInteractions.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => handleClose()} variant="secondary" className="me-2" type="button">{t('actions.cancel')}</Button>
          <Button onClick={() => handleChannelRemove(invokedOn)} variant="danger">{t('actions.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
