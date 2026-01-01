import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import ar from "./locales/ar.json";
import en from "./locales/en.json";
import ms from "./locales/ms.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            ar: { translation: ar },
            en: { translation: en },
            ms: { translation: ms },
        },
        fallbackLng: "ar",
        supportedLngs: ["ar", "en", "ms"],
        detection: {
            order: ["localStorage", "navigator"],
            caches: ["localStorage"],
            lookupLocalStorage: "arabica_lang",
        },
        interpolation: { escapeValue: false },
    });

export default i18n;
