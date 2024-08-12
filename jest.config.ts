import type { Config } from "jest";

const config: Config = {
  collectCoverage: true,
  collectCoverageFrom: ["lib/**/*.{ts,tsx}", "!lib/**/*.d.ts", "!**/vendor/**"],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  transform: {
    ".(ts|tsx)": "ts-jest",
  },

  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/coverage",
    "package.json",
    "package-lock.json",
    "reportWebVitals.ts",
    "jest.setup.ts",
    "index.tsx",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  snapshotResolver: "<rootDir>/snapshotResolver.ts",
};

export default config;
