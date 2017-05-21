import React,{ Component } from 'react';
import { Form, Input, Modal, Select, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}
function updateLogModal({
	item,
	title,
	visible,
	editLoading,
	onSubmit,
	onCancel,
	form: {
	    getFieldDecorator,
	    validateFields,
	    getFieldsValue,
	    resetFields,
  	},
}) {

	function handleOk() {
		validateFields((errors) => {
			if(errors) {
				return
			}
			const data = { ...getFieldsValue() }
			onSubmit(data);
			resetFields();
		})
	}

	function handleCancel() {
		resetFields();
		onCancel();
	}
	// 判断按钮是否有效暂时是根据角色的父id来判断的。pk就是pid

	const modalOpts = {
		title: title,
		visible: visible,
		width: 800,
		onOk: handleOk,
		maskClosable: false,
		onCancel: handleCancel,
		wrapClassName:"vertical-center-modal",
		footer:<div>
				<Button type="ghost" size="large" onClick={handleCancel}>取消本次提交</Button>
			    <Button type="primary" size="large" loading={editLoading} onClick={handleOk} disabled={item.pk<='1'?false:true}> 
			      提交更新内容
			    </Button>
			</div>
	}

	return (
		<div>
			<Modal
			  {...modalOpts}
			>
				<Form horizontal>
					<FormItem
						label="版本号:"
						hasFeedback
						{ ...formItemLayout }
					>
						{getFieldDecorator('version',{
							initialValue: item.version,
							rules: [
								{required: true, message: '版本号没有填写'},
							],
						})(
							<Input/>
						)}
					</FormItem>
					<FormItem
						label="发布者:"
						hasFeedback
						{ ...formItemLayout }
					>
						{getFieldDecorator('author',{
							initialValue: item.author,
							rules: [
								{required: true, message: '用户名没有填写,请登陆后再发布'},
							],
						})(
							<Input disabled />
						)}
					</FormItem>
					<Form.Item
						label="职位:"
						{ ...formItemLayout }
					>
			            {getFieldDecorator('grade', {
			              initialValue: '2',
			              rules: [
								{required: true, message: '版本级别'},
							],
			            })(
			              	<Select>
              					<Option value="2">普通更新</Option>
			                 	<Option value="1">重要更新</Option>
			              	</Select>
			            )}
				    </Form.Item>
					<FormItem
						label="版本信息:"
						hasFeedback
						{ ...formItemLayout }
					>
						{getFieldDecorator('update_log',{
							initialValue: item.update_log,
							rules: [
								{required: true, message: '版本更新信息没有填写'},
							],
						})(
						    <Input type="textarea" rows={4} />
						)}
					</FormItem>
				</Form>
			</Modal>
		</div>
	);
}

export default Form.create()(updateLogModal);