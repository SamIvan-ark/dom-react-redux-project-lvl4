[![Check install, build and lint](https://github.com/SamIvan-ark/dom-react-redux-project-lvl4/actions/workflows/app-check.yml/badge.svg)](https://github.com/SamIvan-ark/dom-react-redux-project-lvl4/actions/workflows/app-check.yml)

# Hexlet chat

## Educational React front-end project

### Description
This is a real-time SPA chat application (like Slack). You can exchange messages and manage channels (basic CRUD operations). There's also authorization, just use the demo credentials:
```
Nickname: user
Password: user123
```
or create new one

### You can try the application by yourself here: [click](https://chat-ivan-samozhenov.onrender.com)

### System requirements
* node >= 18
* make >= 4 (optional)

### Launch in dev-mode

1. Clone repo
2. Install deps: `npm ci` or `make install`
3. Launch `make start` from root directory
4. Try app with live-reload on http://localhost:3000/
5. Wow, it's look great! 🤩

### Launch in production mode

1. Clone repo
2. Install deps: `npm ci` or `make install`
3. Build frontend: `npm run build`
4. Start backend and frontend with `npm start`
5. Nice 😏

### What was used
+ Base with [Create React App](https://create-react-app.dev/)
+ [React 18.2](https://react.dev/)
  + Navigation with [React-router](https://reactrouter.com/en/main)
  + Layout on Bootstrap ([react-bootstrap](https://react-bootstrap.netlify.app/))
  + Toasts with [react-toastify](https://github.com/fkhadra/react-toastify#readme)
+ Storage on [Redux-Toolkit](https://redux-toolkit.js.org/)
+ API
  + Emitting through [RTK-Query](https://redux-toolkit.js.org/rtk-query/overview)
  + Real time updates with [Socket.IO](https://socket.io/)
+ Forms
  + Building and management with [formik](https://formik.org)
  + Validation through [yup](https://github.com/jquense/yup)
+ Texts with i18next ([react-i18next](https://react.i18next.com/))
+ Profanity check with [leo-profanity](https://github.com/jojoee/leo-profanity#readme)
+ Deploy to [Render](https://render.com/)
+ Development
  + [ESLint](https://eslint.org/)
  + [GitHub Actions](https://docs.github.com/ru/actions)