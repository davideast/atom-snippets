var gulp = require('gulp'),
    concat = require('gulp-concat'),
    argv = require('yargs').argv;

var snippets = {

  // name of built file
  name: 'snippets.cson',

  // directory to build to
  build: 'build/',

  // file paths to languages
  lang: {

    all: ['snippets/**/*.cson'],
    javascript: ['snippets/javascript/**/*.cson'],
    markdown: ['snippets/markdown/**/*.cson']

  }

};


function combinePaths(args) {
  console.log(args);
}


// Task: lang
// Args: --lang <language name>
//
// Desc: The following gulp task uses yargs to take the
// --lang argument from the command line. The --lang
// argument will specify what language to build the
// files to.
gulp.task('lang', function() {
  combinePaths(argv.lang);
  return gulp.src(snippets.lang[argv.lang])
    .pipe(concat(snippets.name))
    .pipe(gulp.dest(snippets.build));
});


gulp.task('default', ['lang']);
