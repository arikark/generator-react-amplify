const Generator = require("yeoman-generator");
// FE

module.exports = class extends Generator {
  initialsing() {
    this.log("Generating:", this.options.name);
  }

  writing() {
    this.fs.copy(this.templatePath(), this.destinationPath(this.options.name));
    this.fs.copy(
      this.templatePath(".*"),
      this.destinationPath(this.options.name)
    );
    this.fs.copy(
      this.templatePath(".husky/"),
      this.destinationPath(this.options.name, ".husky/")
    );
    this.fs.copy(
      this.templatePath(".husky/.*"),
      this.destinationPath(this.options.name, ".husky/")
    );
  }

  _gitInit() {
    this.spawnCommandSync("git", ["init", this.options.name]);
  }
  _gitAddRemote() {
    this.spawnCommandSync(
      "git",
      ["remote", "add", "origin", this.options.repo],
      { cwd: this.options.name }
    );
  }
  _gitStage() {
    this.spawnCommandSync("git", ["add", "--all"], {
      cwd: this.options.name
    });
  }
  _gitCommit() {
    this.spawnCommandSync(
      "git",
      ["commit", "-m", '"initial commit from generator", --no-verify'],
      { cwd: this.options.name }
    );
  }

  _gitPush() {
    this.spawnCommandSync("git", ["push", "-u", "origin", "master"], {
      cwd: this.options.name
    });
  }

  // install() {
  //   this.npmInstall(null, {}, { cwd: this.options.name });
  // }

  async end() {
    await this._gitInit();
    await this._gitAddRemote();
    await this._gitStage();
    await this._gitCommit();
    await this._gitPush();
  }
};
