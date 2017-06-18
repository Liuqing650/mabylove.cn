// browserData
import React from 'react';


const storage = getStorage();

// 获取localStorage中的数据
function getStorage(){
	const obj={};
	obj['userId']=localStorage.getItem("userId")?localStorage.getItem("userId"):null;
	obj['avatar']=localStorage.getItem("avatar")?localStorage.getItem("avatar"):'http://img.mabylove.cn/defaultImg/headPic/001.png';
	obj['nickName']=localStorage.getItem("nickName")?localStorage.getItem("nickName"):null;
	obj['pk']=localStorage.getItem("pk")?localStorage.getItem("pk"):null;
	obj['isLogin']=localStorage.getItem("userId")?true:false;
	return obj;
}

export default storage;
// module.exports = storage;