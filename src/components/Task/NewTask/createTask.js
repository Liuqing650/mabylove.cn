import React from 'react';
import { Form,Spin, Input, Button,Checkbox,Row,Select,Alert, Col,Slider, notification,Switch,DatePicker, Icon } from 'antd';
import moment from 'moment';
import styles from './newTaskStyle.less';
import storage from '../../../utils/browserData';

const FormItem = Form.Item;
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
};
const formToolLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 22, offset: 1  },
        sm: { span: 16, offset: 1 },
      },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 18, offset: 6 },
  },
};
const formButtonLayout = {
	wrapperCol: {
		span: 24,
	}
}

const createTask = ({
	onJudgeTask,
	uuid,
	user_id,
	onAddUUID,
	groupList,
	
	startValue,
	endValue,
	endOpen,
	onStartChange,
	onEndChange,
	handleStartOpenChange,
	handleEndOpenChange,

	selectedGroup,
	handleGroupChange,

	onTaskSubmit,

	form: {
	    getFieldDecorator,
	    validateFields,
	    getFieldsValue,
	    setFieldsValue,
	    getFieldValue,
	    resetFields,
  	},
}) => {

	function handleOk() {
		validateFields((errors) => {
			if(errors&&!errors.invite) {
				return
			}
			const data = { ...getFieldsValue() }
			data['user_id'] = user_id?user_id:storage.userId;
			data['begin_time'] = data.beginTime.format("YYYY-MM-DD HH:mm:ss");
			data['end_time'] = data.endTime.format("YYYY-MM-DD HH:mm:ss");
			data['is_file'] = data.isFile?'1':'0';
			data.beginTime=null;
			data.endTime=null;
			data['tsak_str'] = groupTaskData(data).join(',');
			onTaskSubmit(data);
			resetFields();
		})
	}

	// 包装任务项数据
	function groupTaskData(data) {
		var arr = [];
		for(let i in data) {
			if(i.indexOf('task-')>=0) {
				arr.push(data[i]);
			}
		}
		return arr;
	}

	function checkTaskName(rule, value, callback) {
	    if (!value) {
	      callback(new Error('任务名称不能为空哦！'));
	    } else {
	      callback();
	    }
	}

    function checkEamil(rule, value, callback) {
    	if(!value) {
    		callback(new Error('邮箱不能为空！'))
    	}
	    if (!/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(value)) {
	      callback(new Error('邮箱格式不正确,请检验！'));
	    } else {
	      callback();
	    }
	}

	// let uuid = 0;
	// 移除任务
	const remove = (k) => {
		// can use data-binding to get
		const keys = getFieldValue('keys');
		if (keys.length === 1) {
		  return;
		}
		setFieldsValue({
		  	keys: keys.filter(key => key !== k),
		});
	}
	// 添加key值
	const add = () => {
	    onAddUUID();
	    const keys = getFieldValue('keys');
	    const nextKeys = keys.concat(uuid);
	    setFieldsValue({
	      keys: nextKeys,
	    });
	}

	getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
	// 添加任务
	const addFormItems = keys.map((k, index) => {
      return (
        <FormItem
          {...formItemLayout}
          label={'任务项'+(index+1)}
          required={false}
          key={k}
        >
          {getFieldDecorator(`task-${k}`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              message: "请输入您的任务信息，或则您可以删除此项任务",
            }],
          })(
            <Input placeholder="请添加你的任务选项" style={{ width: '80%', marginRight: 8 }} />
          )}
          <Icon
            className={styles.deleteButton}
            type="minus-circle-o"
            disabled={keys.length === 1}
            onClick={() => remove(k)}
          />
        </FormItem>
      );
    });

    // 时间禁用选项
    const disabledStartDate = (startTime) => {
	    const endTime = endValue;
	    if (!startTime || !endTime) {
	      return false;
	    }
	    return startTime.valueOf() > endTime.valueOf();
	}

	const disabledEndDate = (endTime) => {
	    const startTime = startValue;
	    if (!endTime || !startTime) {
	      return false;
	    }
	    return endTime.valueOf() <= startTime.valueOf();
	}

	// 群组选项

	const loopGroup = data => data.map((item,index) => {
		return (
			<Option key={index} value={item.group_id}>{item.group_name}</Option>
		)
	})

	const groupOptions = loopGroup(groupList);

	return (
		<div>
			<div className={styles.taskTitle}>
				<h2 className={styles.titleStyle}>新建任务</h2>
			</div>
			<Alert message="如果执行群组为空,请到【用户中心】创建您自己的群组。" type="info" showIcon  closeText="关闭" />
			<Form horizontal onSubmit={handleOk} className="myFormStyle myFormPading">
				<FormItem
					{ ...formItemLayout }
					label="任务名称:"
					hasFeedback
				>
					{getFieldDecorator('task_name',{
						rules: [

							{validator: checkTaskName},
						],
					})(
						<Input className={styles.inputStyle} placeholder="请填写本次任务名称"/>
					)}
				</FormItem>
				{addFormItems}
				<FormItem
					 {...formItemLayout}
						label="添加任务:"
					 >
		          <Button type="dashed" className="my-task-button" onClick={add} style={{ width: '100%' }}>
		            <Icon type="plus" /> 添加任务项
		          </Button>
		        </FormItem>
				<FormItem
					label="任务级别:"
					{ ...formToolLayout }
				>
					{getFieldDecorator('task_level',
		            {rules: [{
        		              required: true,
        		              message: "请输入您的任务级别",
        		            }]})(
			            <Slider min={0} max={5} marks={{ 0: '0级', 1: '1级', 2: '2级', 3: '3级', 4: '4级', 5: '5级' }} />
			        )}
				</FormItem>
				 <FormItem
		          {...formToolLayout}
		          label="上传文件"
		        >
		          {getFieldDecorator('isFile', { valuePropName: 'checked' })(
		            <Switch  checkedChildren={'是'} unCheckedChildren={'否'} />
		          )}
		        </FormItem>
				 <FormItem
		          {...formItemLayout}
		          label="开始时间:"
		        >
		          {getFieldDecorator('beginTime',{initialValue: startValue,
		            rules: [{
		              required: true,
		              message: "请输入您的任务开始时间",
		            }]})(
		            <DatePicker
			          disabledDate={disabledStartDate}
			          showTime
			          style={{width:'100%'}}
			          format="YYYY-MM-DD HH:mm:ss"
			          placeholder="本次任务开始时间"
			          onChange={onStartChange}
			          onOpenChange={handleStartOpenChange}
			        />
		          )}
		        </FormItem>
				 <FormItem
		          {...formItemLayout}
		          label="截止时间:"
		        >
		          {getFieldDecorator('endTime',{initialValue: endValue,
		            rules: [{
		              required: true,
		              message: "请输入您的任务结束时间",
		            }]})(
		            <DatePicker
			          disabledDate={disabledEndDate}
			          showTime
			          style={{width:'100%'}}
			          format="YYYY-MM-DD HH:mm:ss"
			          placeholder="本次任务结束时间"
			          onChange={onEndChange}
			          open={endOpen}
			          onOpenChange={handleEndOpenChange}
			        />
		          )}
		        </FormItem>
				 <FormItem
		          {...formItemLayout}
		          label="执行群组:"
		        >
		          {getFieldDecorator('execute_group',{initialValue: selectedGroup,
		            rules: [{
		              required: true,
		              message: "请输入您的任务执行群组",
		            }]})(
		            <Select
		              className="my-option-style"
			          placeholder="选择一个群组"
			          onChange={handleGroupChange}
			        >
			          {groupOptions}
			        </Select>
		          )}
		        </FormItem>
				<FormItem
					label="任务邮箱:"
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
		        <FormItem {...formButtonLayout}>
		          <Button type="primary" size="large" htmlType="submit" style={{ width: '100%' }} size="large">提交任务</Button>
		        </FormItem>
			</Form>
		</div>
	)
}

export default Form.create()(createTask);