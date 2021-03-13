module.exports = {
	extends: [
		'airbnb-base',
		'plugin:jest/recommended',
		'plugin:jest/style',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	env: { es6: true, node: true, jest: true },
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'jest'],
	rules: {
		'@typescript-eslint/array-type': 'error',

		'@typescript-eslint/ban-ts-comment': [
			'error',
			{
				'ts-expect-error': 'allow-with-description',
				'ts-ignore': 'allow-with-description',
				'ts-nocheck': true,
				'ts-check': false,
			},
		],

		'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

		curly: ['error', 'all'],

		'class-methods-use-this': 'off',

		'@typescript-eslint/explicit-member-accessibility': 'error',

		'@typescript-eslint/member-ordering': 'error',

		'no-dupe-class-members': 'off',
		'@typescript-eslint/no-dupe-class-members': ['error'],

		'@typescript-eslint/no-parameter-properties': 'error',

		// naming conventions
		'no-underscore-dangle': 'off',
		camelcase: 'off',
		'@typescript-eslint/naming-convention': [
			'error',
			// camelCase for everything not otherwise indicated
			{ selector: 'default', format: ['camelCase'] },
			// allow variables to be camelCase or UPPER_CASE
			{ selector: 'variable', format: ['camelCase', 'UPPER_CASE'] },
			// do not enforce format on property names
			{ selector: 'property', format: null },
			// PascalCase for classes and TypeScript keywords
			{ selector: ['typeLike'], format: ['PascalCase'] },
		],

		'no-shadow': 'off',
		'@typescript-eslint/no-shadow': 'error',

		'@typescript-eslint/no-unused-vars': [
			'error',
			{ vars: 'all', args: 'after-used', ignoreRestSiblings: true },
		],

		'no-use-before-define': 'off',
		'@typescript-eslint/no-use-before-define': [
			'error',
			{
				functions: true,
				classes: true,
				variables: true,
				enums: true,
				typedefs: true,
				ignoreTypeReferences: true,
			},
		],

		'no-useless-constructor': 'off',
		'@typescript-eslint/no-useless-constructor': ['error'],

		'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],

		'import/extensions': ['error', 'ignorePackages', { ts: 'never', js: 'never' }],

		'import/order': ['error', { 'newlines-between': 'never' }],
	},
	settings: {
		'import/resolver': { node: { extensions: ['.js', '.ts'] } },
	},
	overrides: [
		{
			files: ['**/index.*'],
			rules: {
				// allow named export
				'import/prefer-default-export': 'off',
				'import/no-default-export': 'error',
			},
		},
		{
			files: ['**/scripts/**', '**/__tests__/**', '**/*.test.ts'],
			rules: {
				// allow dev dependencies
				'import/no-extraneous-dependencies': [
					'error',
					{
						devDependencies: true,
						optionalDependencies: false,
						peerDependencies: false,
					},
				],
			},
		},
		{
			files: ['**/__tests__/**', '**/*.test.ts'],
			rules: {
				// disallow use of "it" for test blocks
				'jest/consistent-test-it': ['error', { fn: 'test', withinDescribe: 'test' }],
				// ensure all tests contain an assertion
				'jest/expect-expect': 'error',
				// no commented out tests
				'jest/no-commented-out-tests': 'error',
				// no duplicate test hooks
				'jest/no-duplicate-hooks': 'error',
				// valid titles
				'jest/valid-title': 'error',
				// no if conditionals in tests
				'jest/no-if': 'error',
				// expect statements in test blocks
				'jest/no-standalone-expect': 'error',
				// disallow returning from test
				'jest/no-test-return-statement': 'error',
				// disallow truthy and falsy in tests
				'jest/no-truthy-falsy': 'error',
				// prefer called with
				'jest/prefer-called-with': 'error',
			},
		},
	],
};
