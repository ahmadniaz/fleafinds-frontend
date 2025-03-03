import { createContext, useState, useContext } from "react";
import { LangConst } from "../assets/localization/i18n";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [langCode, setLangCode] = useState("ENU"); // Default language

  // Function to change language
  const changeLanguage = (code) => {
    setLangCode(code);
    localStorage.setItem("appLang", code); // Store in localStorage for persistence
  };

  return (
    <LanguageContext.Provider
      value={{ langCode, changeLanguage, translations: LangConst[langCode] }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
