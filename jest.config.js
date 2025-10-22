/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ["<rootDir>/src"], // adjust if your tests are elsewhere
  moduleFileExtensions: ["ts", "js", "json", "node"],
};
