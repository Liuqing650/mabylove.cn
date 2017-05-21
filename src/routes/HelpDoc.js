import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import HelpDocMenu from '../components/HelpDoc/helpDocMenu';
import HelpDocContent from '../components/HelpDoc/helpDocContent';
import styles from './HelpDocStyle.less';

function HelpDoc({dispatch,location,helpDoc}) {
	const { helpDocList,helpDocContent,} = helpDoc;
	const helpDocMenuProps = { 
		helpDocList: helpDocList,
		onClick(value) {
			// console.log('onClick========>',value);
		},
		onOpenChange(value) {
			console.log('onOpenChange========>',value);
		}
	}

	const helpDocContentProps = { 
		helpDocContent: helpDocContent,
	}

	return (
		 <Row>
		 	<Col span={4} offset={2}>
		 		<HelpDocMenu {...helpDocMenuProps}/>
		 	</Col>
		 	<Col span={13}>
		 		<div className={styles.content}>
		 			<HelpDocContent { ...helpDocContentProps } />
				</div>
		 	</Col>
		 </Row>
	)
}

export default connect(({helpDoc}) => ({helpDoc}))(HelpDoc);