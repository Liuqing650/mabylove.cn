import React from 'react';
import { Modal, Button,Form,Input  } from 'antd';
import styles from './executeTaskStyle.less';

const formToolLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
};

const FormItem = Form.Item;
const executeTaskModal = ({
	visible,
	taskInfo,
	submitData,
	onTaskSubmit,
	onCancelModal,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
    },
}) => {
	function handleOk(argument) {
		validateFields((errors) => {
			if(errors&&!errors.invite) {
				return
			}
			const data = { ...getFieldsValue() }
			data['user_id'] = submitData.user_id;
			data['task_id'] = submitData.task_id;
			onTaskSubmit(data);
			resetFields();
		})
	}

	function handleCancel() {
		onCancelModal();
		resetFields();
	}

    const modalOpts = {
        title: '填写任务信息',
        visible: visible,
        width: 400,
        onOk: handleOk,
        maskClosable: false,
        onCancel: handleCancel,
        wrapClassName:"vertical-center-modal",
        footer:<div>
            <Button type="ghost" onClick={handleCancel}>取消</Button>
            <Button type="primary" onClick={handleOk}> 
              提交
            </Button>
        </div>
    }

	return (
		<div>
			<Modal 
              {...modalOpts}
	        >
	          <Form>
                    <FormItem 
                    	{...formToolLayout}
						label="内容填写"
                    >
                        {getFieldDecorator('description', {
                            initialValue: submitData.description?submitData.description:null,
                        })(
                            <Input type="textarea" rows={3} placeholder="填写你的任务内容或者相关信息"/>
                        )}
                    </FormItem>
                    <FormItem 
                    	{...formToolLayout}
						label="附件链接"
					>
                        {getFieldDecorator('url', { initialValue: submitData.url?submitData.url:'' })(
                            <Input type="text" disabled={taskInfo.is_file=='是'?false:true} placeholder={taskInfo.is_file=='是'?"请输入附件链接":'不需要附件链接'}/>
                        )}
                    </FormItem>
                </Form>
	        </Modal>
		</div>
	)
}

export default Form.create()(executeTaskModal);