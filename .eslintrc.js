// .eslintrc.js
module.exports = {
  parserOptions: {
    parser: "babel-eslint"
  },
  extends: ["plugin:vue/recommended"],
  plugins: ["vuetify"],
  rules: {
    "vuetify/no-deprecated-classes": "error",
    "vuetify/no-legacy-grid": "error",
    indent: ["error", 2],
    "vue/max-attributes-per-line": "off",
    "vue/html-end-tags": "off",
    "vue/html-self-closing": "off",
    "vue/html-indent": "off",
    "vue/no-unused-components": "off",
    "vue/no-unused-vars": "off"
  }
};
