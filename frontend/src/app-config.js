const pages = {
  notFoundPage: {
    id: 0,
    route: '*',
    component: 'notFoundPage',
    isPrivate: false,
  },
  mainPage: {
    id: 1,
    route: '/',
    component: 'mainPage',
    isPrivate: true,
  },
  loginPage: {
    id: 2,
    route: '/login',
    component: 'loginPage',
    isPrivate: false,
  },
  signupPage: {
    id: 3,
    route: '/signup',
    component: 'signupPage',
    isPrivate: false,
  },
};

export default {
  pages,
};
