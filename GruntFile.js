module.exports = function(grunt)
{
  grunt.initConfig(
    {
      pkg: grunt.file.readJSON('./package.json'),
      browserify: {
        options: {
          browserifyOptions: {
            debug: true
          }
        },
        js: {
          files: {
            '<%= pkg.name %>.min.js': 'app/main.js'
          },
            options: {
              plugin: [['minifyify', {output: '<%= pkg.name %>.map',
            	  						map: '<%= pkg.name %>.map'}]]
            }
        }
      },
      less: {
        development: {
          options: {
            paths: ["./"]
          },
          files: {
            "assets/css/<%= pkg.name %>.css": "<%= pkg.name %>.less"
          }
        },
      },
      watch: {
        files: ['app/**/*.js',
                'app/**/*.less',
                "<%= pkg.name %>.less",
              ],
        tasks: ['default'],
        options: {
          livereload: true
        }
      }
    }
  );

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-serve');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default',
    [
    'browserify',
    'less',
    'watch'
  ]);


};
