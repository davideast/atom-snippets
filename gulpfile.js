var gulp = require('gulp'),
    concat = require('gulp-concat'),
    argv = require('yargs').argv;

// TODO:
//  - Better pattern for specifying snippet paths
var paths = {

  // name of built file
  name: 'snippets.cson',

  // directory to build to
  build: 'build/',

  // file snippets to languages
  snippet: {

    all: ['snippets/**/*.cson'],
    javascript: ['snippets/javascript/**/*.cson'],
    angular: ['snippets/angular/**/*.cson'],
    "firebase-js": ['snippets/firebase-js/**/*.cson'],
    markdown: ['snippets/markdown/**/*.cson']

  }

};


function combinePaths(args) {
  console.log(args);
}

//TODO: Better agrument name than snippet
//
// Task: snippet
// Args: --snippet <language name>
// Ex: gulp snippet --snippet javascript,angular,backbone
// 
// Desc: The following gulp task uses yargs to take the
// --snippet argument from the command line. The --snippet
// argument will specify what language to build the
// files to.
gulp.task('snippet', function() {
  combinePaths(argv.snippet);
  return gulp.src(paths.snippet[argv.snippet])
    .pipe(concat(paths.name))
    .pipe(gulp.dest(paths.build));
});


gulp.task('default', ['snippet']);
