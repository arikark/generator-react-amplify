const Generator = require("yeoman-generator");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        name: "projectName",
        message: "Your project name",
        default: "generated-app"
      },
      {
        name: "appName",
        message: "Enter your react app name",
        default: "frontend"
      },
      {
        name: "platformName",
        message: "Enter your platform name",
        default: "platform"
      },
      {
        name: "gh_token",
        message: "Enter your gh access token",
        default: ""
      },
      {
        name: "repo",
        message: "Enter your app repo url",
        default: "https://github.com/arielkark-versent/test"
      }
    ]);
  }

  configure() {
    mkdirp(this.answers.projectName);
    this.destinationRoot(this.destinationPath(this.answers.projectName));
  }

  _runFeSubGenerator() {
    this.composeWith(require.resolve("../frontend"), {
      name: this.answers.appName,
      repo: this.answers.repo
    });
  }

  _runBeSubGenerator() {
    this.composeWith(require.resolve("../platform"), {
      name: this.answers.platformName,
      appName: this.answers.appName,
      gh_token: this.answers.gh_token,
      gh_url: this.answers.repo
    });
  }

  async default() {
    await this._runFeSubGenerator();
    await this._runBeSubGenerator();
  }
};
