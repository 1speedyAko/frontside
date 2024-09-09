module.exports = {
  root: true,
  extends: ["next", "next/core-web-vitals"],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    "react/no-unescaped-entities": 0, // Disable the rule correctly
  },
};
