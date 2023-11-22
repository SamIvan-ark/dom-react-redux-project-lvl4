import { Button, Nav, NavDropdown } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

const ChatChannels = () => {
  const handleChannelSelect = () => console.log('handleChannelSelect');
  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button type="button" variant="group-vertical" className="p-0 text-primary">
          <PlusSquare size={20} />
          <span className="visually-hidden">+</span>
        </Button>
      </div>
      <Nav as="ul" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block" fill variant="tabs" defaultActiveKey="1" onClick={handleChannelSelect}>
        <Nav.Item as="li">
          <Button eventKey="1" variant="secondary" className="w-100 rounded-0 text-start">
            <span className="me-1">#</span>
            general
          </Button>
        </Nav.Item>
        <Nav.Item as="li" className="nav-item w-100">
          <Button className="w-100 rounded-0 text-start">
            <span className="me-1">#</span>
            random
          </Button>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="3">Link</Nav.Link>
        </Nav.Item>
        <NavDropdown title="Dropdown" id="nav-dropdown">
          <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">Something else here</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </>
  );
};

export default ChatChannels;
