import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <Container className="mt-5">
    <Row className="d-flex flex-column">
      <Col className="d-flex flex-column align-items-center">
        <h1>Ой, а такой страницы нет</h1>
        <Link to="/">Вернуться на главную</Link>
      </Col>
    </Row>
  </Container>
);

export default NotFoundPage;
