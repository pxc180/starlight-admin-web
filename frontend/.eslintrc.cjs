module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'standard'],
  overrides: [],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@babel/eslint-parser',
    babelOptions: {
      parserOpts: {
        plugins: ['jsx']
      }
    },
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true
    },
    requireConfigFile: false
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 0,
    'no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: false }
    ],
    'space-before-function-paren': ['error', 'never'],
    'multiline-ternary': 0
  }
}
