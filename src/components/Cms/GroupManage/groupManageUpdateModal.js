import React, { PropTypes } from 'react';
import { Form, Input, Radio,Select, Modal,Popconfirm } from 'antd';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const groupManageUpdateModal = ({
	visible,
	roleList=[],
	code,
	item = {},
	onOk,
	onCancel,
	title,
	form: {
		getFieldDecorator,
	    validateFields,
	    getFieldsValue,
	},
}) => {

	function handleOk() {
		validateFields((errors) => {
			if(errors) {
				return
			}
			const data = { ...getFieldsValue(),group_id:item.group_id}
			onOk(data)
		})
	}
	const modalOpts = {
		title: title,
		visible,
		onOk: handleOk,
		onCancel,
		wrapClassName:"vertical-center-modal"
	}

	const loop = roleList => roleList.map((item,index) => {
		// console.log(item)
		return (
			<Select.Option value={item.code} key={index}>{item.role_name}</Select.Option>
		);
		
	});
	const roleSelect = loop(roleList)
	return (
		<Modal {...modalOpts}>
			<Form layout="horizontal">
				<Form.Item
					label="群组名"
					{ ...formItemLayout }
				>
		            {getFieldDecorator('group_name',{
						initialValue: item.group_name,
						rules: [
							{required: true, message: '群组名不能为空！' },
						],
					})(
						<Input placeholder='请输入群组名'/>
					)}
			    </Form.Item>
				<FormItem
					label="描述"
					{ ...formItemLayout }
				>
					{getFieldDecorator('remark',{
						initialValue: item.remark,
					})(
						<Input type="textarea" placeholder='请简短描述下群组'/>
					)}
				</FormItem>
			</Form>
		</Modal>
	);
};

groupManageUpdateModal.propTypes = {
  visible: PropTypes.any,
  form: PropTypes.object,
  item: PropTypes.object,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
}

export default Form.create()(groupManageUpdateModal);