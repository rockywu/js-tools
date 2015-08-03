module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    src_path : "src/",
    dest_path : "dest/",
    sources : [
      '<%= src_path %>intro.js',
      '<%= src_path %>pagination.js',
      '<%= src_path %>outro.js'
    ],
    output : {
      concat : '<%= dest_path %>pagination.js',
      uglify : '<%= dest_path %>pagination.min.js',
    },
    concat : {
      options : {
          banner : ''
      },
      build : {
        src : '<% sources %>',
        dest : '<%= output.concat %>'
      }
    }
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= output.concat %>',
        dest: '<%= output.uglify %>'
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['concat', 'uglify']);

};