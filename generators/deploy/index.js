const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  _gitInit() {
    this.spawnCommandSync('git', ['init'], {
      cwd: this.options.appName
    });
  }

  _gitAddRemote() {
    this.spawnCommandSync('git', ['remote', 'add', 'origin', this.options.repo], {
      cwd: this.options.appName
    });
  }

  _gitStage() {
    this.spawnCommandSync('git', ['add', '--all'], {
      cwd: this.options.appName
    });
  }

  _gitCommit() {
    this.spawnCommandSync('git', ['commit', '-m', 'initial commit from generator', '--no-verify'], {
      cwd: this.options.appName
    });
  }

  _gitPush() {
    this.spawnCommandSync('git', ['push', '-u', 'origin', 'master', '--force'], {
      cwd: this.options.appName
    });
  }

  _pulumiUp() {
    this.spawnCommandSync('pulumi', ['up', '-y'], {
      cwd: this.options.platformName
    });
  }

  initialsing() {
    this.log('Depoloying:', this.options.appName);
  }
  // The platform packages (namely pulumi) are installed so the application can be deployed
  install() {
    this.npmInstall(null, {}, { cwd: this.options.platformName });
  }
  async end() {
    await this._gitInit();
    await this._gitAddRemote();
    await this._gitStage();
    await this._gitCommit();
    await this._gitPush();
    await this._pulumiUp();
  }
};
