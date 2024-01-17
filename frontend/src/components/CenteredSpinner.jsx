import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const CenteredSpinner = () => {
  const { t } = useTranslation();
  return (
    <div className="d-flex justify-content-center align-items-center h-100">
      <Spinner animation="border" variant="primary">
        <span className="visually-hidden">{t('processes.loading')}</span>
      </Spinner>
    </div>
  );
};

export default CenteredSpinner;
