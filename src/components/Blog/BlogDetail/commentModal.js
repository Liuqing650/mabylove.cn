import React,{ Component } from 'react';
import { Form, Input, Modal, Select, Button } from 'antd';
import storage from '../../../utils/browserData';


const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 20,
  },
}
function commentModal({
	visible,
	blog_id,
	user_id,
	onSubmit,
	onCancel,
	form: {
	    getFieldDecorator,
	    validateFields,
	    getFieldsValue,
	    resetFields,
  	},
}) {

	
	const FormItem = Form.Item;
	const Option = Select.Option;

	function handleOk() {
		validateFields((errors) => {
			if(errors) {
				return
			}
			const data = { ...getFieldsValue() }
			data['user_id']=user_id;
			data['blog_id']=blog_id;
			onSubmit(data);
			resetFields();
		})
	}

	function handleCancel() {
		resetFields();
		onCancel();
	}

	const modalOpts = {
		title: '评论文章',
		visible: visible,
		onOk: handleOk,
		maskClosable: false,
		onCancel: handleCancel,
		wrapClassName:"vertical-center-modal",
		footer:<div>
			    <Button type="primary" size="large" onClick={handleOk}> 
			      评论
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
						label={storage.nickName}
						hasFeedback
						{ ...formItemLayout }
					>
						{getFieldDecorator('comment',{
							rules: [
								{message: '没有填写任何评论'},
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

export default Form.create()(commentModal);