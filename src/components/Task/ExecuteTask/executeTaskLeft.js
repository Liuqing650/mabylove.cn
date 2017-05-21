import React from 'react';
import { Menu, Icon,Spin,Badge } from 'antd';
import styles from './executeTaskStyle.less';
import storage from '../../../utils/browserData'

const executeTaskLeft = ({
	loading,
	taskList,
	onSelectChange,
	defaultSelectTask,
}) => {

	// console.log('taskList--------->',taskList);

	function handleClick(item) {
		if(!storage.isLogin) {
			message.info('很抱歉,您还没有登录,不能获取到任务信息!');
			hashHistory.push('/login');
		}
		const obj={};
		obj['task_id']=item.key;
		obj['user_id'] = storage.userId;
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
				<h2 className={styles.leftTitleStyle}>我的任务</h2>
			 	<Menu
					theme="light"
					defaultSelectedKeys={[defaultSelectTask]}
					onSelect={handleClick}
					style={{ width: '100%',textAlign:'left' }}
					mode="inline"
		        >
		        	{menuNode}
		        </Menu>
			</div>
	    </Spin>
	)
}

export default executeTaskLeft;