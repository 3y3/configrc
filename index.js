var minimist = require('minimist');
var extend = require('util')._extend;

var etc = '/etc'
var win = process.platform === "win32"
/**
 * @constructor
 */
function Config(options) {
  if (!(this instanceof Config)) return new Config(options);
  
  this._options = extend({
    target: null,
    global: false,
    system: false,
    local: true,
    file: null
  }, options);
  
  this._options.filename = '.' + target + 'rc';
}

/**
 * @param {Array} argv - option name [and option value]
 * @param {Object} overrides - Config options overrides
 */
Config.prototype.process = function(argv, overrides) {
  var option = argv[0];
  if (!option) throw new Error('Target option required');
  
  var value = argv[1];
  var options = extend(extend({}, this._options), overrides);
  
  if (!value)
    return this.config(options).get(option);
  else
    this.config(options).set(option, value);
};

Config.prototype.config = function(options) {
  if (this._options.global) return new GlobalConfig(options);
  if (this._options.system) return new SystemConfig(options);
  if (this._options.local) return new LocalConfig(options);
};

module.exports = Config;

function BaseConfig(options) {
  this._config = {};
  this._options = options;
  this._sources = [];
}
BaseConfig.prototype.get = function(option) {
  return this._config[option];
};
BaseConfig.prototype.set = function(option, value) {
  if (value !== undefined)
    this._config[option] = value;
  else
    delete this._config[option];
  
  fs.writeFileSync(
    this._options.filepath,
    format[this._format].stringify(
      this._config,
      this._options[this._format] || {})
  );
};
BaseConfig.prototype._collectConfig = function() {
  var config = {};
  
  this._sources.forEach(function(source) {
    
  }, this);
  
  return config;
};

function GlobalConfig(options) {
  BaseConfig.call(this, options);
    
  var $HOME = win ? process.env.USERPROFILE : process.env.HOME;
  var $XDG_CONFIG_HOME = process.env.XDG_CONFIG_HOME;

  if ($XDG_CONFIG_HOME)
    this._sources.push($XDG_CONFIG_HOME);
    
  this._sources.push($HOME);
}
inherits(GlobalConfig, BaseConfig);



if (require.main == module) {
  main();
}

function main() {
  var argv = parseArgs(process.argv.slice(2));
  argv.target = argv._.splice(0, 1);
  Config(argv).process(argv._);
}

function parseArgs(args) {
  var argv = minimist(args, {
    boolean: ['global', 'system', 'local'],
    string: ['file', 'target'],
    default: {
      'global': false,
      'system': false,
      'local': true
    },
    alias: {
      'file': ['f'],
      'target': ['t']
    }
  });
  
  return argv;
}