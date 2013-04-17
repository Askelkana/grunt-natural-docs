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
			for (var i in options) {
				settings[i] = that.data.hasOwnProperty(i) ? that.data[i] : options[i];
			}
			return settings;
		})();
		var command = [ settings.bin ];
		addProject();
		addInputs();
		addExcludes();
		addOutput();
		addStyles();
		addFlags();
		exec(command.join(' '), function (error, stdout) {
			grunt.log.write(stdout);
			if (error !== null) {
				grunt.log.error('\n#' + command + '\n' + error);
			}
			done();
		});

		function addExcludes() {
			if (!(settings.excludes instanceof Array)) {
				grunt.log.error(that.name + ': illegal excludes.');
				return;
			}
			for (var i in settings.excludes) {
				command.push('-xi', complete(settings.src, settings.excludes[i]));
			}
		}

		function addInputs() {
			if (!(settings.inputs instanceof Array)) {
				grunt.log.error(that.name + ': illegal inputs.');
				return;
			}
			if (settings.inputs.length == 0) {
				grunt.log.error(that.name + ': no inputs specified.');
				return;
			}
			for (var i in settings.inputs) {
				command.push('-i', complete(settings.src, settings.inputs[i]));
			}
		}

		function addFlags() {
			if (!(settings.flags instanceof Array)) {
				grunt.log.error(that.name + ': illegal flags.');
				return;
			}
			command = command.concat(settings.flags);
		}

		function addOutput() {
			if (typeof settings.output != 'string') {
				grunt.log.error(that.name + ': illegal or missing output.');
				return;
			}
			command.push('-o', (settings.format), complete(settings.src, settings.output));
		}

		function addProject() {
			command.push('-p', complete(options.projects, settings.project));
		}

		function addStyles() {
			command.push('-s');
			command = command.concat(settings.styles);
		}

		function complete(root, addition) {
			if (root && addition.indexOf('/') == 0) {
				return root + addition;
			} else {
				return addition;
			}
		}
	});
};
