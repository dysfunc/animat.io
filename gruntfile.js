'use strict';

module.exports = function(grunt){

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({
    yeoman: {
      // configurable paths
      app: 'example',
      src: 'src',
      dist: 'dist'
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['<%= yeoman.src %>/{,*/}*.js'],
        tasks: ['copy:src'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/*.html',
          '<%= yeoman.app %>/dist/**/*.css',
          '<%= yeoman.app %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 8000,
        hostname: 'localhost',
        livereload: 35729,
      },
      livereload: {
        options: {
          open: true,
          base: [
            '<%= yeoman.app %>'
          ]
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.src %>/**/*.js'
      ]
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.dist %>'
          ]
        }]
      }
    },

    copy: {
      src: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.src %>',
          dest: '<%= yeoman.app %>/js',
          src: [
            '**'
          ]
        }]
      },
    },

    concat: {
      dist: {
        src: [
          '<%= yeoman.src %>/core.js',
          '<%= yeoman.src %>/animate.js',
          '<%= yeoman.src %>/animations.js',
          '<%= yeoman.src %>/transform.js'
        ],
        dest: '<%= yeoman.dist %>/animatio.js'
      }
    },

    uglify: {
      options: {
        compress: true,
        mangle: true,
      },
      animatio: {
        files: {
          'dist/animatio.min.js': ['dist/animatio.js']
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'example'
      },
      src: ['**']
    }
  });

  grunt.registerTask('build', [
    'clean',
    'concat',
    'uglify:animatio',
    'copy:src',
    'connect:livereload'
  ]);

  grunt.registerTask('default', [
    'build',
    'watch'
  ]);

  grunt.registerTask('publish', [
    'build',
    'gh-pages'
  ]);
};
