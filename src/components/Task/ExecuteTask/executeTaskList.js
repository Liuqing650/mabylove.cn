import React from 'react';
import { Row, Col,Badge,Switch, Table, Input, Icon,Popconfirm,Button  } from 'antd';
import styles from './executeTaskStyle.less';

const executeTaskList = ({
	taskInfo,
	detailList,
	isRead,

	onReadChange,
	onShowModal,
	onTaskSubmitChange,
	onDetailSubmitChange,
}) => {

	function onHanldReadChange(data) {
		const obj = {};
		obj['is_read']='1';
		obj['user_id']=data.user_id;
		obj['task_id']=data.task_id;
		onReadChange(obj);
	}


	// 任务完成状态
	// 1.完成
	function onSubmitTaskChange(record) {

		const obj = {};
		obj['is_submit']='1';
		obj['user_id']=record.user_id;
		obj['task_id']=record.task_id;
		onTaskSubmitChange(obj);
	}
	// 2.撤销
	function onNoTaskChange(record) {

		const obj = {};
		obj['is_submit']='0';
		obj['user_id']=record.user_id;
		obj['task_id']=record.task_id;
		onTaskSubmitChange(obj);
	}

	// 任务详情完成状态
	// 1.完成
	function onSubmitDetailChange(record) {
		const obj = {};
		obj['is_complete']='1';
		obj['user_id']=record.user_id;
		obj['detail_id']=record.detail_id;
		onDetailSubmitChange(obj);
	}
	// 2.撤销
	function onNoDetailChange(record) {
		const obj = {};
		obj['is_complete']='0';
		obj['user_id']=record.user_id;
		obj['detail_id']=record.detail_id;
		onDetailSubmitChange(obj);
	}

	const BadgeData = {
		success: <Badge status="success" />,
		processing: <Badge status="processing" />,
		default: <Badge status="default" />,
		warning: <Badge status="warning" />,
		error: <Badge status="error" />,
	};

	const taskState = taskInfo.task_state&&taskInfo.task_state==='已过期'?BadgeData.default:taskInfo.task_state==='已完成'?BadgeData.success:taskInfo.task_state==='进行中'?BadgeData.processing:BadgeData.warning;
	
	const columns = [{
      title: '任务名称',
      dataIndex: 'task_name',
      key: 'task_name',
	    },{
	      title: '提交内容',
	      dataIndex: 'description',
	      key: 'description',
	      render: (text, record, index) => {
	        return (
	              <span className={styles.tableTextStyle} title={text}>{text}</span>
	        );
	      },
	    },{
	      title: '附件链接',
	      dataIndex: 'file_url',
	      key: 'file_url',
	      render: (text, record, index) => {
	        return (
	              <a href={text?text:null} target="_blank"><span className={styles.langTxtStyle} title={text}>{record.is_file=='是'?text?text:'没有链接额':'不需要附件'}</span></a>
	        );
	      },
	    }, {
	      title: '是否阅读',
	      dataIndex: 'is_read',
	      key: 'is_read',
	      render: (text, record, index) => {
	        return (
	              <span>{text==1?'已读':'未读'}</span>
	        );
	      },
	    }, {
	      title: '是否完成',
	      dataIndex: 'is_submit',
	      key: 'is_submit',
	      render: (text, record, index) => {
	        return (
	             <span>{text==1?BadgeData.success:BadgeData.processing}{text==1?'已完成':'未完成'}</span>
	        );
	      },
	    }, {
	      title: '操作',
	      dataIndex: 'task_id',
	      key: 'task_id',
	      render: (text, record, index) => {
	        return (
	        	<span>
	        		<Popconfirm title="你确定任务已经完成了吗?" onConfirm={() => onSubmitTaskChange(record)}>
	              		<a  disabled={record.is_submit==1?true:false}>确认完成</a>
	            	</Popconfirm>
	              <span className="ant-divider" />
	        		<Popconfirm title="确认撤销已完成任务?" onConfirm={() => onNoTaskChange(record)}>
	              		<a  disabled={record.is_submit==1?false:true}>撤销完成</a>
	            	</Popconfirm>
	            </span>
	        );
	      },
    }];


	const detailColumns = [{
      title: '引导',
      dataIndex: 'index',
      key: 'index',
	    },{
	      title: '任务项',
	      dataIndex: 'task_item',
	      key: 'task_item',
	    },{
	      title: '是否完成',
	      dataIndex: 'is_complete',
	      key: 'is_complete',
	      render: (text, record, index) => {
	        return (
	              <span>{text?text==1?'完成':'未完成':'未完成'}</span>
	        );
	      },
	    }, {
	      title: '完成时间',
	      dataIndex: 'submit_time',
	      key: 'submit_time',
	      render: (text, record, index) => {
	        return (
	              <span>{record.is_complete?record.is_complete==1?text:'待完成':'待完成'}</span>
	        );
	      },
	    }, {
	      title: '操作',
	      dataIndex: 'task_id',
	      key: 'task_id',
	      render: (text, record, index) => {
	        return (
	        	<span>
	              <a onClick={()=>{onSubmitDetailChange(record)}} disabled={record.is_complete==1?true:false}>确认完成</a>
	              <span className="ant-divider" />
	              <a onClick={()=>{onNoDetailChange(record)}} disabled={record.is_complete==1?false:true}>撤销完成</a>
	            </span>
	        );
	      },
    }];
	return (
		<div>
			<div className={styles.titleWrapper}>
				<h2 className={styles.titleTopStyle}>执行任务</h2>
			</div>
			<div className={styles.TopWrapper}>
				<Row>
					<Col span={8}>
						<div className={styles.taskInfoStyle}> 
							<div className={styles.clearfix}>
								<div className={styles.titleStyle}>任务名称</div>
								<div className={styles.textStyle}>{taskInfo.task_name}</div>
							</div>
						</div>
						<div className={styles.taskInfoStyle}> 
							<div className={styles.clearfix}>
								<div className={styles.titleStyle}>任务组</div>
								<div className={styles.textStyle}>{taskInfo.group_name}</div>
							</div>
						</div>
						<div className={styles.taskInfoStyle}> 
							<div className={styles.clearfix}>
								<div className={styles.titleStyle}>任务等级</div>
								<div className={styles.textStyle}>{taskInfo.task_level?taskInfo.task_level+'级任务':null}</div>
							</div>
						</div>
						<div className={styles.taskInfoStyle}> 
							<div className={styles.clearfix}>
								<div className={styles.titleStyle}>任务状态</div>
								<div className={styles.textStyle}>{taskState}{taskInfo.task_state?taskInfo.task_state:'没有数据'}</div>
							</div>
						</div>
						<div className={styles.taskInfoStyle}> 
							<div className={styles.clearfix}>
								<div className={styles.titleStyle}>任务邮箱</div>
								<div className={styles.textStyle}>{taskInfo.task_email}</div>
							</div>
						</div>
					</Col>
					<Col span={16}>
						<div className={styles.rightExecuteStyle}>
							<div className={styles.rightTimeTitle}>{taskInfo.begin_time}
								<span className={styles.rightTimeText}>{taskInfo.end_time?'至':null}</span>
								{taskInfo.end_time}</div>
						</div>
						<div> 
							<Table 
								rowKey={record => record.task_id}
								dataSource={[taskInfo]} 
								columns={columns}
								pagination={false}
							/>
						</div>
						<div className={styles.rightExecuteToolStyle}> 
							<Button type="dashed" onClick={()=>{onHanldReadChange(taskInfo)}}  disabled={taskInfo.is_read==1?true:false} className={styles.buttonMargin} style={{width:120}} size="large" icon="book">已阅读</Button>
							<Button type="primary" onClick={()=>{onShowModal(taskInfo)}} size="large" style={{width:120}} icon="edit">填写任务</Button>
						</div>
					</Col>
				</Row>
			</div>
			<div className={styles.titleWrapper}>
				<h2 className={styles.titleTopStyle}>任务项详情</h2>
			</div>
			<div>
				<Table 
					rowKey={record => record.detail_id}
					dataSource={detailList} 
					columns={detailColumns}
				/>
			</div>			
		</div>
	)
}

export default executeTaskList;