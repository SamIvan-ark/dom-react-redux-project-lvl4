import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { useRemoveChannelMutation } from '../../api/channelsApi';
import { closeModal } from '../../slices/uiSlice';
import toasts from '../../utils/toasts';

const RemoveChannelModal = () => {
  const [removeChannel, {
    isLoading,
    isSuccess,
  }] = useRemoveChannelMutation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { invokedOn: { id } } = useSelector((state) => state.ui.modal, shallowEqual);
  const handleClose = () => dispatch(closeModal());
  const handleChannelRemove = (channelId) => {
    removeChannel({ id: channelId });
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
      toasts.success(t('processes.channelRemoved'));
    }
  }, [isSuccess, t]);

  return (
    <Modal centered onHide={() => handleClose()} show>
      <Modal.Header closeButton>
        <Modal.Title>{t('actions.removeChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <p className="lead">{t('userInteractions.confirm')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" onClick={() => handleClose()} type="button" variant="secondary">{t('actions.cancel')}</Button>
          <Button disabled={isLoading} onClick={() => handleChannelRemove(id)} variant="danger">{t('actions.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
