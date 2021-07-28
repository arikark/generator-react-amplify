const Generator = require("yeoman-generator");

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
    this.fs.write(
      this.destinationPath(`${this.options.name}/.env`),
      `GITHUB_TOKEN=${this.options.gh_token}\nGITHUB_URL=${this.options.gh_url}\nAPP_NAME=${this.options.appName}`
    );
  }

  install() {
    this.npmInstall(null, {}, { cwd: this.options.name });
  }

  _pulumiUp() {
    this.spawnCommandSync("pulumi", ["up", "-y"], {
      cwd: this.options.name
    });
  }
  async end() {
    await this._pulumiUp();
  }
};
