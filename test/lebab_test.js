const grunt = require('grunt');
const fs = require('fs');

// noinspection JSUnusedGlobalSymbols
exports.lebab = {
  setUp(done) {
    done();
  },

  write_to_original_file(test) {
    test.expect(2);

    let actual = grunt.file.read(
      'test/fixtures/write_to_original_file/unformatted.js'
    );
    let tmp = grunt.file.read('tmp/formatted_write_to_original_file.js');
    let expected = grunt.file.read(
      'test/expected/write_to_original_file/formatted.js'
    );
    test.notEqual(actual, tmp, 'File should be formatted!');
    test.equal(tmp, expected, 'Formatting should be equal expected!');

    test.done();
  },

  write_to_original_file_with_globe(test) {
    test.expect(7);

    let actual_formatted_1 = grunt.file.read(
      'test/fixtures/write_to_original_file_with_globe/unformatted_match_1.js'
    );
    let actual_formatted_2 = grunt.file.read(
      'test/fixtures/write_to_original_file_with_globe/unformatted_match_2.js'
    );
    let actual_unformatted = grunt.file.read(
      'test/fixtures/write_to_original_file_with_globe/unformatted_skip.js'
    );

    let formatted_1 = grunt.file.read(
      'tmp/write_to_original_file_with_globe/unformatted_match_1.js'
    );
    let formatted_2 = grunt.file.read(
      'tmp/write_to_original_file_with_globe/unformatted_match_2.js'
    );
    let unformatted = grunt.file.read(
      'tmp/write_to_original_file_with_globe/unformatted_skip.js'
    );

    let expected_formatted_1 = grunt.file.read(
      'test/expected/write_to_original_file_with_globe/formatted_1.js'
    );
    let expected_formatted_2 = grunt.file.read(
      'test/expected/write_to_original_file_with_globe/formatted_2.js'
    );

    test.notEqual(
      actual_formatted_1,
      formatted_1,
      'File #1 should be formatted!'
    );
    test.equal(
      formatted_1,
      expected_formatted_1,
      'Formatting should be equal expected in file #1!'
    );

    test.notEqual(
      actual_formatted_2,
      formatted_2,
      'File #2 should be formatted!'
    );
    test.equal(
      formatted_2,
      expected_formatted_2,
      'Formatting should be equal expected in file #2!'
    );

    test.notEqual(
      actual_formatted_2,
      formatted_2,
      'File #2 should be formatted!'
    );
    test.equal(
      formatted_2,
      expected_formatted_2,
      'Formatting should be equal expected in file #2!'
    );

    test.equal(
      actual_unformatted,
      unformatted,
      'Skipped file should not be formatted!'
    );

    test.done();
  },
};
