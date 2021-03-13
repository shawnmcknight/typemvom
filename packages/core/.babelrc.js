module.exports = {
	ignore: ['**/*.d.ts'],
	presets: [
		[
			'@babel/preset-env',
			{
				targets: { node: '10.0' },
				useBuiltIns: 'usage',
				corejs: { version: 3 },
				shippedProposals: true,
			},
		],
		'@babel/typescript',
	],
	plugins: [
		'babel-plugin-transform-typescript-metadata',
		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/proposal-class-properties', { loose: true }],
	],
	env: {
		build: {
			ignore: ['**/*.test.ts', '**/*.test.tsx', '**/__tests__/**'], // do not build test files
		},
		debug: { sourceMaps: true, retainLines: true },
	},
};
