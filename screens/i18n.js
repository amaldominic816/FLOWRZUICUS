// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import HttpBackend from 'i18next-http-backend';

// Optionally define your translation resources if you have them locally
const resources = {
  en: { translation: { /* your English translations */ } },
  ar: { translation: { /* your Arabic translations */ } },
};

// Custom language detector using react-native-localize
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
  .use(HttpBackend) // if you need to load translations from your backend
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    resources, // include this if you're loading translations locally
    interpolation: {
      escapeValue: false, // not needed for React as it escapes by default
    },
    backend: {
      // Replace with your API endpoint for loading translations if needed
      loadPath: 'http://192.168.0.102:8000/api/set-language?lang={{lng}}',
    },
  });

export default i18n;
