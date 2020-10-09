module.exports = {
  root: true,
  extends: ["@react-native-community", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    "react-hooks/exhaustive-deps": 0,
    "react-native/no-unused-styles": 1,
    "react/jsx-key": 2,
    eqeqeq: ["error", "smart"],
    /*
    "react/jsx-no-bind": [
      1,
      {
        ignoreDOMComponents: false,
        ignoreRefs: false,
        allowArrowFunctions: true,
        allowFunctions: false,
        allowBind: false,
      },
    ],
    */
  },
};
