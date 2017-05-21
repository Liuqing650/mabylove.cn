import React, {PropTypes} from 'react'
import {Menu, Icon,Switch} from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva';
import styles from './main.less'
import config from '../../../utils/config'
// import menu from '../../../utils/menu'
const getMenus = function (menuArray,parentPath){
  parentPath = parentPath || '/'
  return menuArray.map(item =>{
    if(!!item.child){
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon}/>: ''} {item.name}</span>}>
          {getMenus(item.child,parentPath + item.key + '/')}
        </Menu.SubMenu>
      )
    }else {
      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + item.key}>
            {item.icon ? <Icon type={item.icon}/>: ''}
            {item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
}

function Sider({location,dispatch,userManage,appModel}) {
  const {theme,switchColor}=userManage
  const {menuSelectedKeys,openKeys,menu}=appModel
  
  function changeTheme(){
    const obj = {};
    obj['theme'] = theme;
    if(theme=='dark'){
      obj.theme='light';
      obj.siderColor='#FFF';
      obj.switchColor='#FFF';
    }
    else{
      obj.theme='dark';
      obj.siderColor='#404040';
      obj.switchColor='#494949';
    }
    dispatch({
        type:'userManage/querySuccess',
        payload:{
            theme:obj.theme,
            siderColor:obj.siderColor,
            switchColor: obj.switchColor
        }
    })
  }
  return (
    <div>
        <div className={styles.logo}>
            <img src={config.logoIconSrc}/>
            <span style={{color:"grey"}}>Maby Love</span>
        </div>
        <Menu mode="inline" theme={theme} defaultSelectedKeys={menuSelectedKeys} defaultOpenKeys={openKeys}>
            {getMenus(menu)}
        </Menu>
            <div className={styles.switchtheme} style={{backgroundColor:`${switchColor}`}}>
                <span><Icon type="bulb" />切换主题</span>
            <Switch onChange={changeTheme} defaultChecked="黑" checkedChildren="黑" unCheckedChildren="白" />
        </div>
    </div>
  )
}

Sider.propTypes = {
  location: PropTypes.object
}

function mapStateToProps({ userManage,appModel}) {
  return { userManage,appModel }
}
export default connect(mapStateToProps)(Sider)

