// 配置文档
// https://jestjs.io/docs/zh-Hans/configuration
// 需要安装 babel-jest，文档：https://www.npmjs.com/package/babel-jest
// 注意到，文档中说，如果使用babel 7的话，需要安装babel 6~7的桥接版本'babel-core@^7.0.0-bridge'

module.exports = {
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  collectCoverage: true,
  testEnvironment: "node",
  verbose: true,
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/"],
  // Add these lines:
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["/node_modules/"],
  moduleFileExtensions: ["js", "json", "jsx", "node"],
};
