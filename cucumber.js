module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: ["./steps/**/*.ts"],
    format: ["progress", "json:reports/cucumber_report.json"],
    paths: ["./features/**/*.feature"],
    publishQuiet: true
  },
  api: {
    requireModule: ["ts-node/register"],
    require: ["./steps/**/*.ts"],
    format: ["progress", "json:reports/api_cucumber_report.json"],
    paths: ["./features/api.feature"],
    publishQuiet: true
  },
  example: {
    requireModule: ["ts-node/register"],
    require: ["./steps/**/*.ts"],
    format: ["progress", "json:reports/example_cucumber_report.json"],
    paths: ["./features/example.feature"],
    publishQuiet: true
  }
};
