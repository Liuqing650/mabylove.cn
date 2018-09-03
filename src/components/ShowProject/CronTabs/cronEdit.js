import React from 'react';
import { Tabs, Radio, Input,message, InputNumber, Checkbox } from 'antd';
const TabPane = Tabs.TabPane;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const tabsStyle = {
	height: '340px',
	border: '1px solid #ccc',
}
const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
      margin: '2px 0px',
};

const radioSpecilStyle = {
	display: 'block',
	height: '30px',
	lineHeight: '30px',
	margin: '2px 0px',
	whiteSpace: 'normal'
};

const  tabPaneStyle = {
	padding: '6px 20px',
}

const inputStyle = {
	margin: '0px 3px',
}

const chackBoxStyle = {
	marginLeft: '20px',
}

function cronEdit({
	onTabsChange,
	onRadioChange,
	onCheckBoxsChange,
	onNumberB,
	onNumberE,
	onNumberOne,
	cronDefaultValue,
	cronDefaultBoxValue,
	checkedCron,
	timelevel,
	radioValue,
	beforeValue,
	endValue,

	selectLevel,
	selectRadio,
	checkboxValue,
}) {

// console.log("组件selectLevel=======>",selectLevel);
// console.log("组件selectRadio=======>",selectRadio);
	// 1. onCheckBoxsChange : 时间多选框中选中的数据
	// 2. timelevel : 时间等级，如1对应秒，2对应分...
	// 3. radioValue : 选中的单选框
	// 4. beforeValue : 当包含有两个输入框的时候，返回前一个输入框的值
	// 5. endValue : 当包含有两个输入框的时候，返回后一个输入框的值
	
	// console.log("timelevel==>",timelevel)
	// console.log("radioValue===>",radioValue)

	// 6.定义方法
	// 单选框时间数组:
	function timeCheckBoxsValue(timeStart,timeEnd) {
		
		var item = [];
		for(let i=timeStart;i<=timeEnd;i++) {
			var obj = {};
			obj['label'] = i;
			obj['value'] = i;
			item.push(obj);
		}
		return item;
	}
	// 	当选择秒进行编辑的时候
	

	// 7.方法执行
	// 数字输入框判断
	// if(timelevel>=1&&radioValue>=1) {
	// 	numberRegular(timelevel,radioValue,beforeValue,endValue)
	// }

	// 秒选择框
	const second = timeCheckBoxsValue(0,59);
	// 分钟选择框
	const minute = timeCheckBoxsValue(0,59);
	// 时钟选择框
	const hour = timeCheckBoxsValue(0,23);
	// 日选择框
	const day = timeCheckBoxsValue(1,31);
	// 月选择框
	const month = timeCheckBoxsValue(1,12);
	// 周选择框
	const week = timeCheckBoxsValue(1,7);
	// 年
	// const year = [];
	return (
		<div>
			<Tabs 
				defaultActiveKey="1"
				animated = {false}
				onChange={onTabsChange}
				style={tabsStyle}
				>
			    <TabPane tab="秒" key="1" style={tabPaneStyle}>
			    	<div>
			    		 <RadioGroup onChange={onRadioChange}>
					        <Radio style={radioStyle} value={1}>秒 允许的通配符【, - * / 】</Radio>
					        <Radio style={radioStyle} value={2} checked={checkedCron}>
					        	周期从
					        	<InputNumber style={inputStyle} disabled={selectLevel == '1' ? (selectRadio == '2'? false:true):true} min={1} max={59} onChange={onNumberB} defaultValue={cronDefaultValue[1]} />
					        	到
					        	<InputNumber style={inputStyle} disabled={selectLevel == '1' ? (selectRadio == '2'? false:true):true} min={1} max={59} onChange={onNumberE} defaultValue={cronDefaultValue[2]} />
					        	秒
					        </Radio>
					        <Radio style={radioStyle} value={3} checked={checkedCron}>
					        	从
					        	<InputNumber style={inputStyle} disabled={selectLevel == '1' ? (selectRadio == '3'? false:true):true} min={0} max={59} onChange={onNumberB} defaultValue={cronDefaultValue[0]} />
					        	秒开始,每
					        	<InputNumber style={inputStyle} disabled={selectLevel == '1' ? (selectRadio == '3'? false:true):true} min={0} max={59} onChange={onNumberE} defaultValue={cronDefaultValue[1]} />
					        	秒执行一次
					        </Radio>
					        <Radio style={radioSpecilStyle} value={4}  checked={checkedCron}>
					          	指定
					          	<div style={chackBoxStyle}>
					          		<CheckboxGroup options={second} disabled={selectLevel == '1' ? (selectRadio == '4'? false:true):true} onChange={onCheckBoxsChange} />
					          	</div>
					        </Radio>
					      </RadioGroup>
			    	</div>
			    </TabPane>
			    <TabPane tab="分钟" key="2" style={tabPaneStyle}>
			    	<div>
			    		 <RadioGroup onChange={onRadioChange}>
					        <Radio style={radioStyle} value={1}>分钟 允许的通配符【, - * / 】</Radio>
					        <Radio style={radioStyle} value={2}>
					        	周期从
					        	<InputNumber style={inputStyle} disabled={selectLevel == '2' ? (selectRadio == '2' ? false:true):true} min={1} max={59} onChange={onNumberB} defaultValue={cronDefaultValue[1]} />
					        	到
					        	<InputNumber style={inputStyle} disabled={selectLevel == '2' ? (selectRadio == '2' ? false:true):true} min={1} max={59} onChange={onNumberE} defaultValue={cronDefaultValue[2]} />
					        	分钟
					        </Radio>
					        <Radio style={radioStyle} value={3}>
					        	从
					        	<InputNumber style={inputStyle} disabled={selectLevel == '2' ? (selectRadio == '3' ? false:true):true} min={0} max={59} onChange={onNumberB} defaultValue={cronDefaultValue[0]} />
					        	分钟开始,每
					        	<InputNumber style={inputStyle} disabled={selectLevel == '2' ? (selectRadio == '3' ? false:true):true} min={0} max={59} onChange={onNumberE} defaultValue={cronDefaultValue[1]} />
					        	分钟执行一次
					        </Radio>
					        <Radio style={radioSpecilStyle} value={4}>
					          	指定
					          	<div style={chackBoxStyle}>
					          		<CheckboxGroup options={minute} disabled={selectLevel == '2' ? (selectRadio == '4' ? false:true):true} onChange={onCheckBoxsChange} />
					          	</div>
					        </Radio>
					      </RadioGroup>
			    	</div>
			    </TabPane>
			    <TabPane tab="小时" key="3" style={tabPaneStyle}>
			    	<div>
			    		 <RadioGroup onChange={onRadioChange}>
					        <Radio style={radioStyle} value={1}>小时 允许的通配符【, - * / 】</Radio>
					        <Radio style={radioStyle} value={2}>
					        	周期从
					        	<InputNumber style={inputStyle} disabled={selectLevel == '3' ? (selectRadio == '2' ? false:true):true} min={0} max={23} onChange={onNumberB} defaultValue={cronDefaultValue[1]} />
					        	到
					        	<InputNumber style={inputStyle} disabled={selectLevel == '3' ? (selectRadio == '2' ? false:true):true} min={0} max={23} onChange={onNumberE} defaultValue={cronDefaultValue[2]} />
					        	小时
					        </Radio>
					        <Radio style={radioStyle} value={3}>
					        	从
					        	<InputNumber style={inputStyle} disabled={selectLevel == '3' ? (selectRadio == '3' ? false:true):true} min={0} max={23} onChange={onNumberB} defaultValue={cronDefaultValue[0]} />
					        	小时开始,每
					        	<InputNumber style={inputStyle} disabled={selectLevel == '3' ? (selectRadio == '3' ? false:true):true} min={0} max={23} onChange={onNumberE} defaultValue={cronDefaultValue[1]} />
					        	小时执行一次
					        </Radio>
					        <Radio style={radioSpecilStyle} value={4}>
					          	指定
					          	<div style={chackBoxStyle}>
					          		<CheckboxGroup options={hour} disabled={selectLevel == '3' ? (selectRadio == '4' ? false:true):true} onChange={onCheckBoxsChange} />
					          	</div>
					        </Radio>
					      </RadioGroup>
			    	</div>
			    </TabPane>
			    <TabPane tab="日" key="4" style={tabPaneStyle}>
			    	<div>
			    		 <RadioGroup onChange={onRadioChange}>
					        <Radio style={radioStyle} value={1}>日 允许的通配符【, - * / L W】</Radio>
					        <Radio style={radioStyle} value={2}>
					          	不指定
					        </Radio>
					        <Radio style={radioStyle} value={3}>
					        	周期从
					        	<InputNumber style={inputStyle} disabled={selectLevel == '4' ? (selectRadio == '3' ? false:true):true} min={1} max={31} onChange={onNumberB} defaultValue={cronDefaultValue[1]} />
					        	到
					        	<InputNumber style={inputStyle} disabled={selectLevel == '4' ? (selectRadio == '3' ? false:true):true} min={1} max={31} onChange={onNumberE} defaultValue={cronDefaultValue[2]} />
					        	日
					        </Radio>
					        <Radio style={radioStyle} value={4}>
					        	从
					        	<InputNumber style={inputStyle} disabled={selectLevel == '4' ? (selectRadio == '4' ? false:true):true} min={0} max={31} onChange={onNumberB} defaultValue={cronDefaultValue[1]} />
					        	日开始,每
					        	<InputNumber style={inputStyle} disabled={selectLevel == '4' ? (selectRadio == '4' ? false:true):true} min={0} max={31} onChange={onNumberE} defaultValue={cronDefaultValue[1]} />
					        	天执行一次
					        </Radio>
					        <Radio style={radioStyle} value={5}>
					        	每月
					        	<InputNumber style={inputStyle} disabled={selectLevel == '4' ? (selectRadio == '5' ? false:true):true} min={0} max={31} defaultValue={cronDefaultValue[1]} onChange={onNumberOne} />
					        	号最近的那个工作日
					        </Radio>
					        <Radio style={radioStyle} value={6}>
					          	本月最后一天
					        </Radio>
					        <Radio style={radioSpecilStyle} value={7}>
					          	指定
					          	<div style={chackBoxStyle}>
					          		<CheckboxGroup options={day} disabled={selectLevel == '4' ? (selectRadio == '7' ? false:true):true} onChange={onCheckBoxsChange} />
					          	</div>
					        </Radio>
					      </RadioGroup>
			    	</div>
			    </TabPane>
			    <TabPane tab="月" key="5" style={tabPaneStyle}>
			    	<div>
			    		 <RadioGroup onChange={onRadioChange}>
					        <Radio style={radioStyle} value={1}>月 允许的通配符【, - * /】</Radio>
					        <Radio style={radioStyle} value={2}>
					          	不指定
					        </Radio>
					        <Radio style={radioStyle} value={3}>
					        	周期从
					        	<InputNumber style={inputStyle} disabled={selectLevel == '5' ? (selectRadio == '3' ? false:true):true} min={1} max={12} onChange={onNumberB} defaultValue={cronDefaultValue[1]} />
					        	到
					        	<InputNumber style={inputStyle} disabled={selectLevel == '5' ? (selectRadio == '3' ? false:true):true} min={1} max={12} onChange={onNumberE} defaultValue={cronDefaultValue[12]} />
					        	月
					        </Radio>
					        <Radio style={radioStyle} value={4}>
					        	从
					        	<InputNumber style={inputStyle} disabled={selectLevel == '5' ? (selectRadio == '4' ? false:true):true} min={1} max={12} onChange={onNumberB} defaultValue={cronDefaultValue[1]} />
					        	月开始,每
					        	<InputNumber style={inputStyle} disabled={selectLevel == '5' ? (selectRadio == '4' ? false:true):true} min={1} max={12} onChange={onNumberE} defaultValue={cronDefaultValue[1]} />
					        	月执行一次
					        </Radio>
					        <Radio style={radioSpecilStyle} value={5}>
					          	指定
					          	<div style={chackBoxStyle}>
					          		<CheckboxGroup options={month} disabled={selectLevel == '5' ? (selectRadio == '5' ? false:true):true} onChange={onCheckBoxsChange} />
					          	</div>
					        </Radio>
					      </RadioGroup>
			    	</div>
			    </TabPane>
			    <TabPane tab="周" key="6" style={tabPaneStyle}>
			    	<div>
			    		 <RadioGroup onChange={onRadioChange}>
					        <Radio style={radioStyle} value={1}>周 允许的通配符【, - * / L #】</Radio>
					        <Radio style={radioStyle} value={2}>
					          	不指定
					        </Radio>
					        <Radio style={radioStyle} value={3}>
					        	周期从星期
					        	<InputNumber style={inputStyle} disabled={selectLevel == '6' ? (selectRadio == '3' ? false:true):true} min={1} max={7} onChange={onNumberB} defaultValue={cronDefaultValue[1]} />
					        	到
					        	<InputNumber style={inputStyle} disabled={selectLevel == '6' ? (selectRadio == '3' ? false:true):true} min={1} max={7} onChange={onNumberE} defaultValue={cronDefaultValue[2]} />
					        	日
					        </Radio>
					        <Radio style={radioStyle} value={4}>
					        	第
					        	<InputNumber style={inputStyle} disabled={selectLevel == '6' ? (selectRadio == '4' ? false:true):true} min={1} max={7} onChange={onNumberB} defaultValue={cronDefaultValue[1]} />
					        	周的星期
					        	<InputNumber style={inputStyle} disabled={selectLevel == '6' ? (selectRadio == '4' ? false:true):true} min={1} max={7} onChange={onNumberE} defaultValue={cronDefaultValue[1]} />
					        </Radio>
					        <Radio style={radioStyle} value={5}>
					          	本月最后一个星期
					          	<InputNumber style={inputStyle} disabled={selectLevel == '6' ? (selectRadio == '5' ? false:true):true} min={1} max={7} defaultValue={cronDefaultValue[1]} onChange={onNumberOne} />
					        </Radio>
					        <Radio style={radioSpecilStyle} value={6}>
					          	指定
					          	<div style={chackBoxStyle}>
					          		<CheckboxGroup options={week} disabled={selectLevel == '6' ? (selectRadio == '6' ? false:true):true} onChange={onCheckBoxsChange} />
					          	</div>
					        </Radio>
					      </RadioGroup>
			    	</div>
			    </TabPane>
			    <TabPane tab="年" key="7" style={tabPaneStyle}>
			    	<div>
			    		 <RadioGroup onChange={onRadioChange}>
					        <Radio style={radioStyle} value={1}>不指定 允许的通配符【, - * / L #】</Radio>
					        <Radio style={radioStyle} value={2}>
					          	每年
					        </Radio>
					        <Radio style={radioStyle} value={3}>
					        	周期从
					        	<InputNumber style={inputStyle} disabled={selectLevel == '7' ? (selectRadio == '3' ? false:true):true} min={2016} max={2200} onChange={onNumberB} defaultValue={cronDefaultValue[15]} />
					        	到
					        	<InputNumber style={inputStyle} disabled={selectLevel == '7' ? (selectRadio == '3' ? false:true):true} min={2016} max={2200} onChange={onNumberE} defaultValue={cronDefaultValue[16]} />
					        	年
					        </Radio>
					      </RadioGroup>
			    	</div>
			    </TabPane>
			</Tabs>
		</div>
	)
}

export default cronEdit;