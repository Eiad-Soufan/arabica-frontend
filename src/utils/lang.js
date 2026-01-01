export const SUPPORTED_LANGS = ["ar", "en", "ms"];

export function getDir(lang) {
    return lang === "ar" ? "rtl" : "ltr";
}
