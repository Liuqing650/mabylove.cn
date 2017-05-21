import React from 'react';
import { connect } from 'dva';
import UpdateLogList from './../components/UpdateLog/updateLogList';
import UpdateLogModal from './../components/UpdateLog/updateLogModal';
import styles from './contentStyle.less';

function UpdateLog({dispatch,location,updateLog}) {
	const { 
		loading,
		updateLogList,defaultTabKey,
		logData,visible,editLoading,
	} = updateLog;

	const updateLogListProps = {
		loading:loading,
		list:updateLogList,
		defaultTabKey: defaultTabKey,
		onEdit() {
			dispatch({
				type: 'updateLog/showModal',
			})
		},
	}

	const updateLogModalProps = {
		item: logData,
		visible: visible,
		title: "更新日志信息",
		editLoading: editLoading,
		onSubmit(data) {
			dispatch({
				type: 'updateLog/add',
				payload: data,
			})
		},
		onCancel() {
			dispatch({
				type: 'updateLog/hideModal',
			})
		},
	}

	return (
		<div className={styles.topMargin}>
			<UpdateLogList {...updateLogListProps}/>
			<UpdateLogModal { ...updateLogModalProps } />
		</div>
	)
}

export default connect(({updateLog}) => ({updateLog}))(UpdateLog);