import React from 'react';
import styles from './allotTaskStyle.less';
import { Row, Col, Button ,Icon,Modal} from 'antd';

const allotTaskTool = ({

}) => {
function message() {
  Modal.info({
    title: '短信通知成功!',
    content: (
    <div></div>
    ),
    onOk() {},
  });
}
function mail() {
  Modal.info({
    title: '邮件发送成功!',
    content: (
    <div></div>
    ),
    onOk() {},
  });
}
	return (
		<div>
			<div className={styles.titleWrapper}>
				<h2 className={styles.titleStyle}>操作区</h2>
			</div>
			<Row>
				<Col span={6} style={{paddingLeft:10,paddingTop:30}}>		
					<Button type="primary" icon="message" style={{marginRight:10}} onClick={message}>短信通知</Button>
					<Button type="primary" icon="mail" onClick={mail}>邮件通知</Button>		
				</Col>
				<Col span={16}></Col>
		    </Row>
		</div>
	)
}

export default allotTaskTool;