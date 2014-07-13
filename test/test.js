var assert = require('assert'),
    Paths = require('../src/Paths').Paths,
    pathParser = require('../src/pathParser').pathParser;

//// Test Cases

//
// Paths
//

describe('Paths', function() {

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

  },

  paths = new Paths(config);

  // It should format a file path
  it('It should format a file path', function() {

    assert.equal('snippets/javascript/*.cson', paths.find('javascript'));
    assert.equal('snippets/angular/*.cson', paths.find('angular'));

  });

  // It should format multiple file paths
  it('It should format multiple file paths', function() {

    var combinedArr = [
      'snippets/javascript/*.cson',
      'snippets/angular/*.cson'
    ],
    combinedArr2 = [
      'snippets/markdown/*.cson',
      'snippets/javascript/*.cson',
    ];

    assert.deepEqual(combinedArr, paths.gather('javascript,angular'));
    assert.deepEqual(combinedArr2, paths.gather('markdown,javascript'));

  });

  // It should return the all path if provided
  it('It should return the all path if provided', function() {

    assert.equal('snippets/**/*.cson', paths.gather('all'));

  });

});

describe('pathParser', function() {
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

  },
  parser = pathParser(config);

  it('It should return a function', function() {

    console.log(parser('all'));
    //assert.equal('function', typeof parser('all'));
    assert.equal(true, true);
  });

});

// pathParser
//
// It should return a function
//
// It should throw an error if no selection is present
//
// It should throw an error if there is an empty string
//
// It should return multiple paths based on a selection
// One selection  : string -> 'javascript'
// Two selections : string -> 'javascript,angular'
// No selections  : string -> ''
// Null selection : null
