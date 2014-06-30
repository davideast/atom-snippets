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

};

// convention for storing language/framework/library snippets
function findPath(type) {
  return 'snippets/{type}/*.cson'.replace('{type}', type);
}

//
// TODO:
//  - Be able to build all paths
// create an array of multiple paths if multiple paths are provided
function combinePaths(types) {
  var paths = [];
  types.forEach(function pathFind(type) {
    paths.push(findPath(type));
  });
  return paths;
}


//
// Task: snippets
// Args: --select <language/framework/library name>
// Ex: gulp snippet --select javascript,angular,backbone
//
// Desc: The following gulp task uses yargs to take the
// --select argument from the command line. The --select
// argument will specify what language to build the
// files to.
gulp.task('snippets', function() {
  var selection = argv.select;
  return gulp.src(combinePaths(selection.split(',')))
    .pipe(concat(paths.name))
    .pipe(gulp.dest(paths.build));
});


gulp.task('default', ['snippets']);
