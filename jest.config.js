/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const path = require("path");
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "\\.jpg$": path.resolve(__dirname, "__mocks__/asset.js"),
    "\\.png$": path.resolve(__dirname, "__mocks__/asset.js"),
    "\\.svg$": path.resolve(__dirname, "__mocks__/asset.js"),
    "\\.css$": path.resolve(__dirname, "__mocks__/asset.js"),
  },
};
