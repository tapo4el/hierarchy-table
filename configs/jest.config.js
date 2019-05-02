module.exports = {
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': 'identity-obj-proxy',
    },
    setupFiles: [
        '<rootDir>/configs/enzyme.config.js',
        '<rootDir>/node_modules/regenerator-runtime/runtime',
    ],
    transform: { '\\.(ts|tsx)?$': 'ts-jest' },
    testEnvironment: 'jsdom',
    testRegex: '/src/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    rootDir: '../',
    globals: {
        'ts-jest': {
            tsConfig: './configs/tsconfig.json',
        },
    },
};
