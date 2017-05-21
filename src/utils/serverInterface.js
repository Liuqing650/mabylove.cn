// serverInterface.js
import config from './config'
var debug = true;

var urlData =  {
  img:config.host+'/upload/uploadImage',
  file:config.host+'/upload/uploadFile',
  music:config.host+'/upload/uploadMusic',
  voice:config.host+'/upload/uploadVoice',
  video:config.host+'/upload/uploadVideo',
};

if(debug){
	urlData.img=config.host+'/upload/uploadImage';
	urlData.file=config.host+'/upload/uploadFile';
	urlData.voice=config.host+'/upload/uploadVoice';
	urlData.video=config.host+'/upload/uploadVideo';
}

module.exports = urlData