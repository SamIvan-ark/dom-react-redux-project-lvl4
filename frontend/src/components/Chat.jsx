import { Button } from 'react-bootstrap';
import { PlusSquare } from 'react-bootstrap-icons';

const Chat = () => {
  const a = 'lalala';
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      {a}
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <Button type="button" variant="group-vertical" className="p-0 text-primary">
              <PlusSquare size={20} />
              <span className="visually-hidden">+</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
