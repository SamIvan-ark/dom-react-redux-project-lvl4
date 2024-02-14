import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { useSignupMutation } from '../api/userApi';
import { hooks } from '../providers';
import filterProfanity from '../utils/profanityChecker';

const SignupForm = () => {
  const [signup, { isError, error }] = useSignupMutation();
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
          autoComplete="username"
          autoFocus
          disabled={formik.isSubmitting}
          id="username"
          isInvalid={(
            !!formik.errors.username
            && formik.touched.username)
            || isUsernameCollision}
          name="username"
          onChange={formik.handleChange}
          placeholder={t('credentials.username')}
          ref={inputRef}
          type="text"
          value={formik.values.username}
        />
        <Form.Label htmlFor="username">{t('credentials.username')}</Form.Label>
        {(formik.errors.username && formik.touched.username)
          ? <Form.Control.Feedback tooltip type="invalid">{formik.errors.username}</Form.Control.Feedback>
          : null}
        {isUsernameCollision
          ? <Form.Control.Feedback tooltip type="invalid">{t('errors.userAlreadyExist')}</Form.Control.Feedback>
          : null}
      </Form.Group>
      <Form.Group className="form-floating mb-3">
        <Form.Control
          autoComplete="new-password"
          disabled={formik.isSubmitting}
          id="password"
          isInvalid={
            !!formik.errors.password
            && formik.touched.password
          }
          name="password"
          onChange={formik.handleChange}
          placeholder={t('credentials.password')}
          type="password"
          value={formik.values.password}
        />
        <Form.Label htmlFor="password">{t('credentials.password')}</Form.Label>
        {formik.errors.password && formik.touched.password
          ? <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>
          : null}
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <Form.Control
          autoComplete="username"
          disabled={formik.isSubmitting}
          id="passwordConfirmation"
          isInvalid={
            !!formik.errors.passwordConfirmation
            && formik.touched.passwordConfirmation
          }
          name="passwordConfirmation"
          onChange={formik.handleChange}
          placeholder={t('credentials.confirmPassword')}
          type="password"
          value={formik.values.passwordConfirmation}
        />
        <Form.Label htmlFor="passwordConfirmation">{t('credentials.confirmPassword')}</Form.Label>
        {formik.errors.passwordConfirmation && formik.touched.passwordConfirmation
          ? <Form.Control.Feedback tooltip type="invalid">{formik.errors.passwordConfirmation}</Form.Control.Feedback>
          : null}
      </Form.Group>
      <Button
        className="w-100 mb-3"
        disabled={formik.isSubmitting}
        type="submit"
        variant="outline-primary"
      >
        {t('actions.register')}
      </Button>
    </Form>
  );
};

export default SignupForm;
