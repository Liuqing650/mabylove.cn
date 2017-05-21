import React from 'react';
import { connect } from 'dva';
import { Layout,Row, Col } from 'antd';
import AllotTaskLeft from '../../components/Task/AllotTask/allotTaskLeft';
import AllotTaskTop from '../../components/Task/AllotTask/allotTaskTop';
import AllotTaskTool from '../../components/Task/AllotTask/allotTaskTool';
import AllotTaskGroup from '../../components/Task/AllotTask/allotTaskGroup';
import styles from './TaskManageStyle.less';
const { Sider, Content } = Layout;
function AllotTask({dispatch,location,allotTask}) {
	const { 
		loading, taskLoading, detailLoading, groupLoading, addUserLoading,
		taskList, taskInfo, taskDetail, groupUserList,groupList,
		indeterminate, checkAll, checkedList,taskId,groupId,
	} = allotTask;

	const AllotTaskLeftProps = {
		loading:loading,
		taskList: taskList,
		onSelectChange(obj) {
			dispatch({
				type:'allotTask/onQueryDetail',
				payload: obj,
			})
		}
	};
	const AllotTaskTopProps = {
		taskLoading: taskLoading,
		detailLoading: detailLoading,
		taskInfo: taskInfo,
		taskDetail: taskDetail,
		onChangeDetail(obj) {
			dispatch({
				type:'allotTask/changeDtail',
				payload: obj,
			})
		}
	};
	const AllotTaskToolProps = { };
	const AllotTaskGroupProps = { 
		addUserLoading: addUserLoading,
		groupLoading: groupLoading,
		taskId: taskId,
		groupId: groupId,
		groupUserList: groupUserList,
		groupList: groupList,
		indeterminate: indeterminate,
		checkAll: checkAll,
		checkedList: checkedList,
		onCheckAllChange(e) {
			dispatch({
				type:'allotTask/checkAllChange',
				payload: e.target.checked,
			})
		},
		onCheckdUser(checkedList) {
			dispatch({
				type:'allotTask/checkdUser',
				payload: checkedList,
			})
		},
		onSelectGroupChange(groupId) {
			dispatch({
				type:'allotTask/setTaskInfo',
				payload: groupId,
			})
		},
		onAddUser(obj) {
			dispatch({
				type:'allotTask/addUserToTask',
				payload: obj,
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
		        	<AllotTaskLeft {...AllotTaskLeftProps}/>
		        </Sider>
		        <Content>
					<Row className={styles.allotTaskTopStyle}>
						<Col span={24}>
							<AllotTaskTop {...AllotTaskTopProps}/>
						</Col>
					</Row>
					<Row className={styles.allotTaskToolStyle}>
						<Col span={24}>
							<AllotTaskTool {...AllotTaskToolProps}/>
						</Col>
					</Row>
					<Row className={styles.allotTaskGroupStyle}>
						<Col span={24}>
							<AllotTaskGroup {...AllotTaskGroupProps}/>
						</Col>
					</Row>
		        </Content>
		    </Layout>
			
		</div>
	)
}

export default connect(({allotTask}) => ({allotTask}))(AllotTask);