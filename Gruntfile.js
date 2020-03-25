/*
 * grunt-lebab
 * https://github.com/mridang/grunt-lebab
 *
 * Copyright (c) 2020 Mridang Agarwalla
 * Licensed under the MIT license.
 */

function tasks(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    lebab: {
      // options: {
      //   progress: true
      // },
      override_with_lebabrc: {
        files: {
          'tmp/formatted_override_with_lebabrc.js':
            'test/fixtures/override_with_lebabrc/unformatted.js'
        }
      },
      write_to_original_file: {
        src: ['tmp/formatted_write_to_original_file.js']
      },
      write_to_original_file_with_globe: {
        src: [
          'tmp/write_to_original_file_with_globe/*.js',
          '!tmp/write_to_original_file_with_globe/*skip.js'
        ]
      },
      write_to_original_file_to_check: {
        src: ['tmp/formatted_write_to_original_file_to_check.js']
      },
      check_unformatted_file: {
        src: [
          'tmp/unformatted_write_to_original_file_to_check.js',
          'tmp/formatted_write_to_original_file_to_check.js'
        ]
      },
      grunt_file: {
        src: ['Gruntfile.js', 'tasks/**.*', 'test/lebab_test.js']
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },
    // Copy files for tests.
    copy: {
      write_to_original_file: {
        files: {
          'tmp/formatted_write_to_original_file.js':
            'test/fixtures/write_to_original_file/unformatted.js'
        }
      },
      write_to_original_file_with_globe: {
        files: [
          {
            expand: true,
            cwd: 'test/fixtures/write_to_original_file_with_globe/',
            src: '*.js',
            dest: 'tmp/write_to_original_file_with_globe/'
          }
        ]
      },
      write_to_original_file_to_check: {
        files: {
          'tmp/unformatted_write_to_original_file_to_check.js':
            'test/fixtures/write_to_original_file/unformatted.js',
          'tmp/formatted_write_to_original_file_to_check.js':
            'test/expected/write_to_original_file/formatted.js'
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-exec');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', [
    'clean',
    'copy',
    'lebab',
    'nodeunit'
  ]);

  // By default, run all tests.
  grunt.registerTask('default', ['test']);
}

module.exports = tasks;
