import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextCoreWebVitals,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "import/no-anonymous-default-export": "off",
      "react-hooks/exhaustive-deps": "off",
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
      "react/no-unescaped-entities": "off",
    },
  },
  {
    ignores: [
      "**/node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default config;
