var Paths = (function () {
  function Paths(config) {
    this.config = config;
  }
  Paths.prototype = {

    // convention for storing language/framework/library snippets
    find: function find(type) {
      return 'snippets/{type}/*.cson'.replace('{type}', type);
    },

    //
    // create an array of multiple paths if multiple paths are provided
    combine: function combine(types) {
      var paths = [],
        self = this;
      types.forEach(function pathFind(type) {
        paths.push(self.find(type));
      });
      return paths;
    },

    //
    // Validate user's input selection
    // Ensures:
    //  - the --selection argument has been provided
    //  - the --selection has a value that is not the empty string
    isValid: function isValid(selection) {
      var isValid = true;
      // is there a selection?
      if (!selection) {
        isValid = false;
      } else if (selection === '') { // is the selection not the empty string?
        isValid = false;
      }
      return isValid;
    },

    gather: function gather(selection) {
      var selectedPaths;
      // all of the snippets?
      if (selection.toLowerCase() === 'all') {
        selectedPaths = this.config.all;
      } else {
        // combine multiple selections
        selectedPaths = this.combine(selection.split(','));
      }

      return selectedPaths;
    }

  };

  return Paths;

}());

exports.Paths = Paths;
