module.exports = function(object, path) {
  var way = path.split('.').slice(0, -1);
  var result = object;
  
  way.forEach(function(level, index) {
    result = object[level] = object[level] || {};
  });
  
  return result;
};
