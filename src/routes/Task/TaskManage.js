import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import TaskManageContent from '../../components/Task/TaskManage/taskManageContent';
import styles from './TaskManageStyle.less';




function TaskManage({dispatch,location,taskManage}) {
	const { taskDataList,taskDataContent,} = taskManage;
	const taskManageMenuProps = { 
		taskDataList: taskDataList,
		onClick(value) {
			// console.log('onClick========>',value);
		},
		onOpenChange(value) {
			console.log('onOpenChange========>',value);
		}
	}

	const taskManageContentProps = { 
		taskDataContent: taskDataContent,
	}
	return (
		<div className={styles.taskWrapper}>
	 		<div className={styles.content}>
	 			<TaskManageContent { ...taskManageContentProps } />
			</div>
		</div>
	)
}

export default connect(({taskManage}) => ({taskManage}))(TaskManage);