const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([
      {
        // Name for the overall project
        name: 'projectName',
        message: 'Your project name',
        default: 'MyProject'
      },
      {
        // Name for the react application
        name: 'appName',
        message: 'Enter your react app name',
        default: 'frontend'
      },
      {
        // Name for the pulumi platform
        name: 'platformName',
        message: 'Enter your platform name',
        default: 'platform'
      },
      {
        // The GH repo to deploy the react application to
        name: 'repo',
        message: 'Enter your app repo url',
        default: ''
      },
      {
        // A valid GH access token for the react application's repo
        name: 'ghToken',
        message: 'Enter your gh access token',
        default: ''
      },
      {
        // Optional deploy - without deployment, just the template files will be generated
        name: 'deploy',
        message: 'Deploy?(Y/N)',
        default: 'N'
      }
    ]);
  }

  configure() {
    mkdirp(this.answers.projectName);
    this.destinationRoot(this.destinationPath(this.answers.projectName));
  }

  _runFeSubGenerator() {
    this.composeWith(require.resolve('../frontend'), {
      appName: this.answers.appName,
      repo: this.answers.repo
    });
  }

  _runPlatSubGenerator() {
    this.composeWith(require.resolve('../platform'), {
      platformName: this.answers.platformName,
      appName: this.answers.appName,
      ghToken: this.answers.ghToken,
      repo: this.answers.repo
    });
  }
  _runDeploySubGenerator() {
    this.composeWith(require.resolve('../deploy'), {
      platformName: this.answers.platformName,
      appName: this.answers.appName,
      ghToken: this.answers.ghToken,
      repo: this.answers.repo
    });
  }

  async default() {
    await this._runFeSubGenerator();
    await this._runPlatSubGenerator();
  }

  end() {
    this.answers.deploy === 'Y' && this._runDeploySubGenerator();
  }
};
