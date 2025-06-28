import i18n from 'i18next';
import {getLocales} from 'react-native-localize';
import {initReactI18next} from 'react-i18next';

const {mainEN, mainUK, mainPL} = require('./src/localization');

const resources = {
  en: {
    main: mainEN,
  },
  uk: {main: mainUK},
  pl: {main: mainPL},
};
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en',
  resources,
  ns: ['main'],
  defaultNS: ['main'],
  initImmediate: false,
});
export default i18n;
