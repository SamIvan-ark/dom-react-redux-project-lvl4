import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Nav,
  Dropdown,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';

import { openModal } from '../../slices/modalsSlice';
import getModal from '../modals';
import { setActive } from '../../slices/channelsSlice';
import i18next from '../../utils/i18next';

const ChannelButton = ({
  name,
  removable,
  variant,
  handleOpen,
  handleSetActive,
}) => {
  const renderBtn = () => (
    <Button onClick={handleSetActive} variant={variant} className="w-100 rounded-0 text-start text-truncate">
      <span className="me-1">#</span>
      {name}
    </Button>
  );

  const renderDropdown = () => (
    <Dropdown className="d-flex dropdown btn-group" as={ButtonGroup}>
      {renderBtn()}
      <Dropdown.Toggle split variant="light" id="dropdown-split-basic">
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
  const { t } = useTranslation();
  const {
    entities: channels,
    ui: {
      active: activeChannelId,
    },
  } = useSelector((state) => state.channels);
  const modalState = useSelector((state) => state.modals);
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
          type="button"
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={handleOpenModal('adding')}
        >
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav as="ul" className="flex-column nav-pills px-2 mb-3 overflow-auto h-100 d-block" fill defaultActiveKey="1">
        {Object.values(channels).map(({
          id,
          name,
          removable,
        }) => {
          const isCurrentChannelActive = id === activeChannelId;
          const variant = isCurrentChannelActive ? 'secondary' : 'light';
          const handleSetChannelActive = isCurrentChannelActive
            ? () => null
            : () => dispatch(setActive(id));
          return (
            <Nav.Item key={id} as="li">
              <ChannelButton
                name={name}
                removable={removable}
                variant={variant}
                handleOpen={(action) => handleOpenModal(action, id)}
                handleSetActive={handleSetChannelActive}
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
