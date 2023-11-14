import {
  useFormik,
} from 'formik';
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
    <div>
      <h1>Войти</h1>
      <form
        onSubmit={formik.handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="nickname">
            Ваш ник
            <input
              type="text"
              name="nickname"
              id="nickname"
              placeholder="Ваш никнейм"
              onChange={formik.handleChange}
              value={formik.values.nickname}
            />
            {formik.errors.nickname && formik.touched.nickname
              ? <div>{formik.errors.nickname}</div>
              : null}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Пароль
            <input
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
          </label>
        </div>
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;
