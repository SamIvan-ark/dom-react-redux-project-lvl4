import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

import useAuth from '../hooks/index.jsx';
import getRoute from '../routes.js';

const validationSchema = yup.object().shape({
  username: yup.string().min(3, 'Минимум 3 буквы').required('Поле не должно быть пустым'),
  password: yup.string().min(3, 'Минимум 3 символа').required('Поле не должно быть пустым'),
});

const LoginForm = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await axios.post(getRoute('login'), values);
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          ref={inputRef}
          autoFocus
          type="text"
          autoComplete="username"
          name="username"
          id="username"
          placeholder="Ваш ник"
          required
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="username">Ваш ник</Form.Label>
        {formik.errors.username && formik.touched.username
          ? <div>{formik.errors.username}</div>
          : null}
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          required
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="password">Пароль</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          Неверные имя пользователя или пароль
        </Form.Control.Feedback>
        {formik.touched.password && formik.errors.password
          ? <div>{formik.errors.password}</div>
          : null}
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
    </Form>
  );
};

export default LoginForm;
