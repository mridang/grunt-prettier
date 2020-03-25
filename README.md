## Getting Started
This plugin requires Grunt `~1.0.3`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-lebab --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-lebab');
```

## The "lebab" task

### Overview
In your project's Gruntfile, add a section named `lebab` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  lebab: {
    options: {
      // Task-specific options go here.
      progress: false // By default, a progress bar is not shown. You can opt into this behavior by passing true.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

All options you can see in [official Lebab repo](https://github.com/lebab/lebab#safe-transforms).

You can put `.lebabrc` near Gruntfile.js.
Options from `.lebabrc` merge with task config and default options in next order:
`[default config] < [task config] < [.lebabrc]`.

**You dont need to add path to config file to task definition!**

### Usage Examples

#### Default Options
In this example, the default options are specified like lebab-cli.

```js
grunt.initConfig({
  lebabrc: {
    files: {
      'dest/default_options': ['src/unformatted.js', 'src/another_unformatted.js']
    }
  }
});
```

#### Custom Options
In this example, custom options are used to transform indentation into tabs and use single quotes instead of double quotes.

```js
grunt.initConfig({
  prettier: {
    options: {
      singleQuote: true,
      useTabs: true
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    }
  }
});
```

#### Supported and tested "files" params
You can use following formats:

+ File to file - format source file and put formatted code to destination file.
```
files: {
  "dest/formatted.js": "src/unformatted.js"
}
```

+ Concat and format - concat all source files, **then** format and put to destination file. This format can be used with glob patterns.
```
files: {
  "dest/formatted.js": [
    "src/unformatted_1.js",
    "src/unformatted_2.js"
  ]
}
```

+ Hot formatting - overwrite src files with it formatted copy. Set `src` option instead of `files`. This format can be used with glob patterns.
```
files: {
  src: [
    "my-awesome-project/**.js",
    "!my-awesome-project/**.config.js"
  ]
}
```

#### Testing
To run unit tests
```grunt test```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
*0.1* - Initial release
