import React, {PropTypes} from 'react'
import {Menu, Icon ,Button} from 'antd'
import { connect } from 'dva';
import {Link,hashHistory} from 'dva/router'
import styles from './main.less'
import config from '../../../utils/config'
import storage from '../../../utils/browserData';
const SubMenu = Menu.SubMenu

function Header({location,dispatch}) {
  function handleClickMenu(item){
    if(item.key=='logout'){
      dispatch({type:'appModel/logout',payload:{userId:storage.userId}})
      localStorage.clear()
      hashHistory.push('/login')
    }
    if(item.key=='github'){
      window.open(config.github,'_blank')
    }
  }

  const menuStyle = {
    float:'right',
    fontSize:'18px',
    width:100,
    textAlign: 'center'
  }

  return (
    <div className={styles.header} style={{paddingRight:45}}>
      <Menu className="header-menu" mode="horizontal"  onClick={handleClickMenu}>
          <Menu.Item key="goBack">
            <Link to="/home"><Icon type="left" />返回</Link>
          </Menu.Item>
          <Menu.Item key="github" style={menuStyle}>
            <Icon type="github" size="lg"/>
          </Menu.Item>
          <Menu.Item key="mail" style={menuStyle}>
            <a href={'mailto:'+config.mail}><Icon type="mail" size="lg"/></a>
          </Menu.Item>
        <SubMenu style={{
          float: 'right'
        }} title={< span > <Icon type="user"/>{storage.nickName}< /span>}>
          <Menu.Item key="logout">
            <Icon type="poweroff"/>注销
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  )
}

Header.propTypes = {
  location: PropTypes.object
}

function mapStateToProps({ appModel }) {
  return { appModel }
}
export default connect(mapStateToProps)(Header)
