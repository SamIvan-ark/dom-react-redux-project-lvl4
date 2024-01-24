import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { hooks } from '../providers';
import toasts from '../utils/toasts';
import { useLoginMutation } from '../api/userApi';

const LoginForm = () => {
  const [login, { isLoading, isError, error }] = useLoginMutation();
  const { t } = useTranslation();
  const auth = hooks.useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const { data: authData } = await login(values);
      if (authData) {
        auth.logIn(authData);
        navigate('/');
      }
    },
  });

  const isAuthFailed = isError && error.status === 401;

  useEffect(() => {
    if (isError) {
      if (isAuthFailed) {
        inputRef.current.select();
      } else if (error.status === 'FETCH_ERROR') {
        toasts.error(t('errors.networkError'));
      }
    }
  }, [isError, error, isAuthFailed, t]);
  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t('actions.signIn')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          ref={inputRef}
          autoFocus
          type="text"
          autoComplete="username"
          name="username"
          id="username"
          placeholder={t('credentials.yourNick')}
          required
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={isAuthFailed}
        />
        <Form.Label htmlFor="username">{t('credentials.yourNick')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          type="password"
          name="password"
          id="password"
          placeholder={t('credentials.password')}
          required
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={isAuthFailed}
        />
        <div>{isLoading}</div>
        <div>{isError}</div>
        <Form.Label htmlFor="password">{t('credentials.password')}</Form.Label>
        <Form.Control.Feedback type="invalid" tooltip>
          {t('errors.invalidCredentials')}
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        disabled={isLoading}
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
      >
        {t('actions.signIn')}
      </Button>
    </Form>
  );
};

export default LoginForm;
