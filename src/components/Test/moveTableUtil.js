import React from 'react';
/*
需要获取的对象move对象，
返回一个对象
*/

class Bar {
  setUp() {
    return 200;
  }

  move(index) {
  	return index+10000;
  }
}
// 定义需要的常量
const COMMOND = {
  	LEFT: 'left',
	RIGHT: 'right',
};
const moveTableUtil = {
	key:2,
	obj:{test:'aa'},
	setUp,
	fuC,
};
function setUp() {
	return 1+1;
}
function fuC(a) {
	if(a>2) {
		var b = new Bar();
		moveTableUtil.key=b.setUp();
	}
	return 1+a;
}
export default moveTableUtil;