import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const ButtonWithDropdown = ({ children, handleOpen }) => {
  const { t } = useTranslation();
  return (
    <Dropdown as={ButtonGroup} className="d-flex dropdown btn-group">
      {children}
      <Dropdown.Toggle id="dropdown-split-basic" split variant="light">
        <span className="visually-hidden">{t('entities.channels.channelSettings')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={handleOpen('removing')}>{t('actions.remove')}</Dropdown.Item>
        <Dropdown.Item onClick={handleOpen('renaming')}>{t('actions.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ButtonWithDropdown;
