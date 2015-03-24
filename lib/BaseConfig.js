var extend = require('deep-extend'),
    ini = require('ini'),
    ns = require('lib/ns');

function BaseConfig(options) {
  this._config = {};
  this._options = options;
  this._sources = [];
  this._formats = {
    'ini': ini,
    'json': JSON
  };
}

BaseConfig.prototype.get = function(name) {
  return ns(this._config, name)[name];
};

BaseConfig.prototype.set = function(name, value) {
  if (value != undefined)
    ns(this._config, name)[name] = value;
  else
    delete ns(this._config, name)[name];
};

BaseConfig.prototype.delete = function(name) {
  delete ns(this._config, name)[name];
};

BaseConfig.prototype._collectConfig = function() {
  var config = {};
  
  this._sources.forEach(function(source) {
    
  }, this);
  
  return config;
};
