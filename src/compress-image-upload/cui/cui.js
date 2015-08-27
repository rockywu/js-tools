/**
 * 多图压缩上传功能，兼容ios&android,同是可以用作多文件上传
 * 手机端建议使用单图文操作
 * compress.images.upload
 * @package src/
 * @description html5压缩上传
 * @author rockywu wjl19890427@hotmail.com
 * @site www.rockywu.com
 */
;(function() {

  "use strict";

  var win = this;
  var Tools = {
    rotate : function (cvt, image, w, h, orientation){
      var cvtg;
      if(orientation == 6 || orientation == 8){
        cvt.width = h;
        cvt.height = w;
      }else{
        cvt.width = w;
        cvt.height = h;
      }
      var cvtg = cvt.getContext("2d");
      if(orientation == 6){
        cvtg.translate(h, 0);
        cvtg.rotate(Math.PI / 2);
      }else if(orientation == 8){
        cvtg.translate(0,w);
        cvtg.rotate(270*Math.PI/180 );
      }else if(orientation == 3){
        cvtg.translate(w,h);
        cvtg.rotate(Math.PI );
      }
      cvtg.drawImage(image, 0, 0);
    }
  }

  function cui(opt) {
    //是否多图上传，默认为false
    this.isMultiple = opt.isMultiple || false; //是否多图上传
    this.imageQuality = opt.imageQuality || 100; //图片压缩质量
    this.httpBoundary = opt.httpBoundary || "--image-someboundary--"; //默认文件上传分割线
    this.async = opt.async || true; //是否使用一部传输
    this.actionNameSpace = {};
    this.currentAction = "";
  }

  /*
   * 报错提示
   */
  cui.prototype.message = function(message) {
    var act = this.getAction(this.currentAction);
    if(typeof act.message == 'function') {
      act.message.call(this, message);
    } else {
      console.log(message);
    }
  }

  /*
   * 创建配置操作命名空间
   * 用于同一页面进行操作实现
   */
  cui.prototype.getAction = function(action) {
    if(typeof this.actionNameSpace[action] == 'object') {
      return this.actionNameSpace[action];
    } else {
      return null;
    }
  }

  /*
   * 设置操作行为
   */
  cui.prototype.setAction = function(action, configure) {
    if(typeof action == 'string' && typeof configure == 'object') {
      this.actionNameSpace[action] = configure;
      return true;
    } else {
      return false;
    }
  }

  /*
   * 提交发送给服务器
   */
  cui.prototype.submit = function(action) { }

  /*
   * 图片进行压缩
   * 返回压缩的base64码
   */
  cui.prototype.compress = function(file, maxWidth, maxHeight) { 

  }

  /*
   * 图片检查是否重复
   */
  cui.prototype.checkRepeat = function() {

  }

  var isMobile = {
    Android: function() {
      return /Android/i.test(navigator.userAgent);
    },
    IOS: function() {
      return /iPhone|iPad|iPod/i.test(navigator.userAgent);
    }
  }

  /*
   * 图片压缩
   * @param object file //file对象
   */
  function compress(file, maxWidth, maxHeight, callback) {
    var base64 = '';
    var reader = new FileReader();
    var img = document.createElement('img');
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      img.src = this.result;
      base64 = this.result;
    }
    img.onload = function() {
      var width = 0;
      var height = 0;
      var mpImg = new MegaPixImage(file);
      var orientation = 1;//照片方向值
      var tmpImg = document.createElement('img');
      if(img.width < maxWidth && img.height < maxHeight) {
        width = img.width;
        height = img.height;
      } else {
        if(img.width / maxWidth > img.height / maxHeight ) {
          width = maxWidth;
          height = parseInt(img.height * maxWidth / img.width);
        } else {
          width = parseInt(img.width * maxHeight / img.height);
          height = maxHeight;
        }
      }
      //进行图片压缩
      if(isMobile.IOS()){
        mpImg.render(tmpImg, {maxWidth: width, maxHeight: height });
        EXIF.getData(file, function() {
          orientation=EXIF.getTag(this,'Orientation');
          tmpImg.onload=function(){
            var tmpCvs = document.createElement("canvas");
            var tmpCtx = tmpCvs.getContext('2d');
            var data = '';
            Tools.rotate(tmpCvs, tmpImg, width, height, orientation);
            if(orientation == 6 || orientation == 8){
                data = tmpCtx.getImageData(0, 0, height, width);
            } else {
                data = tmpCtx.getImageData(0, 0, width, height);
            }
            typeof callback == 'function' && callback(data);
          }
        });
      }else{
        var cvs = document.createElement("canvas");
        var ctx = cvs.getContext('2d');
        cvs.width = width;
        cvs.height = height;
        ctx.drawImage(img,0,0,width,height);
        tmpImg.src = cvs.toDataURL("image/jpeg",0.4);
        tmpImg.onload = function(){
          EXIF.getData(file, function() {
            orientation=EXIF.getTag(this,'Orientation');
            var tmpCvs = document.createElement("canvas");
            var tmpCtx = tmpCvs.getContext('2d');
            var data = '';
            Tools.rotate(tmpCvs, tmpImg, width, height, orientation);
            if(orientation == 6 || orientation == 8){
              data = tmpCtx.getImageData(0, 0, height, width);
            } else {
              data = tmpCtx.getImageData(0, 0, width, height);
            }
            typeof callback == 'function' && callback(data);
          });
        }
      }
    }
  }

  window.compress = compress;
}).call(this);
