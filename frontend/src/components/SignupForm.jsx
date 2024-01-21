import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import filterProfanity from '../utils/profanityChecker';
import { hooks } from '../providers';
import toasts from '../utils/toasts';
import { useSignupUserMutation } from '../services/apiSlice';

const SignupForm = () => {
  const [signup, { isError, error }] = useSignupUserMutation();
  const { t } = useTranslation();
  const auth = hooks.useAuth();
  const inputRef = useRef();
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, t('errors.lengthFromTo', { from: 3, to: 20 }))
      .max(20, t('errors.lengthFromTo', { from: 3, to: 20 }))
      .required(t('errors.emptyField'))
      .test('not profanity', t('errors.profanityUsername'), (value) => value === filterProfanity(value)),
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
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      const { data: authData } = await signup(values);
      if (authData) {
        auth.logIn(authData);
        navigate('/');
      }
    },
  });

  const isUsernameCollision = isError && error.status === 409;

  useEffect(() => {
    if (isError) {
      if (isUsernameCollision) {
        inputRef.current.select();
      } else if (error.status === 'FETCH_ERROR') {
        toasts.error(t('errors.networkError'));
      }
    }
  }, [isError, error, isUsernameCollision, t]);

  return (
    <Form
      className="w-50"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t('credentials.registration')}</h1>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          disabled={formik.isSubmitting}
          autoFocus
          ref={inputRef}
          type="text"
          autoComplete="username"
          name="username"
          id="username"
          placeholder={t('credentials.username')}
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={(
            !!formik.errors.username
            && formik.touched.username)
            || isUsernameCollision}
        />
        <Form.Label htmlFor="username">{t('credentials.username')}</Form.Label>
        {(formik.errors.username && formik.touched.username)
          ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.username}</Form.Control.Feedback>
          : null}
        {isUsernameCollision
          ? <Form.Control.Feedback type="invalid" tooltip>{t('errors.userAlreadyExist')}</Form.Control.Feedback>
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
          isInvalid={
            !!formik.errors.password
            && formik.touched.password
          }
        />
        <Form.Label htmlFor="password">{t('credentials.password')}</Form.Label>
        {formik.errors.password && formik.touched.password
          ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.password}</Form.Control.Feedback>
          : null}
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          disabled={formik.isSubmitting}
          type="password"
          autoComplete="username"
          name="passwordConfirmation"
          id="passwordConfirmation"
          placeholder={t('credentials.confirmPassword')}
          onChange={formik.handleChange}
          value={formik.values.passwordConfirmation}
          isInvalid={
            !!formik.errors.passwordConfirmation
            && formik.touched.passwordConfirmation
          }
        />
        <Form.Label htmlFor="passwordConfirmation">{t('credentials.confirmPassword')}</Form.Label>
        {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation
          ? <Form.Control.Feedback type="invalid" tooltip>{formik.errors.passwordConfirmation}</Form.Control.Feedback>
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
