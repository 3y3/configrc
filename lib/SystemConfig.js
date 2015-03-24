var BaseConfig = require('./BaseConfig'),
    inherits = require('util').inherits,
    path = require('path');

var win = process.platform === "win32";

function SystemConfig(options) {
  BaseConfig.call(this, options);
  
  var systemConfigPath = win 
    ? path.resolve(process.env.PROGRAMFILES, this._options.target, this._options.filename)
    : path.resolve('/etc', this._options.filename);
  
  this._sources.push(systemConfigPath);
  
  this._collectConfig();
}

inherits(SystemConfig, BaseConfig);

module.exports = SystemConfig;
