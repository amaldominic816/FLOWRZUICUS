
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import HttpBackend from 'i18next-http-backend';

const resources = {
  en: { translation: { /* your English translations */ } },
  ar: { translation: { /* your Arabic translations */ } },
};


const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    const bestLanguage = RNLocalize.findBestAvailableLanguage(Object.keys(resources)) || { languageTag: 'en' };
    callback(bestLanguage.languageTag);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: 'http://192.168.0.102:8000/api/set-language?lang={{lng}}',
    },
  });

export default i18n;
