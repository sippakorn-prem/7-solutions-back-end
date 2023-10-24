module.exports = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: 'src',
	testRegex: '.*\\.spec\\.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	collectCoverageFrom: ['**/*.(t|j)s'],
	coverageDirectory: '../coverage',
	coveragePathIgnorePatterns: ['/node_modules/', '/index\\.(t|j)s$'],
	testEnvironment: 'node',
	maxConcurrency: 7,
};
