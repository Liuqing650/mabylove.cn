import React from 'react';
import styles from './registStyle.less';
import { Form,Spin, Input, Button,Checkbox,Row, Col, notification, Icon } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const registContent = ({
	loading,
	agreement,
	judgePwd,
	invite,
	startState,
	inviteCode,
	isExisits,
	onCheckbox,
	onShowModal,
	onUseInvite,
	onJudgePwd,
	onJudgeUser,
	onSubmit,
	judgeInvite,
	noticeIndex='0',
	form: {
	    getFieldDecorator,
	    validateFields,
	    getFieldsValue,
	    getFieldValue,
	    resetFields,
  	},
}) => {

	const inviteState = invite?'block':'none';
	const inviteFormState = startState?'none':'block';
	const inviteButtonState = startState?'block':'none';
	const registState = (!invite&&startState)?'block':'none';
	const userState = isExisits==null?null:(isExisits?"error":"success");
	const userHelpText = isExisits?"帷号已经存在了,请重新输入吧！":null;
	var docH = (document.body.clientHeight-144)/4;
	if((document.body.clientHeight-144)<500){
		docH='0';
	}
	const openNotification = () => {
		changeIndex();
		notification.open({
			key:noticeIndex,
			message: '如何获取邀请码',
			duration: noticeIndex==null?1:noticeIndex>3?clearIndex():4.5,
			description: <div>
			<p>邀请码可以通过以下方式获取：</p>
			<p>1.获取到开发人员赠送的邀请码;</p>
			<p>2.可联系：1006822621@qq.com,索要邀请码;</p>
			<p>3.申请邀请码系统提交申请(暂没开发此功能);</p>
			<p>4.进入被邀请的相关QQ群,不定期发放邀请码。</p>
			</div>,
			icon: <Icon type="info-circle" style={{ color: '#108ee9' }} />,
		});
	};

	function onChangeCheckbox() {
		agreement=!agreement;
		onCheckbox(agreement);
	}

	function onClickStart() {
		onUseInvite(inviteCode);
	}

	function handleOk() {
		validateFields((errors) => {
			if(errors&&!errors.invite) {
				return
			}
			const data = { ...getFieldsValue() }
			if(inviteCode) {
				data['invite'] = inviteCode;
			}
			onSubmit(data);
			resetFields();
		})
	}

	function handleInvite(value) {
		validateFields((errors) => {
			if(errors.invite) {
				return
			}
			const arr = [...getFieldValue('invite')]
			var data = "";
			if(arr && arr.length>0) {
				data = arr.join("");
			}
			judgeInvite(data);
			resetFields();
		})
		
	}


	function checkInvite(rule, value, callback) {
	    if (!value) {
	      callback(new Error('邀请码不能为空！'));
	    } 
	    if(!/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{32}$/.test(value)) {
	    	callback(new Error('邀请码不合法额！'));
	    } else {
	      callback();
	    }
	}
	if(isExisits) {
    	// callback(new Error(''));
    }
	function checkUserName(rule, value, callback) {
	    if (!value) {
	      callback(new Error('帷号不能为空哦！'));
	    } 
	    
	    if(!/^[a-zA-Z0-9_]{2,16}$/.test(value)) {
	    	callback(new Error('帷号必需是2-16位的数字或字母！'));
	    } else {
	      callback();
	    }
	}
    function checkPassword(rule, value, callback) {
	    if (!value) {
	      callback(new Error('密码不能为空额！'));
	    }
	    if (!/^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{6,18}$/.test(value)) {
	      callback(new Error('密码必需是6-18位的数字和字母的组合！'));
	    } else {
	    	onJudgePwd(value);
	      	callback();
	    }
	}
    function checkPasswordRepeat(rule, value, callback) {
    	if(!value) {
    		callback(new Error('请再次输入密码！'))
    	}
	    if (value != judgePwd) {
	      callback(new Error('两次密码输入不一致！'));
	    } else {
	      callback();
	    }
	}
    function checkNickName(rule, value, callback) {
    	if(!value) {
    		callback(new Error('您的昵称也要有额！'))
    	} else {
	      callback();
	    }
	}
    function checkEamil(rule, value, callback) {
    	if(!value) {
    		callback(new Error('邮箱不能为空,万一密码忘了呢？'))
    	}
	    if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
	      callback(new Error('邮箱格式不正确,请检验！'));
	    } else {
	      callback();
	    }
	}

	function changeIndex() {
		noticeIndex++;
	}
	function clearIndex() {
		noticeIndex=0;
		return 0.1;
	}

	
	return (
		<Spin tip="Loading..." spinning={loading}>
			<div className={styles.registWrapper}>
				<div className={styles.registTitle}>
					<h2 className={styles.centerText}>
						帷号申请
					</h2>
				</div>
				<div style={{display:`${inviteState}`}}>
					<div className={styles.inviteFormStyle}>
						<div style={{display:`${inviteFormState}`,minHeight:150}}>
							<Form horizontal className="myFormStyle">
								<FormItem
									label="邀请码:"
									hasFeedback
									{ ...formItemLayout }
								>
									{getFieldDecorator('invite',{
										rules: [
											{ validator: checkInvite},
										],
									})(
										<Input className={styles.inputStyle} placeholder="请输入邀请码"/>
									)}
								</FormItem>
							</Form>
							<Row>
		      					<Col span={16} offset={4}>
		      						<Button className={styles.buttonStyle} type="primary" size="large" onClick={handleInvite} > 
								      验证邀请码
								    </Button>
		      					</Col>
							</Row>
							<Row>
		      					<Col span={24}>
		      						<div className={styles.unSelectText}><p className={styles.explainStyle}>您需要输入有效的<a onClick={openNotification}>邀请码</a>才可以注册成为帷友额</p></div>
		      					</Col>
							</Row>
						</div>
						<div style={{display:`${inviteButtonState}`,minHeight:150}}>
							<div className={styles.invaWrapper}>
								<div className={styles.invaStyle}>
									<a className={styles.invButton} onClick={onClickStart}>
										<span className={styles.invText}>START</span>
									</a>
								</div>
							</div>
						</div>
						<div className={styles.inviteBottomStyle} style={{bottom:`${-docH}px`}}></div>
					</div>
				</div>
				<div style={{display:`${registState}`}}>
					<div className={styles.registFormStyle}>
						<Form horizontal className="myFormStyle">
							<FormItem
								{ ...formItemLayout }
								label="帷号:"
								hasFeedback
								validateStatus={userState}
								help={userHelpText}
							>
								{getFieldDecorator('username',{
									rules: [
										{validator: checkUserName},
									],
								})(
									<Input onBlur={(e)=>{onJudgeUser(e.target.value)}} className={styles.inputStyle} placeholder="帷号由字母或数字组成"/>
								)}
							</FormItem>
							<FormItem
								label="昵称:"
								hasFeedback
								{ ...formItemLayout }
							>
								{getFieldDecorator('nickName',{
									rules: [
										{validator: checkNickName},
									],
								})(
									<Input className={styles.inputStyle} placeholder="请输入您的昵称"/>
								)}
							</FormItem>
							<FormItem
								label="密码:"
								hasFeedback
								{ ...formItemLayout }
							>
								{getFieldDecorator('password',{
									rules: [
										{validator: checkPassword},
									],
								})(
									<Input className={styles.inputStyle} type="password" placeholder="请输入密码" />
								)}
							</FormItem>
							<FormItem
								label="确认密码:"
								hasFeedback
								{ ...formItemLayout }
							>
								{getFieldDecorator('passwordRepeat',{
									rules: [
										{ validator: checkPasswordRepeat},
									],
								})(
									<Input className={styles.inputStyle} type="password" placeholder="请再次输入密码" />
								)}
							</FormItem>
							<FormItem
								label="邮箱:"
								hasFeedback
								{ ...formItemLayout }
							>
								{getFieldDecorator('email',{
									rules: [
										{ validator: checkEamil},
									],
								})(
								    <Input className={styles.inputStyle} placeholder="123345678@163.com" />
								)}
							</FormItem>
						</Form>
						<Row>
	      					<Col span={16} offset={4}>
	      						<FormItem>
						          {getFieldDecorator('agreement', {
						          	initialValue: agreement,
						            valuePropName: 'checked',
						          })(
						            <div className="checkboxStyles">
						            	<Checkbox checked={agreement} onChange={onChangeCheckbox}><span className={styles.unSelectText}>我同意该</span></Checkbox>
						            	<a onClick={onShowModal}><span className={styles.unSelectText}>使用条列</span></a>
						            </div>
						          )}
						        </FormItem>
	      					</Col>
						</Row>
						<Row>
	      					<Col span={16} offset={4}>
	      						<Button className={styles.buttonStyle} type="primary" size="large" onClick={handleOk} disabled={agreement?false:true} > 
							      注册只属于你的帷号
							    </Button>
	      					</Col>
						</Row>
					</div>
				</div>
			</div>
		</Spin>
	)
}

export default Form.create()(registContent);