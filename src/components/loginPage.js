import React from 'react';
import {Form, Icon,Input,Spin, Alert, Button,Radio, Checkbox,message } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
}


const LoginForm = ({
  disabled,
  visible,
  loading,
  onLogin,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    resetFields,
    },
}) => {	
		function loginSumit(e) {
			handleSubmit(e);
		}
		function handleSubmit(e) {
			e.preventDefault();
			validateFields((errors) => {
				if(!!errors) {
					return;
				}
				onLogin(getFieldsValue());
			});
		}
	    return (
	    	<div>
		    	<Spin tip="正在登录中..." spinning={loading}>
			      <Form onSubmit={loginSumit}>
			        <FormItem horizontal {...formItemLayout} >
				        {getFieldDecorator('user_name', {
			            rules: [{ required: true, message: '用户名未填写' }],
				        })(
				            <Input placeholder="请输入用户名"/>
				        )}
			        </FormItem>
			        <FormItem horizontal {...formItemLayout} >
			          {getFieldDecorator('password',{
			          	rules: [{ required: true, message: '密码未填写'}],
			          })(
			          	<Input type="password" placeholder="请输入密码" />
			          )}
			        </FormItem>
			        <FormItem {...formItemLayout}>
			          {getFieldDecorator('agreement')(
			            <Checkbox>记住密码</Checkbox>
			          )}
			          	<a>找回密码</a>
				       <Button type="primary" size="large" htmlType="submit"><span>登录</span></Button>
			     	</FormItem>
			      </Form>
				</Spin>
	      </div>
	);
};

export default Form.create()(LoginForm);