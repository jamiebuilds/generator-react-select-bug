'use strict';

var yeoman = require('yeoman-generator');
var latestVersion = require('latest-version');
var Promise = require('pinkie-promise');
var semver = require('semver');

function isValidVersion(version) {
  return Boolean(semver.valid(version));
}

module.exports = yeoman.Base.extend({
  prompting: function () {
    var done = this.async();

    this.log('Just a second, fetching some data...');

    Promise.all([
      latestVersion('react'),
      latestVersion('react-select')
    ]).then(function (versions) {
      var reactVersion = versions[0];
      var reactSelectVersion = versions[1];

      var prompts = [{
        type: 'input',
        name: 'name',
        message: 'What is the name of this bug?',
        required: true
      }, {
        type: 'confirm',
        name: 'es2015',
        message: 'Do you want to use es2015?',
        default: true
      }, {
        type: 'input',
        name: 'reactVersion',
        message: 'What version of React are you using?',
        default: reactVersion,
        validate: isValidVersion
      }, {
        type: 'input',
        name: 'reactSelectVersion',
        message: 'What version of React Select are you using?',
        default: reactSelectVersion,
        validate: isValidVersion
      }];

      this.prompt(prompts, function (props) {
        this.props = props;
        done();
      }.bind(this));
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc'),
      {
        es2015: this.props.es2015
      }
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copyTpl(
      this.templatePath('index.html'),
      this.destinationPath('index.html'),
      {
        name: this.props.name
      }
    );

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.props.name,
        es2015: this.props.es2015,
        reactVersion: this.props.reactVersion,
        reactSelectVersion: this.props.reactSelectVersion
      }
    );

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        name: this.props.name
      }
    );

    this.fs.copy(
      this.templatePath(this.props.es2015 ? 'script-es2015.js' : 'script.js'),
      this.destinationPath('script.js')
    );

    this.fs.copy(
      this.templatePath('styles.css'),
      this.destinationPath('styles.css')
    );
  },

  install: function () {
    this.npmInstall();
  }
});
