var gulp = require('gulp'),
    concat = require('gulp-concat'),
    argv = require('yargs').argv;

// path info for building
var paths = {

  // name of built file
  name: 'snippets.cson',

  // directory to build to
  build: 'build/',

  // glob path for all snippets
  all: 'snippets/**/*.cson',

  // error message for invalid selections
  noSelection: 'Select the snippets to build. e.x.: gulp snippets --select javascript'

};

// convention for storing language/framework/library snippets
function findPath(type) {
  return 'snippets/{type}/*.cson'.replace('{type}', type);
}

//
// create an array of multiple paths if multiple paths are provided
function combinePaths(types) {
  var paths = [];
  types.forEach(function pathFind(type) {
    paths.push(findPath(type));
  });
  return paths;
}

//
// Validate user's input selection
// Ensures:
//  - the --selection argument has been provided
//  - the --selection has a value that is not the empty string
function isValidSelection(selection) {
  var isValid;
  // is there a selection?
  if (!selection) {
    isValid = false;
  } else if (selection === '') { // is the selection not the empty string?
    isValid = false;
  }
  return isValid;
}

function parseSelection(selection) {
  var selectedFiles;

  // all of the snippets?
  if (selection.toLowerCase() === 'all') {
    selectedFiles = paths.all;
  } else {
    // combine multiple selections
    selectedFiles = combinePaths(selection.split(','));
  }

  return selectedFiles;
}

//
// Task: snippets
// Args: --select <language/framework/library name>
// Ex: gulp snippets --select javascript,angular,backbone
//
// Desc: The following gulp task uses yargs to take the
// --select argument from the command line. The --select
// argument will specify what language to build the
// files to.
gulp.task('snippets', function() {
  var selection,
      selectedFiles;

  // get the selection from the command line
  selection = argv.select

  // validate the selection
  if (!isValidSelection(selection)) {
    throw new Error(paths.noSelection);
  }

  // get the paths of the files to be combined
  selectedFiles = parseSelection(selection);

  // build the files into build/snippets.cson
  return gulp.src(selectedFiles)
    .pipe(concat(paths.name))
    .pipe(gulp.dest(paths.build));
});


gulp.task('default', ['snippets']);
