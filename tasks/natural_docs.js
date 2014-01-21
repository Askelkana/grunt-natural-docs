/*
 * grunt-natural-docs
 * https://github.com/Askelkana/natural_docs
 *
 * Copyright (c) 2013 askelkana
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
	grunt.registerMultiTask('natural_docs', 'Builds NaturalDocs-based documentation.', function () {
		var options = this.options({
			bin:      '/usr/lib/bin/natural_docs',
			excludes: [],
			flags:    [ '-r', '-oft' ],
			format:   'HTML',
			inputs:   [],
			output:   '/docs',
			project:  '',
			projects: '/usr/lib/bin/natural_docs/projects',
			src:      '',
			styles:   [ 'Default' ]
		});
		var that = this;
		var done = this.async();
		var exec = require('child_process').exec;
		var settings = (function () {
			var settings = {};
			Object.keys(options).forEach(function (option) {
				settings[option] = that.data.hasOwnProperty(option) ? that.data[option] : options[option];
			});
			return settings;
		})();
		var command = [ settings.bin ];
		addProject();
		addInputs();
		addExcludes();
		addOutput();
		addStyles();
		addFlags();
		command = command.join(' ');
		exec(command, function (error, stdout) {
			grunt.log.write(stdout);
			if (error !== null) {
				grunt.log.error('\n#' + command + '\n' + error);
			}
			done();
		});

		function addExcludes() {
			if (!(settings.excludes instanceof Array)) {
				grunt.log.error(that.name + ': illegal excludes.');
			} else {
				settings.excludes.forEach(function (exclude) {
					command.push('-xi', complete(settings.src, exclude));
				});
			}
		}

		function addInputs() {
			if (!(settings.inputs instanceof Array)) {
				grunt.log.error(that.name + ': illegal inputs.');
			} else if (settings.inputs.length == 0) {
				grunt.log.error(that.name + ': no inputs specified.');
			} else {
				settings.inputs.forEach(function (input) {
					command.push('-i', complete(settings.src, input));
				});
			}
		}

		function addFlags() {
			if (!(settings.flags instanceof Array)) {
				grunt.log.error(that.name + ': illegal flags.');
			} else {
				command = command.concat(settings.flags);
			}
		}

		function addOutput() {
			if (typeof settings.output != 'string') {
				grunt.log.error(that.name + ': illegal or missing output.');
			} else {
				command.push('-o', (settings.format), complete(settings.src, settings.output));
			}
		}

		function addProject() {
			command.push('-p', complete(options.projects, settings.project));
		}

		function addStyles() {
			command.push('-s');
			command = command.concat(settings.styles);
		}

		function complete(root, addition) {
			return root && addition.indexOf('/') == 0 ? root + addition : addition;
		}
	});
};
