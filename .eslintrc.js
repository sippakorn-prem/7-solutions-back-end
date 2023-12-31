module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
		'@typescript-eslint/interface-name-prefix': 0,
		'@typescript-eslint/explicit-function-return-type': 1,
		'@typescript-eslint/explicit-module-boundary-types': 1,
		'@typescript-eslint/no-explicit-any': 1,
		'@typescript-eslint/init-declarations': 0,
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
				semi: true,
				singleQuote: true,
				printWidth: 100,
				useTabs: true,
				tabWidth: 4,
			},
		],
		"sort-imports": ["error", { ignoreDeclarationSort: true }],
  },
};
