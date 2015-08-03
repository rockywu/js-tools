module.exports = function(grunt) {

  var sources = [
    'src/intro.js',
    'src/pagination.js',
    'src/outro.js'
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dest_path : "dest/",
    output : {
      concat : '<%= dest_path %>pagination.js',
      uglify : '<%= dest_path %>pagination.min.js',
    },
    concat : {
      options : {
          banner : ''
      },
      build : {
        src : sources,
        dest : '<%= output.concat %>'
      }
    },
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