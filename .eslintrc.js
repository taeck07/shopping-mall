module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'standard-with-typescript',
		'plugin:prettier/recommended',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['tsconfig.json'],
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'prettier/prettier': 'error',
		'react/jsx-filename-extension': [
			2,
			{ extensions: ['.js', '.jsx', '.ts', '.tsx'] },
		],
		'@typescript-eslint/explicit-function-return-type': 'warn',
		'@typescript-eslint/strict-boolean-expressions': 'warn',
		'@typescript-eslint/no-floating-promises': 'warn',
		'@typescript-eslint/promise-function-async': 'warn',
		'@typescript-eslint/prefer-nullish-coalescing': 'off',
	},
};
