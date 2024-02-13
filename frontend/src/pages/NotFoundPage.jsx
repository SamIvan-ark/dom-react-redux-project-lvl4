import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Container className="mt-5">
      <Row className="d-flex flex-column">
        <Col className="d-flex flex-column align-items-center">
          <h1>{t('errors.pageNotExist')}</h1>
          <Link to="/">{t('actions.returnToMain')}</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
