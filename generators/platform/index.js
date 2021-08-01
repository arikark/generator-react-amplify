const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initialsing() {
    this.log('Generating:', this.options.platformName);
  }

  // Platform template files are generated and the env vars are
  writing() {
    this.fs.copy(this.templatePath(), this.destinationPath(this.options.platformName));
    this.fs.copy(this.templatePath('.*'), this.destinationPath(this.options.platformName));
    this.fs.write(
      this.destinationPath(`${this.options.platformName}/.env`),
      `GITHUB_TOKEN=${this.options.ghToken}\nGITHUB_URL=${this.options.repo}\nAPP_NAME=${this.options.appName}`
    );
  }
};
