import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from '../locales/index';

const i18nextInstance = i18next.createInstance();
i18nextInstance
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18nextInstance;
