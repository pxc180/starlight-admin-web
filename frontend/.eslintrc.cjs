module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'standard'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true
    },
    requireConfigFile: false
    // parser: '@babel/eslint-parser'
  },
  plugins: ['vue'],
  rules: {
    'vue/multi-word-component-names': 0,
    'space-before-function-paren': ['error', 'never']
  }
}
