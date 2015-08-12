module.exports = function(grunt) {

  var sources = [
    'src/core.js',
    'src/switcher.js',
    'src/pagination.js',
  ];

console.log(grunt.file.read('imageUpload.json'));
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //image_upload : grunt.file.readJSON('image-upload.json'),
    dest_path : "dist/",
    output : {
      concat : '<%= dest_path %>js.tools.js',
      uglify : '<%= dest_path %>js.tools.min.js',
    },
    concat : {
      options : {
          banner : ''
      },
      build : {
        src : sources,
        dest : '<%= output.concat %>'
      },
      build_upload : {
        src: [
            'src/compress-image-upload/cui.js',
            'src/compress-image-upload/android.js',
            'src/compress-image-upload/ios.js',
            'src/compress-image-upload/exif.js',
            'src/compress-image-upload/binaryajax.js'
        ],
        dest : 'dist/compress-image-upload.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! \n * <%= pkg.name %> \n * <%= pkg.description %>  \n * <%= grunt.template.today("yyyy-mm-dd") %> \n */\n'
      },
      build: {
        src: '<%= output.concat %>',
        dest: '<%= output.uglify %>'
      },
      build_upload : {
        options : {
        },
        files: {
          'dist/compress-image-upload.min.js' : [
            'src/compress-image-upload/cui.js',
            'src/compress-image-upload/android.js',
            'src/compress-image-upload/ios.js',
            'src/compress-image-upload/exif.js',
            'src/compress-image-upload/binaryajax.js'
          ]
        }
      }
      //build_upload : image_upload.uglify,
    },
    watch: {
      scripts: {
        files: sources,
        tasks: ['concat','uglify'],
        options: {
          interrupt: true,
        },
      },
      configFiles: {
        files: [ 'Gruntfile.js'],
        options: {
          reload: true
        }
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['concat', 'uglify', 'watch']);

};
