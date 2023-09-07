import React from 'react';
import {
  Formik,
  Field,
  Form,
  useFormik,
} from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  nickname: yup.string().min(3, 'Минимум 3 буквы').required(),
  password: yup.string().min(3, 'минимум 3 символа').required(),
});

const BuildPage = () => {
  const formik = useFormik({
    initialValues: { nickname: '', password: '' },
    onSubmit: (values, { setSubmitting }) => {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(false);
      // resetForm();
    },
  });

  return (
    <div>
      <h1>Войти</h1>
      <Formik
        initialValies={{ nickname: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={formik.onSubmit}
      >
        {({ errors, touched }) => (
          <Form
            onSubmit={formik.handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="nickname">
                Ваш ник
                <Field
                  type="text"
                  name="nickname"
                  id="nickname"
                  placeholder="Ваш никнейм"
                  onChange={formik.handleChange}
                  value={formik.values.nickname}
                />
                {errors.nickname
                  ? <div>{errors.nickname}</div>
                  : null}
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="password">
                Пароль
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Пароль"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {touched.password && errors.password
                  ? <div>{errors.password}</div>
                  : null}
              </label>
            </div>
            <button type="submit">Войти</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default () => BuildPage();
