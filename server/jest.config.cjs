module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/tests"],
    transform: {
      "^.+\\.tsx?$": "ts-jest", // ts & tsx files
    },
    testRegex: "((\\.|/)(test|spec))\\.tsx?$", // .test.ts(x) & .spec.ts(x) files
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  };