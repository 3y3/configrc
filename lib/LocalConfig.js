var BaseConfig = require('./BaseConfig'),
    inherits = require('util').inherits,
    path = require('path');

var win = process.platform === "win32";

function LocalConfig(options) {
  BaseConfig.call(this, options);
  
  var packageJsonLevel = this._resolvePackageJsonPath();
  if (!packageJsonLevel) throw new Error('There is no local repository to configure.');

  this._sources.push(path.resolve(packageJsonLevel, this._options.filename));
  
  this._collectConfig();
}

inherits(LocalConfig, BaseConfig);

LocalConfig.prototype._resolvePackageJsonPath = function() {
  
};

module.exports = LocalConfig;
