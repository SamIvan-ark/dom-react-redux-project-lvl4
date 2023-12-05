import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { ArrowRightSquare } from 'react-bootstrap-icons';

// import socket from '../../socket';
import { addMessage } from '../../slices/messagesSlice';
import uniqueIdGenerator from '../../utils/uniqueIdGenerator';

const generateUniqueId = uniqueIdGenerator();

const MainArea = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messages.entities);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      const userData = localStorage.getItem('userId');
      const { username } = JSON.parse(userData);
      const { message } = values;
      dispatch(addMessage({
        id: generateUniqueId(),
        text: message,
        author: username,
      }));
    },
  });
  return (
    <div className="d-flex flex-column h-100">
      <div className="bg-light mb-4 p-3 shadow-sm small">
        <p className="m-0">
          <b># general</b>
        </p>
        <span className="text-muted">{`${Object.values(messages).length} сообщений`}</span>
      </div>
      <div id="messages-box" className="chat-messages overflow-auto px-5">
        {Object.values(messages).map((message) => (
          <div key={message.author} className="text-break mb-2">
            <b>{message.author}</b>
            {`: ${message.text}`}
          </div>
        ))}
      </div>
      <div className="mt-auto px-5 py-3">
        <Form onSubmit={formik.handleSubmit} className="py-1 border rounded-2">
          <InputGroup hasValidation>
            <Form.Control
              autoFocus
              type="text"
              name="message"
              id="message"
              placeholder="Введите сообщение..."
              required
              onChange={formik.handleChange}
              value={formik.values.message}
            />
            <Button type="submit" variant="group-vertical">
              <ArrowRightSquare size={20} />
              <span className="visually-hidden">+</span>
            </Button>
          </InputGroup>
        </Form>
      </div>
    </div>
  );
};

export default MainArea;
