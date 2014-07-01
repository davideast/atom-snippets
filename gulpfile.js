var gulp = require('gulp'),
    concat = require('gulp-concat'),
    argv = require('yargs').argv,
    pathParser = require('./src/pathParser').pathParser;

// path info for building
var config = {

  // name of built file
  name: 'snippets.cson',

  // directory to build to
  build: 'build/',

  // glob path for all snippets
  all: 'snippets/**/*.cson',

  // error message for invalid selections
  noSelection: 'Select the snippets to build. e.x.: gulp snippets --select javascript'

};

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
  var parse,
      selection,
      selectedFiles;

  parser = pathParser(config);

  selectedFiles = parser(argv.select);
  console.log(selectedFiles);

  // build the files into build/snippets.cson
  return gulp.src(selectedFiles)
    .pipe(concat(config.name))
    .pipe(gulp.dest(config.build));
});


gulp.task('default', ['snippets']);
