import React from 'react';
import { Table, Badge, Icon,Button  } from 'antd';
import styles from './newTaskStyle.less';
import {hashHistory} from 'dva/router';

const taskList = ({
	detailLoading,
	taskLoading,
	detailData,
	taskData,
	onQueryDetail,
	onChangeDetail,
}) => {

	function onOpenDetail(expanded, record) {
		const obj={};
		obj['task_id'] = record.id;
		if(expanded) {
			onQueryDetail(obj);
		}
	}

	function onShowDetail(record) {
		const obj={};
		obj['state'] = '1';
		obj['detail_id'] = record.id;
		obj['task_id'] = record.task_id;
		onChangeDetail(obj)
	}

	function onHideDetail(record) {
		const obj={};
		obj['state'] = '0';
		obj['detail_id'] = record.id;
		obj['task_id'] = record.task_id;
		onChangeDetail(obj)
	}

	const expandedRowRender = (id) => {
	    const columns = [
	      { title: '任务详情', dataIndex: 'task_item', key: 'task_item' },
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
	    var thisData = [];
	    for(let i=0;i<detailData.length;i++) {
	    	if(id==detailData[i].task_id) {
	    		thisData = detailData[i].arr;
	    	}
	    }
	    const data = thisData;
	    return (
	      <Table
	      	className="newTaskDetailStyle"
			loading={detailLoading}
	      	 rowKey={record => record.id}
	        columns={columns}
	        dataSource={data}
	        pagination={false}
	      />
	    );
  };

	const BadgeData = {
		success: <Badge status="success" />,
		processing: <Badge status="processing" />,
		default: <Badge status="default" />,
		warning: <Badge status="warning" />,
	};

	const columns = [
	    { title: '任务名称', dataIndex: 'task_name', key: 'task_name' },
	    { title: '任务级别',
	      dataIndex: 'task_level', 
	      key: 'task_level',
		},
	    { title: '上传文件', dataIndex: 'is_file', key: 'is_file' },
	    { title: '执行群组', dataIndex: 'group_name', key: 'group_name' },
	    { title: '完成状态', 
	      dataIndex: 'task_state', 
	      key: 'task_state',
		  filters: [
		  { text: '未开始', value: '未开始' },
		  { text: '已完成', value: '已完成' },
		  { text: '进行中', value: '进行中' },
		  ],
		  onFilter: (value, record) => record.task_state.indexOf(value) === 0,
	      render: task_state => <span>{task_state==='已完成'?BadgeData.success:task_state==='已过期'?BadgeData.default:task_state==='进行中'?BadgeData.processing:BadgeData.warning}{task_state}</span> },  
	];

	const buttonStyle = {
		width: 200,
		marginTop: 40,
		marginBottom: 20,
		display: "block",
		marginLeft: "auto",
		marginRight: "auto",
	}
	
	function goTo() {
		hashHistory.push('/task/allot');
	}

	return (
		<div>
			<div className={styles.taskTitle}>
				<h2 className={styles.titleStyle}>任务详情列表</h2>
			</div>
			<div>
				<Table
				  loading={taskLoading}
				   rowKey={record => record.id}
				  onExpand={onOpenDetail}
			      columns={columns}
			      expandedRowRender={record => expandedRowRender(record.id)}
			      dataSource={taskData}
			    />
			</div>
			<div>
				 <Button style={buttonStyle} type="primary" onClick={goTo} size="large" icon="arrow-right">进入任务管理页面</Button>
			</div>
		</div>
	)
}

export default taskList;