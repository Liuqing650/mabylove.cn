var debug = false;

var config =  {
  name: '帷中暮色',
  footerText: '帷中暮色 © 2016-12 Maby love 人生纵此一别,天涯共此明月',
  logoSrc:'http://123.207.100.248/mabylove/res/images/webpicture/logo500.png',
  logoIconSrc:'http://img.mabylove.cn/rootImg/logo/logoP100.png',
  logoText:'',
  needLogin:true,
  github:'https://github.com/Liuqing650',
  mail:'mabyloveweb@163.com',
  host:window.__dmp_cofig.host
};

if(debug){
	config.host = 'http://localhost:8081';
}

module.exports = config