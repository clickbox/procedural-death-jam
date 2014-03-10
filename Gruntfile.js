module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		connect: {
			server: {
				options: {
					hostname: 'localhost',
					base: ['./src', './bower_components'],
					livereload: true,
					open: true
				}
			}
		},
		watch: {
			livereload: {
				files: ['src/**/*.{js,html,css,png,jpeg,jpg,gif}'],
				options: {
					livereload: true
				}
			}
		},
		clean: {
			dist: {
				files: [{
					dot: true,
					src: ['.tmp', 'dist']
				}]
			}
		},
		useminPrepare: {
			dist: {
				html: 'index.html',
				options: {
					root: 'src',
					dest: 'dist'
				}
			}
		},
		copy: {
			dist: {
				expand: true,
				dot: true,
				cwd: 'src',
				dest: 'dist',
				src: ['assets/{,*/}*.{png,mp3,ogg,json}', 'css/{,*/}*.css']
			}
		},
		usemin: {
			html: ['dist/{,*/}*.html']
		}
	});

	grunt.registerTask('serve', ['connect','watch']);

	grunt.registerTask('build', ['clean:dist', 'useminPrepare', 'copy', 'usemin']);
}
