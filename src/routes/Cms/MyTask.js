import React, { PropTypes } from 'react'
import { Link } from 'dva/router'
import { Row, Col } from 'antd';
import TaskEcharts from '../../components/Cms/MyTask/taskEcharts';
function MyTask({location}) {
  return (
   <div>
   <Col span={3}></Col>
   <Col span={18}>
   <TaskEcharts/>
   </Col>
   <Col span={3}></Col>
   </div>
  )
}

export default MyTask
