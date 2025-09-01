module.exports = {
    extends: [
        '@sanity/eslint-config-studio',
        'prettier'
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        browser: true,
        es6: true,
        node: true
    },
    rules: {
        'prettier/prettier': 'error'
    },
    plugins: ['prettier']
}
