import { keys } from 'lodash';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { es } from './es';
import { en } from './en';

const translations = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};

const config = {
  resources: translations,
  fallbackLng: 'es',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    wait: true,
    useSuspense: false,
  },
  saveMissing: true,
  // missingKeyHandler: function (locale: any, ns: any, key: any) {
  //   if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //     // dev code
  //     // throw new Error(`The key does not exist in the translation file:�${key}`);
  //   } else {
  //     // production code, nothing to do
  //   }
  // },
};

i18n.use(LanguageDetector).use(initReactI18next).init(config);

export const languages = keys(translations);
export default i18n;
