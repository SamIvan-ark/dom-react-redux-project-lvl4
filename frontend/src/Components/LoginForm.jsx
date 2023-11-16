import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  nickname: yup.string().min(3, 'Минимум 3 буквы').required('Поле не должно быть пустым'),
  password: yup.string().min(3, 'минимум 3 символа').required('Поле не должно быть пустым'),
});

const LoginForm = () => {
  const formik = useFormik({
    initialValues: { nickname: '', password: '' },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(values, null, 2));
      setSubmitting(true);
      // resetForm();
    },
  });

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-mb-0"
      onSubmit={formik.handleSubmit}
    >
      <h1>Войти</h1>
      <Form.Group>
        <Form.Control
          type="text"
          autoComplete="username"
          name="nickname"
          id="nickname"
          placeholder="Ваш никнейм"
          onChange={formik.handleChange}
          value={formik.values.nickname}
        />
        {formik.errors.nickname && formik.touched.nickname
          ? <div>{formik.errors.nickname}</div>
          : null}
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Control
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password
          ? <div>{formik.errors.password}</div>
          : null}
      </Form.Group>
      <Button type="submit">Войти</Button>
    </Form>
  );
};

export default LoginForm;
