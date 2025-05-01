"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

type LanguageContextType = {
  language: string;
  toggleLanguage: () => void;
  isRTL: boolean;
};

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  toggleLanguage: () => {},
  isRTL: false,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const locale = useLocale();
  const [language, setLanguage] = useState<string>("en"); // Default to prevent hydration mismatch
  const [isRTL, setIsRTL] = useState<boolean>(false); // Default to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    setLanguage(locale);
    setIsRTL(locale === "ar");

    // Set RTL direction on html element
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLanguage = () => {
    if (!isMounted) return;

    const newLanguage = language === "en" ? "ar" : "en";

    // Get the path without the locale prefix
    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");

    // Navigate to the same page with the new locale
    router.push(`/${newLanguage}${pathWithoutLocale}`);
  };

  return (
    <LanguageContext.Provider
      value={{
        language: isMounted ? language : locale,
        toggleLanguage,
        isRTL: isMounted ? isRTL : locale === "ar",
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
