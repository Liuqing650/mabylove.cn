import React from 'react';
import { Row, Col,Card } from 'antd';
import styles from './mySelfStyle.less';	

const myselfHeader = () => {
	return (
		<div>
			<Row>
				<Col span={4} offset={4}>
				 	<Card>
					    <p>Card content</p>
					    <p>Card content</p>
					    <p>Card content</p>
					</Card>
				</Col>
				<Col span={4}>
				 	<Card>
					    <p>Card content</p>
					    <p>Card content</p>
					    <p>Card content</p>
					</Card>
				</Col>
				<Col span={4}>
				 	<Card>
					    <p>Card content</p>
					    <p>Card content</p>
					    <p>Card content</p>
					</Card>
				</Col>
				<Col span={4}>
				 	<Card>
					    <p>Card content</p>
					    <p>Card content</p>
					    <p>Card content</p>
					</Card>
				</Col>
			</Row>
		</div>
	);
}

export default myselfHeader;
