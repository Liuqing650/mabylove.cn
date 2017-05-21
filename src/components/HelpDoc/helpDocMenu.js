import React from 'react';
import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;

function helpDocMenu({
	onOpenChange,
	helpDocList,
	onClick,
	defaultOpenKeys,
}) {

	function fn(data, pid) {
      var result = [], temp;
      for (var i = 0; i < data.length; i++) {
          if (data[i].pid == pid) {
              var obj = data[i];
              temp = fn(data, data[i].id);
              if (temp.length > 0) {
                  obj.children = temp;
              }
              result.push(obj);
          }
      }
      return result;
    }
  const helpData = fn(helpDocList,0);
  console.log('helpData===>',helpData)
  const loop = helpData => helpData.map((item) => {
  	if (item.children) {
      	return (<SubMenu key={item.id} pid = {item.pid} title={<span>{item.value}</span>}></SubMenu>)
    } 
     return (<Menu.Item key={item.id} pid = {item.pid}>{item.value}</Menu.Item>)
  })
    
    
  	const helpMenu = loop(helpData);
	return (
		<Menu
	        mode="inline"
	        style={{ width: 240 }}
	        onOpenChange={onOpenChange}
	        onClick={onClick}
	        defaultOpenKeys={defaultOpenKeys}
	    >
	        {helpMenu}
      </Menu>
	)
}

export default helpDocMenu;