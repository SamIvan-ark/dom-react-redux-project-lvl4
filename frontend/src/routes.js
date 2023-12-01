const routes = {
  login: '/api/v1/login',
  data: '/api/v1/data',
  newUser: '/api/v1/signup',
};

const getRoute = (route) => routes[route];

export default getRoute;