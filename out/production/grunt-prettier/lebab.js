/*
 * grunt-lebab
 * https://github.com/mridang/grunt-lebab
 *
 * Copyright (c) 2020 Mridang Agarwalla
 * Licensed under the MIT license.
 */

import ProgressBar from "progress";
import fs from "fs";
import path from "path";
import {transform} from 'lebab';

function lebabTask(grunt) {
  grunt.registerMultiTask('lebab', 'Lebab plugin for Grunt', function() {
    let options = this.options({
      configFile: '.lebabrc',
    });

    const progress = options.progress;
    delete options.progress;

    // If .lebabrc file exists, load it and override existing options
    let lebabrcPath = path.resolve() + path.sep + options.configFile;
    if (fs.existsSync(lebabrcPath)) {
      grunt.verbose.writeln(`Using options from ${options.configFile}`);
      let lebabrcOptions;
      if (options.configFile.endsWith('.js')) {
        lebabrcOptions = require(options.configFile);
      } else {
        lebabrcOptions = grunt.file.readYAML(options.configFile);
      }
      options = Object.assign({}, options, lebabrcOptions);
    }
    delete options.configFile;

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Check specified files.
      let codeFiles = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      });

      let bar;
      if (progress) {
        bar = new ProgressBar(':bar / :percent complete, ETA: :eta second(s)', {
          total: codeFiles.length,
          width: 30
        });
      }

      let formattedCode, unformattedCode;

      if (typeof f.dest === 'undefined') {
        let checkStatus = true;
        // If f.dest is undefined, then write formatted code to original files.
        codeFiles.map(function(filepath) {
          unformattedCode = grunt.file.read(filepath);
          formattedCode = unformattedCode;
          grunt.file.write(filepath, formattedCode);

          if (progress) {
            bar.tick();
          } else {
            grunt.log.writeln('Lebabify file "' + filepath + '".');
          }
        });

        if (!checkStatus) {
          grunt.fail.warn('Some files are not lebabified');
        }
      } else {
        // Else concat files and write to destination file.
        unformattedCode = codeFiles.map(function(filepath) {
          return grunt.file.read(filepath);
        });

        formattedCode = unformattedCode;
        grunt.file.write(f.dest, formattedCode);
        if (progress) {
          bar.tick();
        } else {
          grunt.log.writeln('Lebabify file "' + f.dest + '".');
        }
      }
    });
  });
}

module.exports = lebabTask;
