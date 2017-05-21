import React, { PropTypes } from 'react';
import { Checkbox,Modal,Icon,Button} from 'antd';
const CheckboxGroup = Checkbox.Group;
const groupUserModal = ({
	visible,
	userList,
	checkedList,
	onOk,
	onCancel,
	handleChange,
}) => {
	const modalOpts = {
		title:'邀请成员',
		visible,
		width:300,
		onOk,
		onCancel,
		wrapClassName:"vertical-center-modal"
	}
	return (
		<Modal {...modalOpts}>
	    <CheckboxGroup options={userList} value={checkedList} onChange={handleChange}/>
		</Modal>
	);
};



export default groupUserModal;