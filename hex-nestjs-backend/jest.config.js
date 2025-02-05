"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    extensionsToTreatAsEsm: ['.ts'],
    globals: {
        'ts-jest': {
            useESM: true,
        },
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
    },
    projects: [
        {
            displayName: 'unit',
            testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
            transform: {
                '^.+\\.ts$': 'ts-jest',
            },
        },
        {
            displayName: 'integration',
            testMatch: ['<rootDir>/test/integration/**/*.integration.spec.ts'],
            transform: {
                '^.+\\.ts$': 'ts-jest',
            },
        },
        {
            displayName: 'e2e',
            testMatch: ['<rootDir>/test/e2e/**/*.e2e.spec.ts'],
            transform: {
                '^.+\\.ts$': 'ts-jest',
            },
        },
    ],
};
exports.default = config;
