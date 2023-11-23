import ChannelsListArea from './ChannelsListArea';
import MainArea from './MainArea';

const channels = [
  {
    id: 1,
    name: 'General',
    messages: [
      { author: 'aboba', text: 'lalala' },
      { author: 'bobi', text: 'alalala' },
      { author: 'goga', text: 'olololo' },
    ],
    removable: false,
    active: true,
  },
  {
    id: 2,
    name: 'Random',
    messages: [],
    removable: false,
    active: false,
  },
  {
    id: 3,
    name: 'Music',
    messages: [],
    removable: true,
    active: false,
  },
];
const Chat = () => {
  const a = '';
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelsListArea channels={channels} />
          {a}
        </div>
        <div className="col p-0 h-100">
          <MainArea channel={channels[0]} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
