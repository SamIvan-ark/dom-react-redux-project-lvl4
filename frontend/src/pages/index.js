import LoginPage from './LoginPage';
import MainPage from './MainPage';
import NotFoundPage from './NotFoundPage';
import SignupPage from './SignupPage';

export default {
  loginPage: () => LoginPage,
  mainPage: () => MainPage,
  notFoundPage: () => NotFoundPage,
  signupPage: () => SignupPage,
};
