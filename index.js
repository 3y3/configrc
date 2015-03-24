var minimist = require('minimist');
var GlobalConfig = require('lib/GlobalConfig');
var SystemConfig = require('lib/SystemConfig');
var LocalConfig = require('lib/LocalConfig');

/**
 * @param {Object} options - config collector options
 * @constructor
 */
function Config(options) {
  if (!(this instanceof Config)) return new Config(options);
  
  this._options = extend({
    target: null,
    global: false,
    system: false,
    local: false,
    file: null
  }, options);
  
  this._config = this._resolveConfig();
}

Config.prototype._resolveConfig = function() {
  //if (this._options.file) return new FileConfig(options);
  if (this._options.local) return new LocalConfig(options);
  if (this._options.global) return new GlobalConfig(options);
  if (this._options.system) return new SystemConfig(options);
  //return new MixedConfig(options);
};

/**
 * @param {Array} argv - option name [and option value]
 */
Config.prototype.process = function(argv) {
  var option = argv[0];
  if (!option) throw new Error('Target option required');
  
  var value = argv[1];
  
  if (value === undefined)
    return this._config.get(option);
  else
    this._config.set(option, value);
};

module.exports = Config;


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
