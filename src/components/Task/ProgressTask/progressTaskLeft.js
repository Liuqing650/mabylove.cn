import React from 'react';
import { Menu, Icon,Spin,Badge } from 'antd';
import styles from './progressTaskStyle.less';

const progressTaskLeft = ({
	loading,
	taskList,
	onSelectChange,
}) => {

	
	function handleClick(item) {
		const obj={};
		obj['task_id']=item.key;
		onSelectChange(obj);
	}

	const BadgeData = {
		success: <Badge status="success" />,
		processing: <Badge status="processing" />,
		default: <Badge status="default" />,
		warning: <Badge status="warning" />,
		error: <Badge status="error" />,
	};

	

	const loopMenu = data => data.map((item,index)=>{
		const taskState = item.task_state&&item.task_state==='已过期'?BadgeData.default:item.task_state==='已完成'?BadgeData.success:item.task_state==='进行中'?BadgeData.processing:BadgeData.warning;
		return (
			<Menu.Item key={item.task_id}>{taskState}{item.task_name}</Menu.Item>
		)
	})
	
	const menuNode = loopMenu(taskList);

	return (
		<Spin className="taskLading" spinning={loading}>
			<div className={styles.leftWrapper}>
				<h2 className={styles.leftTitleStyle}>任务列表</h2>
			 	<Menu
					theme="light"
					onSelect={handleClick}
					style={{ width: '100%',textAlign:'left' }}
					defaultOpenKeys={['1']}
					mode="inline"
		        >
		        	{menuNode}
		        </Menu>
			</div>
	    </Spin>
	)
}

export default progressTaskLeft;