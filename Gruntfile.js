module.exports = function(grunt) {

  var configure = grunt.file.readJSON("configure.json");

  var all_files = configure.tools_source.concat(configure.upload_source);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    dest_path : "dist/",
    output : {
      concat_tools : '<%= dest_path %>' + configure.output_file.js_tools,
      uglify_tools : '<%= dest_path %>' + configure.output_file.js_tools_min,
      concat_image_upload : '<%= dest_path %>' + configure.output_file.image_upload,
      uglify_image_upload : '<%= dest_path %>' + configure.output_file.image_upload_min,
    },
    concat : {
      options : {
          banner : ''
      },
      build_tools : {
        src : configure.tools_source,
        dest : '<%= output.concat_tools %>'
      },
      build_upload : {
        src : configure.upload_source,
        dest : '<%= output.concat_image_upload %>'
      }
    },
    uglify: {
      options: {
        banner: '/*! \n * <%= pkg.name %> \n * <%= pkg.description %>  \n * <%= grunt.template.today("yyyy-mm-dd") %> \n */\n'
      },
      build_tools: {
        src: '<%= output.concat_tools %>',
        dest: '<%= output.uglify_tools %>'
      },
      build_upload : {
        options: {
          banner: '/*! \n * compress.image.upload.js \n * 压缩图片上传 \n * <%= grunt.template.today("yyyy-mm-dd") %> \n */\n',
          mangle: false, //不混淆变量名
          preserveComments: false, //all 不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
          footer:'\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
        },
        src: '<%= output.concat_image_upload %>',
        dest: '<%= output.uglify_image_upload %>'
      }
    },
    watch: {
      scripts: {
        files: all_files,
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
