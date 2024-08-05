/** @type {import('jest').Config} */
const config = {
    testMatch: [
        '<rootDir>/*.{spec}.{ts,tsx}',
        '<rootDir>/**/*.{spec}.{ts,tsx}',
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
    moduleNameMapper: {
        '\\.(css|less|scss|svg)$': 'identity-obj-proxy',
        '@altcraft-ui': 'altkraft-frontend/src/CoreComponents',
    },
    transformIgnorePatterns: [],
};

export default config;
