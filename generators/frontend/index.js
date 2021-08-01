const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initialsing() {
    this.log('Generating:', this.options.appName);
  }

  writing() {
    this.fs.copy(this.templatePath('**'), this.destinationPath(this.options.appName));
    this.fs.copy(this.templatePath('.*'), this.destinationPath(this.options.appName));
    this.fs.copy(
      this.templatePath('.husky/'),
      this.destinationPath(this.options.appName, '.husky/')
    );
    this.fs.copy(
      this.templatePath('.husky/.*'),
      this.destinationPath(this.options.appName, '.husky/')
    );
  }
};
