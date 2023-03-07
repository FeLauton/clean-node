module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/main/**",
    "!<rootDir>/src/data/usecases/add-account/db-add-account-protocols.ts",
    "!<rootDir>/src/presentation/controllers/login/login-controller-protocols.ts",
    "!<rootDir>/src/presentation/controllers/signup/signup-controller-protocols.ts",
    "!<rootDir>/src/presentation/helpers/validators/index.ts",
    "!<rootDir>/src/presentation/protocols/index.ts",
  ],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  testEnvironment: "node",
  preset: "@shelf/jest-mongodb",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/src/$1",
  },
};
