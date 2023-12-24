import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';

import useAuth from '../hooks/useAuth';
import getRoute from '../routes';

const validationSchema = yup.object().shape({
  username: yup.string().min(3, 'Минимум 3 буквы').max(20, 'Максимум 20 букв').required('Обязательное поле'),
  password: yup.string().min(6, 'Минимум 6 символов').required('Обязательное поле'),
  passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Пароли должны совпадать').required('Обязательное поле'),
});

const LoginForm = () => {
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { username: '', password: '', passwordConfirmation: '' },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      setAuthFailed(false);
      try {
        const { data } = await axios.post(getRoute('signup'), values);
        console.log(data);
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        console.log(err);
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 409) {
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
      className="w-50"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">Регистрация</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          disabled={formik.isSubmitting}
          ref={inputRef}
          autoFocus
          type="text"
          autoComplete="username"
          name="username"
          id="username"
          placeholder="Ваш ник"
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={!!formik.errors.username && formik.touched.username}
        />
        <Form.Label htmlFor="username">Имя пользователя</Form.Label>
        {formik.errors.username && formik.touched.username
          ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
          : null}
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          disabled={formik.isSubmitting}
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          autoComplete="new-password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={!!formik.errors.password && formik.touched.password}
        />
        <Form.Label htmlFor="password">Пароль</Form.Label>
        {formik.errors.password && formik.touched.password
          ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
          : null}
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          disabled={formik.isSubmitting}
          autoFocus
          type="password"
          autoComplete="username"
          name="passwordConfirmation"
          id="passwordConfirmation"
          placeholder="Подтвердите пароль"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
          isInvalid={!!formik.errors.passwordConfirmation && formik.touched.passwordConfirmation}
        />
        <Form.Label htmlFor="passwordConfirmation">Подтвердите пароль</Form.Label>
        {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation
          ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.passwordConfirmation}</Form.Control.Feedback>
          : null}
        {authFailed
          ? <Form.Control.Feedback type="invalid" tooltip>Такой пользователь уже существует</Form.Control.Feedback>
          : null}
      </Form.Group>
      <Button
        disabled={formik.isSubmitting}
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
      >
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default LoginForm;
