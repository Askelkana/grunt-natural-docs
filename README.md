# grunt-natural-docs

> Builds NaturalDocs-based documentation.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-natural-docs --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-natural-docs');
```

## The "natural_docs" multitask

### Overview
In your project's Gruntfile, add a section named `natural_docs` to the data object passed into `grunt.initConfig()`.

	grunt.initConfig({
		natural_docs: {
			options: {
				// Task-specific options go here.
			},
			your_target: {
				// Target-specific file lists and/or options go here.
	 		},
		},
	})


### Options

In this plugin, all settings may be specified as options. This makes it convenient to apply common settings for all tasks in the common `options` object. It is not necessary to have to include a target-specific `options` object. Instead, target-specific settings may be specified in the normal manner. These will override any options (task- or target-specific) given. In other words:

	grunt.initConfig({
		natural_docs: {
			options: {
				src: 'As usual, this value is "default" for all targets'
			},
			your_target: {
				options: {
					src: 'This value will override the above task-level default'
				},
				src: 'And this will override them all.'
	 		},
		},
	})

And so, on to the options...

#### options.bin
Type: `String`

Default value: `/usr/lib/bin/natural_docs`

The NaturalDocs executable.


#### options.excludes
Type: `Array of Strings`

Default value: `[]`

Identifies the source folders to be excluded (if starts with a `/`, assumed to reside under `options.src`).


#### options.flags
Type: `Array of Strings`

Default value: `[ '-r', '-oft' ]`

Additional flags.


#### options.format
Type: `String`

Default value: `HTML`

The output format.


#### options.inputs
Type: `Array of Strings`

Default value: `[]`

Identifies the source folders (if starts with a `/`, assumed to reside under `options.src`).


#### options.output
Type: `String`

Default value: `/docs`

Identifies the output folder (if starts with a `/`, assumed to reside under `options.src` - and you'll want to exclude it).


#### options.project
Type: `String`

Default value: ``

Identifies the project folder (if starts with a `/`, assumed to reside under `options.project`).


#### options.projects
Type: `String`

Default value: `/usr/lib/bin/natural_docs/projects`

The folder under which the various NaturalDocs project files are stored. See `options.project`.


#### options.src
Type: `String`

Default value: ``

The source files root folder.


#### options.styles
Type: `Array of Strings`

Default value: `[ 'Default' ]`

Identifies the output folder (if starts with a `/`, assumed to reside under `options.src` - and you'll want to exclude it).


### Usage Examples

	grunt.initConfig({
		natural_docs: {
			options:    {
				bin:      'C:/path/to/NaturalDocs/NaturalDocs.bat',
				projects: 'C:/path/to/NaturalDocs/projects'
			},
			my_project:     {
				src:      'C:/path/to/my_project/src',
				project:  '/my_project',
				inputs:   [
					'/js', '/less', '/php'
				],
				excludes: [
					'/js/tests', '/php/tests', '/docs'
				],
				styles:   [ 'Default', 'MyProjectStyles' ]
			},
	})

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
