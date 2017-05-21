import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import CreateTask from '../../components/Task/NewTask/createTask';
import TaskList from '../../components/Task/NewTask/taskList';
import styles from './TaskStyle.less';

function NewTask({dispatch,location,newTask}) {
	const { 
		uuid ,user_id,
		startValue,endValue,endOpen,groupList,selectedGroup,
		detailData,taskData,detailLoading,taskLoading
	} = newTask;

	const CreateTaskProps = { 
		user_id: user_id,
		uuid:uuid,
		startValue:startValue,
		endValue:endValue,
		endOpen:endOpen,
		groupList: groupList,
		selectedGroup: selectedGroup,
		onTaskSubmit(obj) {
			dispatch({
				type:'newTask/addTask',
				payload: obj,
			})
		},
		onStartChange(value) {
			dispatch({
				type:'newTask/onStartChange',
				payload: value,
			})
		},
		onEndChange(value) {
			dispatch({
				type:'newTask/onEndChange',
				payload: value,
			})
		},
		handleStartOpenChange(open) {
			dispatch({
				type:'newTask/handleStartOpenChange',
				payload: open,
			})
		},
		handleEndOpenChange(open) {
			dispatch({
				type:'newTask/handleEndOpenChange',
				payload: open,
			})
		},
		handleGroupChange(value) {
			dispatch({
				type: 'newTask/onGroupChange',
				payload: value,
			})
		},
		onAddUUID() {
			dispatch({
				type:'newTask/addUUID',
			})
		}
	};
	const TaskListProps = {
		taskLoading,
		detailLoading,
		detailData:detailData,
		taskData: taskData,
		onQueryDetail(obj) {
			dispatch({
				type:'newTask/queryTaskDetail',
				payload: obj,
			})
		},
		onChangeDetail(obj) {
			dispatch({
				type:'newTask/changeDtail',
				payload: obj,
			})
		}
	};

	return (
		<div className={styles.taskWrapper}>
			<Row type="flex" justify="space-around" align="top">
				<Col span={6}>
					<CreateTask {...CreateTaskProps}/>
				</Col>
				<Col span={12}>
					<TaskList {...TaskListProps}/>
				</Col>
			</Row>
			
		</div>
	)
}

export default connect(({newTask}) => ({newTask}))(NewTask);