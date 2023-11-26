import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  ButtonGroup,
  Nav,
  Dropdown,
} from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

import { removeChannel } from '../../slices/channelsSlice'; // and other actions

const generateChannelButton = (name, removable, variant, handleRemove) => {
  const ChannelButton = (
    <Button variant={variant} className="w-100 rounded-0 text-start text-truncate">
      <span className="me-1">#</span>
      {name}
    </Button>
  );

  if (!removable) {
    return ChannelButton;
  }

  return (
    <Dropdown className="d-flex dropdown btn-group" as={ButtonGroup}>
      {ChannelButton}
      <Dropdown.Toggle split variant="light" id="dropdown-split-basic" />
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRemove}>Удалить</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

const ChatChannels = () => {
  const channels = useSelector((state) => state.channels.entities);
  const dispatch = useDispatch();
  const handleChannelRemove = (id) => () => dispatch(removeChannel({ id }));

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button type="button" variant="group-vertical" className="p-0 text-primary">
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav as="ul" className="flex-column nav-pills px-2 mb-3 overflow-auto h-100 d-block" fill defaultActiveKey="1">
        {Object.values(channels).map(({
          id,
          name,
          removable,
          active,
        }) => {
          const variant = active ? 'secondary' : 'light';
          return (
            <Nav.Item key={id} as="li">
              {generateChannelButton(
                name,
                removable,
                variant,
                handleChannelRemove(id),
              )}
            </Nav.Item>
          );
        })}
      </Nav>
    </>
  );
};

export default ChatChannels;
