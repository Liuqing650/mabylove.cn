import React from 'react';
import { connect } from 'dva';
import { Layout,Row, Col } from 'antd';
import ExecuteTaskList from '../../components/Task/ExecuteTask/executeTaskList';
import ExecuteTaskLeft from '../../components/Task/ExecuteTask/executeTaskLeft';
import ExecuteTaskModal from '../../components/Task/ExecuteTask/executeTaskModal';
import styles from './TaskManageStyle.less';

const { Sider, Content } = Layout;
function ExecuteTask({dispatch,location,executeTask}) {
	const { 
		loading,taskList,taskInfo,detailList,defaultSelectTask,
		isRead,
		visible,submitData,
	} = executeTask;

	const ExecuteTaskLeftProps = { 
		loading:loading,
		defaultSelectTask: defaultSelectTask,
		taskList: taskList,
		onSelectChange(obj) {
			dispatch({
				type:'executeTask/queryDetail',
				payload: obj,
			})
		}
	};

	const ExecuteTaskListProps = {
		taskInfo: taskInfo,
		detailList: detailList,
		isRead: isRead,
		onReadChange(obj) {
			dispatch({
				type: 'executeTask/readChange',
				payload: obj,
			})
		},
		onShowModal(taskInfo) {
			dispatch({
				type: 'executeTask/showModal',
				payload: taskInfo,
			})
		},
		onTaskSubmitChange(obj) {
			dispatch({
				type: 'executeTask/taskCompleteSubmit',
				payload: obj,
			})
		},
		onDetailSubmitChange(obj) {
			dispatch({
				type: 'executeTask/detailCompleteSubmit',
				payload: obj,
			})
		}
	};

	const ExecuteTaskModalProps = {
		visible,
		taskInfo: taskInfo,
		submitData: submitData,
		onTaskSubmit(obj) {
			dispatch({
				type: 'executeTask/taskSubmit',
				payload: obj,
			})
		},
		onCancelModal() {
			dispatch({
				type: 'executeTask/hideModal',
			})
		}
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
		        	<ExecuteTaskLeft {...ExecuteTaskLeftProps}/>
		        </Sider>
		        <Content>
					<Row className={styles.allotTaskTopStyle}>
						<Col span={24}>
							<ExecuteTaskList {...ExecuteTaskListProps}/>
						</Col>
					</Row>
					<Row className={styles.allotTaskToolStyle}>
						<Col span={24}>
						</Col>
					</Row>
		        </Content>
		    </Layout>
		    <ExecuteTaskModal {...ExecuteTaskModalProps}/>
		</div>
	)
}

export default connect(({executeTask}) => ({executeTask}))(ExecuteTask);