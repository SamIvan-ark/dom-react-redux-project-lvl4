import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useLoginMutation } from '../api/userApi';
import { hooks } from '../providers';

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
          autoComplete="username"
          autoFocus
          id="username"
          isInvalid={isAuthFailed}
          name="username"
          onChange={formik.handleChange}
          placeholder={t('credentials.yourNick')}
          ref={inputRef}
          required
          type="text"
          value={formik.values.username}
        />
        <Form.Label htmlFor="username">{t('credentials.yourNick')}</Form.Label>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          id="password"
          isInvalid={isAuthFailed}
          name="password"
          onChange={formik.handleChange}
          placeholder={t('credentials.password')}
          required
          type="password"
          value={formik.values.password}
        />
        <div>{isLoading}</div>
        <div>{isError}</div>
        <Form.Label htmlFor="password">{t('credentials.password')}</Form.Label>
        <Form.Control.Feedback tooltip type="invalid">
          {t('errors.invalidCredentials')}
        </Form.Control.Feedback>
      </Form.Group>
      <Button
        className="w-100 mb-3"
        disabled={isLoading}
        type="submit"
        variant="outline-primary"
      >
        {t('actions.signIn')}
      </Button>
    </Form>
  );
};

export default LoginForm;
