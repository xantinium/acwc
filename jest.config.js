/** @type {import('jest').Config} */
const config = {
    testMatch: [
        '<rootDir>/**.spec.{ts,tsx}',
    ],
    transform: {
        '^.+\\.(t|j)sx?$': [
            '@swc/jest',
            {
                configFile: '.swcrc',
            },
        ],
    },
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [],
};

export default config;
