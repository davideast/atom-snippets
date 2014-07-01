var Paths = require('../src/Paths').Paths;

// pathParser
// Construct a PathParser object and return a function that will
// parse and return the file paths given a valid selection.
function pathParser(config) {
  var paths = new Paths(config);

  return function (selection) {
    // validate the user's selection
    if (!paths.isValid(selection)) {
      throw new Error(paths.config.noSelection);
    }

    return paths.gather.call(paths, selection);
  };
};

exports.pathParser = pathParser;
