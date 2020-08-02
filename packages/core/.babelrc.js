module.exports = {
	ignore: ['**/*.d.ts'],
	presets: [['@babel/preset-env', { targets: { node: true } }], '@babel/typescript'],
	env: {
		build: {
			ignore: ['**/*.test.ts', '**/*.test.tsx', '**/__tests__/**'], // do not build test files
		},
		debug: { sourceMaps: true, retainLines: true },
	},
};
