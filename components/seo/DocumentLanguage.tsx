"use client";

import { useEffect } from "react";

type DocumentLanguageProps = {
  lang: string;
};

export function DocumentLanguage({ lang }: DocumentLanguageProps) {
  useEffect(() => {
    const previousLang = document.documentElement.lang;
    document.documentElement.lang = lang;

    return () => {
      document.documentElement.lang = previousLang || "de";
    };
  }, [lang]);

  return null;
}
