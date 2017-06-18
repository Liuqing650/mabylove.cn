import React from 'react';
import { Modal,Form,Input,Row,Button,Icon, Col,message } from 'antd';
import CronEdit from './cronEdit';
import CronController from './cronController';
import styles from './cronStyle.less';
const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 8,
  },
}

const cron = ({
	title,
	visible,
	onOk,
	onSubmitModal,
	onCancel,
	onClear,
	isDesabled,

	dispatchItem,
	groupname,
	form: {
	    getFieldDecorator,
	    validateFields,
	    getFieldsValue,
	    resetFields,
  	},

	onTabsChange,
	onRadioChange,
	cronDefaultValue,
	cronDefaultBoxValue,
	onCheckBoxsChange,
	checkedCron,
	onNumberB,
	onNumberE,
	onNumberOne,
	timelevel,
	radioValue,
	beforeValue,
	endValue,
	selectLevel,
	selectRadio,
	checkboxValue,

	secondValue,
	minuteValue,
	hourValue,
	dayValue,
	monthValue,
	weekValue,
	yearValue,
	cronValue,
	onAnalyze,
	cronViewDate,
}) => {

	function handleOk() {
		validateFields((errors) => {
			if (errors) {
				return
			}
			var cronItem = {}
			var data = { ...getFieldsValue()}
			if(data.groupname) {
				cronItem.taskName = data.groupname;
			} else {
				message.warning("您还没有填写计划任务组名,无法提交");
			}
			if(cronValue) {
				cronItem.cronValue = cronValue;
			} else {
				message.warning("您还没有任何表达式,无法提交");
			}
			if(cronItem.cronValue && cronItem.taskName) {
				onOk(cronItem)
				resetFields()
			}
	    })
		
	}

	function handleCancel() {
		resetFields()
		onCancel()
	}

	const modalOpts = {
		width: 1000,
		title: title,
		visible,
		onOk: handleOk,
		maskClosable: false,
		onCancel:handleCancel,
		wrapClassName:"vertical-center-modal",
		footer:<div>
			<Button type="ghost" onClick={handleCancel}>取消</Button>
			<Button key="back" type="primary" onClick={handleOk} disabled={isDesabled ? true:false}>提交Cron表达式</Button>
		</div>,
	}

	const CronEditProps = {
		timelevel:timelevel,
		cronDefaultValue: cronDefaultValue,
		cronDefaultBoxValue: cronDefaultBoxValue,
		checkedCron: checkedCron,
    	radioValue: radioValue,
    	beforeValue: beforeValue,
    	endValue: endValue,
		selectLevel: selectLevel,
		selectRadio: selectRadio,
		checkboxValue: checkboxValue,
    	
    	onTabsChange,
		onRadioChange,
		onCheckBoxsChange,
		onNumberB,
		onNumberE,
		onNumberOne,
	}

	const CronControllerProps = {
		secondValue:secondValue,
		minuteValue:minuteValue,
		hourValue:hourValue,
		dayValue:dayValue,
		monthValue:monthValue,
		weekValue:weekValue,
		yearValue:yearValue,
		cronValue:cronValue,
		onAnalyze:onAnalyze,
		cronViewDate:cronViewDate,
	}

	return (
		<div className={styles.cronWrapperStyle}>
			<div style={{marginBottom:10 }} >
			<h1 style={{textAlign:'center'}}>CronTab 表达式解析-React</h1>
			<Row>
				<Col span={18}>
					<Form horizontal>
					 	<FormItem
				          label="计划任务组名:"
				          labelCol={{ span: 4 }}
	          			  wrapperCol={{ span: 12 }}
				        >
				          {getFieldDecorator('groupname',{
				          	initialValue: groupname || dispatchItem.groupname,
				            rules: [
				              { required: true, message: '计划任务组名不能为空' },
				            ]})(
					          <Input style={{width:300 }} />
					        )}
						</FormItem>
					</Form>
				</Col>
      			<Col span={4} offset={2}>
      				 <Button type="dashed" onClick={onClear}><Icon type="reload"/>清除CronTab</Button>
      			</Col>
			</Row>
			 	
			</div>
			<CronEdit { ...CronEditProps } />
			<CronController { ...CronControllerProps } />
		</div>
	);

}

export default Form.create()(cron);