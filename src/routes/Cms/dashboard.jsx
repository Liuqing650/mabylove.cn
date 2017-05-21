import React, { PropTypes } from 'react'
import { Link } from 'dva/router'
import { Row, Col } from 'antd';
import usermm from '../../assets/usermm.png'
import storage from '../../utils/browserData';

function Dashboard() {
  return (
    <Row>
      <Col span={4}></Col>
      <Col span={16}> <div>
      <h1>{'Hello '+storage.username+'.'}</h1>
      <hr />
      <ul>
        <li>You can go to <Link to="/app/microapp">微应用</Link></li>
      </ul>
       <h2>欢迎来到用户管理中心</h2> 
    <img alt="" src={usermm}/>
    </div></Col>
      <Col span={4}></Col>
    </Row>
   
  
     

  )
}

Dashboard.propTypes = {
  location: PropTypes.object,
}

export default Dashboard
