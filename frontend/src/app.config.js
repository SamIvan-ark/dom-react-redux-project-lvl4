import { lazy } from 'react';

const pages = {
  notFoundPage: {
    id: 0,
    route: '*',
    Component: lazy(() => import('./pages/NotFoundPage')),
    isPrivate: false,
  },
  mainPage: {
    id: 1,
    route: '/',
    redirectTo: '/login',
    Component: lazy(() => import('./pages/MainPage')),
    isPrivate: true,
  },
  loginPage: {
    id: 2,
    route: '/login',
    Component: lazy(() => import('./pages/LoginPage')),
    isPrivate: false,
  },
  signupPage: {
    id: 3,
    route: '/signup',
    Component: lazy(() => import('./pages/SignupPage')),
    isPrivate: false,
  },
};

export default {
  pages,
};
