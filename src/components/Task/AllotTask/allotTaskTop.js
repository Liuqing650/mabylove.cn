import React from 'react';
import styles from './allotTaskStyle.less';
import { Table,Row, Col,Checkbox,Badge,Spin } from 'antd';

const allotTaskTop = ({
	taskLoading,
	detailLoading,
	taskInfo,
	taskDetail,

	onChangeDetail,
}) => {

	// console.log('taskDetail----->',taskDetail);

	const BadgeData = {
		success: <Badge status="success" text="任务已完成" />,
		processing: <Badge status="processing" text="任务进行中" />,
		default: <Badge status="default" text="任务已过期" />,
		warning: <Badge status="warning" text="任务未开始" />,
		error: <Badge status="error" text="任务停止" />,
	};



	function onShowDetail(record) {
		const obj={};
		obj['state'] = '1';
		obj['detail_id'] = record.detail_id;
		obj['task_id'] = record.task_id;
		onChangeDetail(obj)
	}

	function onHideDetail(record) {
		const obj={};
		obj['state'] = '0';
		obj['detail_id'] = record.detail_id;
		obj['task_id'] = record.task_id;
		onChangeDetail(obj)
	}

	const taskState = taskInfo.task_state&&taskInfo.task_state==='已过期'?BadgeData.default:taskInfo.task_state==='已完成'?BadgeData.success:taskInfo.task_state==='进行中'?BadgeData.processing:BadgeData.warning;

	const columns = [
	    { title: '任务详情', dataIndex: 'task_item', key: 'task_item' },
	    { title: '执行人数', dataIndex: 'users', key: 'users' },
	    {
	        title: '操作',
	        dataIndex: 'state',
	        key: 'state',
	        render: (text,record) => (
	          <span>
	            <a onClick={()=>{onShowDetail(record)}} disabled={record.state=='1'?true:false}>{record.state=='1'?'已生效':'生效'}</a><span> | </span>
	            <a onClick={()=>{onHideDetail(record)}} disabled={record.state=='1'?false:true}>{record.state=='1'?'取消任务':'已取消'}</a>
	          </span>
	        ),
	    },
	];

	return (
		<div>
			<div className={styles.titleWrapper}>
				<h2 className={styles.titleStyle}>任务详情</h2>
			</div>
			<Row>
				<Spin className="taskLading" spinning={taskLoading} >
				<Col span={6} offset={1}>
					<Row>
						<Col span={24}>
							<span className={styles.taskNameStyle}>项目名称</span>
						</Col>
					</Row>
					<Row className={styles.subTextStyle}>
						<Col span={8}>
							{taskInfo.task_level?taskInfo.task_level:0}级任务
						</Col>
						<Col span={8}>
							<Checkbox checked={taskInfo.is_file&&taskInfo.is_file==='是'?true:false}>上传文件</Checkbox>
						</Col>
						<Col span={8}>
							 {taskState}
						</Col>
					</Row>
					<Row className={styles.subTextStyle}>
						<Col span={24}>{taskInfo.begin_time} {taskInfo.begin_time?'至':'没有查询到时间数据'} {taskInfo.end_time}</Col>
					</Row>
				</Col>
				</Spin>
				<Col span={16}>
					<Table
					  loading={detailLoading}
					   rowKey={record => record.detail_id}
				      columns={columns}
				      dataSource={taskDetail}
				    />
				</Col>
		    </Row>
		</div>
	)
}

export default allotTaskTop;