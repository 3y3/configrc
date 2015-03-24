var BaseConfig = require('./BaseConfig'),
    inherits = require('util').inherits,
    path = require('path');

var win = process.platform === "win32";

function GlobalConfig(options) {
  BaseConfig.call(this, options);
    
  var $HOME = win ? process.env.USERPROFILE : process.env.HOME;
  var $XDG_CONFIG_HOME = process.env.XDG_CONFIG_HOME;

  if ($XDG_CONFIG_HOME)
    this._sources.push(path.resolve($XDG_CONFIG_HOME, this._options.target, 'config'));
    
  this._sources.push($HOME);
  
  this._collectConfig();
}

inherits(GlobalConfig, BaseConfig);

module.exports = GlobalConfig;
