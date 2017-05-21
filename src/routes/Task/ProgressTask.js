import React from 'react';
import { connect } from 'dva';
import { Layout,Row, Col } from 'antd';
import ProgressTaskContent from '../../components/Task/ProgressTask/progressTaskContent';
import ProgressTaskLeft from '../../components/Task/ProgressTask/progressTaskLeft';
import styles from './TaskManageStyle.less';

const { Sider, Content } = Layout;
function ProgressTask({dispatch,location,progressTask}) {
	const {
		loading, taskLoading,
		taskList,countData,reportData
	} = progressTask;

	const ProgressTaskLeftProps = { 
		loading:loading,
		taskList: taskList,
		onSelectChange(obj) {
			dispatch({
				type:'progressTask/queryReport',
				payload: obj,
			})
		}
	};

	const ProgressTaskContentProps = {
		countData: countData,
		reportData: reportData,
		taskLoading: taskLoading,
	 };

	return (
		<div>
			<Layout
				className={styles.allotTaskLayout}
			>
		        <Sider
		        	className={styles.allotTaskSider}
		        	style={{background:'#fff'}}
		        >
		        	<ProgressTaskLeft {...ProgressTaskLeftProps}/>
		        </Sider>
		        <Content>
					<Row className={styles.allotTaskTopStyle}>
						<Col span={24}>
							<ProgressTaskContent {...ProgressTaskContentProps}/>
						</Col>
					</Row>
					<Row className={styles.allotTaskToolStyle}>
						<Col span={24}>
						</Col>
					</Row>
		        </Content>
		    </Layout>
		</div>
	)
}

export default connect(({progressTask}) => ({progressTask}))(ProgressTask);