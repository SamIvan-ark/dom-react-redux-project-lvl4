import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

import { closeModal } from '../../slices/modalsSlice';
import toasts from '../../utils/toasts';
import { useRemoveChannelMutation } from '../../api/channelsApi';

const RemoveChannelModal = () => {
  const [removeChannel, {
    isLoading,
    isSuccess,
  }] = useRemoveChannelMutation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { invokedOn } = useSelector((state) => state.modals);
  const handleClose = () => dispatch(closeModal());
  const handleChannelRemove = (id) => {
    removeChannel({ id });
  };

  useEffect(() => {
    if (isSuccess) {
        handleClose();
        toasts.success(t('processes.channelRemoved'));
    }
  }, [isSuccess, t]);

  return (
    <Modal show centered onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>{t('actions.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <p className="lead">{t('userInteractions.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={() => handleClose()} variant="secondary" className="me-2" type="button">{t('actions.cancel')}</Button>
          <Button disabled={isLoading} onClick={() => handleChannelRemove(invokedOn)} variant="danger">{t('actions.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
