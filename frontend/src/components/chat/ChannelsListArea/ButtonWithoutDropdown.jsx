import { Button } from 'react-bootstrap';

const SimpleChannelButton = (props) => {
  const { handleSetActive, variant, name } = props;
  return (
    <Button className="w-100 rounded-0 text-start text-truncate" onClick={handleSetActive} variant={variant}>
      <span className="me-1">#</span>
      {name}
    </Button>
  );
};

export default SimpleChannelButton;
