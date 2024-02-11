import {
  Button,
  ButtonGroup,
  Dropdown,
  Nav,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useGetChannelsQuery } from '../../api/channelsApi';
import { openModal, setActive } from '../../slices/uiSlice';
import i18next from '../../utils/i18next';
import getModal from '../modals';

const ChannelButton = ({
  name,
  removable,
  variant,
  handleOpen,
  handleSetActive,
}) => {
  const renderBtn = () => (
    <Button className="w-100 rounded-0 text-start text-truncate" onClick={handleSetActive} variant={variant}>
      <span className="me-1">#</span>
      {name}
    </Button>
  );

  const renderDropdown = () => (
    <Dropdown as={ButtonGroup} className="d-flex dropdown btn-group">
      {renderBtn()}
      <Dropdown.Toggle id="dropdown-split-basic" split variant="light">
        <span className="visually-hidden">{i18next.t('entities.channels.channelSettings')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleOpen('removing')}>{i18next.t('actions.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={handleOpen('renaming')}>{i18next.t('actions.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  return removable ? renderDropdown() : renderBtn();
};

const renderModal = ({ type }) => {
  if (!type) {
    return null;
  }

  const CurrentModal = getModal(type);
  return <CurrentModal />;
};

const ChannelsListArea = () => {
  const {
    data: channels,
  } = useGetChannelsQuery();
  const { t } = useTranslation();
  const { activeChannel } = useSelector((state) => state.ui.channels);
  const modalState = useSelector((state) => state.ui.modal);
  const dispatch = useDispatch();
  const handleOpenModal = (type, invokedOn = null) => () => dispatch(
    openModal(
      { type, invokedOn },
    ),
  );

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('entities.channels.channels')}</b>
        <Button
          className="p-0 text-primary"
          onClick={handleOpenModal('adding')}
          type="button"
          variant="group-vertical"
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav as="ul" className="flex-column nav-pills px-2 mb-3 overflow-auto h-100 d-block" defaultActiveKey="1" fill>
        {Object.values(channels).map((channel) => {
          const { id, name, removable } = channel;
          const isCurrentChannelActive = id === activeChannel.id;
          const variant = isCurrentChannelActive ? 'secondary' : 'light';
          const handleSetChannelActive = isCurrentChannelActive
            ? () => null
            : () => dispatch(setActive(channel));
          return (
            <Nav.Item as="li" key={id}>
              <ChannelButton
                handleOpen={(action) => handleOpenModal(action, channel)}
                handleSetActive={handleSetChannelActive}
                name={name}
                removable={removable}
                variant={variant}
              />
            </Nav.Item>
          );
        })}
      </Nav>
      {renderModal(modalState)}
    </>
  );
};

export default ChannelsListArea;
