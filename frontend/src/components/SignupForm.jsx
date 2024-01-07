import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import filterProfanity from '../utils/profanityChecker';
import useAuth from '../hooks/useAuth';
import { sendData } from '../api/serverApi';
import { serverRoutes } from '../utils/routes';

const SignupForm = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const [isUsernameProfanity, setIsUsernameProfanity] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('errors.lengthFromTo', { from: 3, to: 20 }))
      .max(20, t('errors.lengthFromTo', { from: 3, to: 20 }))
      .required(t('errors.emptyField')),
    password: yup
      .string()
      .min(6, t('errors.minLength', { length: 6 }))
      .required(t('errors.emptyField')),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], t('errors.passwordsMustMatch'))
      .required(t('errors.emptyField')),
  });

  const formik = useFormik({
    initialValues: { username: '', password: '', passwordConfirmation: '' },
    validationSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      setIsUsernameProfanity(false);
      if (values.username !== filterProfanity(values.username)) {
        setIsUsernameProfanity(true);
        formik.setErrors({ username: t('errors.profanityUsername') });
        inputRef.current.select();
        formik.setSubmitting(false);
        return;
      }
      try {
        const { data } = await sendData(serverRoutes.signupPath(), values);
        localStorage.setItem('userId', JSON.stringify(data));
        auth.logIn();
        navigate('/');
      } catch (err) {
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
      <h1 className="text-center mb-4">{t('credentials.registration')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          disabled={formik.isSubmitting}
          ref={inputRef}
          autoFocus
          type="text"
          autoComplete="username"
          name="username"
          id="username"
          placeholder={t('credentials.username')}
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={(!!formik.errors.username && formik.touched.username) || isUsernameProfanity}
        />
        <Form.Label htmlFor="username">{t('credentials.username')}</Form.Label>
        {(formik.errors.username && formik.touched.username) || isUsernameProfanity
          ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
          : null}
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          disabled={formik.isSubmitting}
          type="password"
          name="password"
          id="password"
          placeholder={t('credentials.password')}
          autoComplete="new-password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={!!formik.errors.password && formik.touched.password}
        />
        <Form.Label htmlFor="password">{t('credentials.password')}</Form.Label>
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
          placeholder={t('credentials.confirmPassword')}
          onChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
          isInvalid={(
            !!formik.errors.passwordConfirmation
            && formik.touched.passwordConfirmation)
            || authFailed}
        />
        <Form.Label htmlFor="passwordConfirmation">{t('credentials.confirmPassword')}</Form.Label>
        {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation
          ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.passwordConfirmation}</Form.Control.Feedback>
          : null}
        {authFailed
          ? <Form.Control.Feedback type="invalid" tooltip>{t('errors.userAlreadyExist')}</Form.Control.Feedback>
          : null}
      </Form.Group>
      <Button
        disabled={formik.isSubmitting}
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
      >
        {t('actions.register')}
      </Button>
    </Form>
  );
};

export default SignupForm;
