import React from 'react';
import styles from './allotTaskStyle.less';
import { Checkbox, Menu, Icon,Spin,Row, Col,Button,message } from 'antd';

const CheckboxGroup = Checkbox.Group;
const allotTaskGroup = ({
	groupLoading,
	groupList,
	groupUserList,
	taskId,
	groupId,

	addUserLoading,

	indeterminate,
	onCheckAllChange,
	onCheckdUser,
	onSelectGroupChange,
	onAddUser,
	checkAll,
	checkedList,
}) => {

	console.log('checkedList---------->',checkedList);
	function handleClick(item) {
		onSelectGroupChange(item.key);
	}

	function handleUserClick(checkedList) {
		if(taskId&&taskId!=="") {
			const obj={};
			obj['user_id_str'] = checkedList.join(',');
			obj['task_id'] = taskId;
			onAddUser(obj);
		} else {
			message.warning('您还没有选择群组，请在左边选择群组后提交!');
		}
		
	}

	function onUserChange(checkedList) {
		onCheckdUser(checkedList);
	}

	// 转换组员格式
	function formatGroupUser(data) {
		var arr=[];
		for(let i=0;i<data.length;i++) {
			const obj={};
			obj['value']=data[i].group_user_id;
			obj['label']=data[i].group_nick_name;
			arr.push(obj);
		}
		return arr;
	}

	const loopMenu = data => data.map((item,index)=>{
		return (
			<Menu.Item key={item.group_id}>{item.group_name}</Menu.Item>
		)
	})
	
	const menuNode = loopMenu(groupList);

	const groupUserOptions = formatGroupUser(groupUserList);

	const judgeAllChecked = groupUserOptions.length===checkedList.length?true:false;

	return (
		<div>
			<div className={styles.titleWrapper}>
				<h2 className={styles.titleStyle}>任务分组</h2>
			</div>
			<Spin spinning={groupLoading}>
				<Row>
					<Col span={6}>
						<Menu
							theme="light"
							onSelect={handleClick}
							style={{ width: '100%',textAlign:'center' }}
							mode="inline"
				        >
				        	{menuNode}
				        </Menu>
					</Col>
					<Col span={14}>
						<div className={styles.groupUserStyle}>
							<div>
					          {groupUserList&&groupUserList.length>0?<Checkbox
					            indeterminate={indeterminate}
					            onChange={onCheckAllChange}
					            checked={judgeAllChecked||checkAll}
					          >
					            全选
					          </Checkbox>:null}
					        </div>
					        <br />
							<CheckboxGroup options={groupUserOptions} value={checkedList} onChange={onUserChange} />
						</div>
					</Col>
					<Col span={4} className={styles.groupUserOperate}>
						<Button loading={addUserLoading} type="primary" onClick={() => handleUserClick(checkedList)} size="large">记录到任务中</Button>
					</Col>
			    </Row>
		    </Spin>
		</div>
	)
}

export default allotTaskGroup;