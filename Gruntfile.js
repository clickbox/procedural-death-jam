module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		"connect": {
			server: {
					options: {
						hostname: 'localhost',
						base: ['./src', './bower_components'],
						livereload: true,
						open: true
					}
			}
		},
		"watch": {
			livereload: {
				files: ['src/**/*.{js,html,css,png,jpeg,jpg,gif}'],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.registerTask('serve', ['connect','watch']);
}
