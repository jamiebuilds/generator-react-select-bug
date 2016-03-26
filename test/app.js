'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-react-select-bug:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        name: 'test1',
        es2015: true,
        reactVersion: '0.14.2',
        reactSelectVersion: '0.9.1'
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      '.babelrc',
      '.gitignore',
      'index.html',
      'package.json',
      'README.md',
      'script.js',
      'styles.css'
    ]);
  });
});
