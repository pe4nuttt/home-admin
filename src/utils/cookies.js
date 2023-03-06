import Cookies from "js-cookie";

// App

// Language
const languageKey = "language";
export const getLanguage = () => Cookies.get(languageKey);
export const setLanguage = language => Cookies.set(languageKey, language);
