import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/useAuth';
import toasts from '../utils/toasts';
import { serverRoutes } from '../utils/routes';
import { sendData } from '../api/serverApi';
import { setUsername } from '../slices/userSliсe';

const LoginForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { data } = await sendData(serverRoutes.loginPath(), values);
        dispatch(setUsername(data.username));
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        navigate('/');
      } catch (err) {
        formik.setSubmitting(false);
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
        }
        if (err.isAxiosError && err.response.status === 500) {
          setAuthFailed(true);
          inputRef.current.select();
          toasts.error(t('errors.networkError'));
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
      <h1 className="text-center mb-4">{t('loginForm.submit')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          ref={inputRef}
          autoFocus
          type="text"
          autoComplete="username"
          name="username"
          id="username"
          placeholder={t('loginForm.username')}
          required
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="username">{t('loginForm.username')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          name="password"
          id="password"
          placeholder={t('loginForm.password')}
          required
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={authFailed}
        />
        <Form.Label htmlFor="password">{t('loginForm.password')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          {t('errors.invalidCredentials')}
        </Form.Control.Feedback>
      </Form.Group>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('loginForm.submit')}</Button>
    </Form>
  );
};

export default LoginForm;
