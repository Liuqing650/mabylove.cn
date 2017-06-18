import React, { Component, PropTypes } from 'react';
import { Input, InputNumber,Row,Col,message,Icon, Tag, Button } from 'antd';

const controllerStyle = {
	margin: '5px 0',
}
const cronContent = {
	minHeight: '230px',
	padding: '20px 5',
	border: '1px solid #ccc',
}

const controllerTopStyle = {
	margin: '5px',
}

const timeNameStyle = {
	textAlign: 'center',
	color: 'rgba(0,159,254,1)'
}

const tabStyle = {
}

const rowMarginStyle = {
	marginBottom: '10px',
}

function cronController({
	secondValue,
	minuteValue,
	hourValue,
	dayValue,
	monthValue,
	weekValue,
	yearValue,
	cronValue,
	cronViewDate,
	CronViews,

	onAnalyze,
}) {	
	function onSubmit() {
		const cronItem = cronValue;
		const errorMsg = "您的表达式不完整,无法解析";
		console.log('secondValue--->',secondValue);
		const judge = judgeValue(secondValue,errorMsg)&&judgeValue(minuteValue,errorMsg)&&judgeValue(hourValue,errorMsg)&&judgeValue(monthValue,errorMsg);
		
		console.log('judge--->',judge);
		if(judge&&cronItem) {
			onAnalyze(cronItem)
		} else if(!cronItem) {
			message.error("您还没有任何表达式,无法解析");
		}
	}

	// 验证是否有空的数据
	function judgeValue(value,message) {
		var result = false;
		if(value) {
			result = true;
		} else {
			message.error(message);
			result = false;
		}
		return result;
	}

	function onChange(value) {
	  // console.log('changed', value);
	}
	
    if(cronViewDate.length>0) {
    	CronViews = cronViewDate.map((item) => {
	    return  (
				<p key={item.key} title={item.cronItem}>{item.cronItem}</p>
			);      	
		});
    }
	return (
		<div style={controllerStyle}>
			<div style={cronContent}>
				<div style={controllerTopStyle}>
				    <Row gutter={16} style={rowMarginStyle}>
				      <Col className="gutter-row" span={3} offset={3}>
				        <div className="gutter-box" style={timeNameStyle}>秒</div>
				      </Col>
				      <Col className="gutter-row" span={3}>
				        <div className="gutter-box" style={timeNameStyle}>分钟</div>
				      </Col>
				      <Col className="gutter-row" span={3}>
				        <div className="gutter-box" style={timeNameStyle}>小时</div>
				      </Col>
				      <Col className="gutter-row" span={3}>
				        <div className="gutter-box" style={timeNameStyle}>天</div>
				      </Col>
				      <Col className="gutter-row" span={3}>
				        <div className="gutter-box" style={timeNameStyle}>月</div>
				      </Col>
				      <Col className="gutter-row" span={3}>
				        <div className="gutter-box" style={timeNameStyle}>周</div>
				      </Col>
				      <Col className="gutter-row" span={3}>
				        <div className="gutter-box" style={timeNameStyle}>年</div>
				      </Col>
				    </Row>
				    <Row gutter={16} style={rowMarginStyle}>
				      <Col className="gutter-row" span={3}>
				        <div className="gutter-box" style={tabStyle}>
				        	<Tag color="#108ee9">表达式字段</Tag>
				        </div>
				      </Col>
				      <Col className="gutter-row" span={3}>
				        <Input value={secondValue} onChange={onChange} />
				      </Col>
				      <Col className="gutter-row" span={3}>
				        <Input value={minuteValue} onChange={onChange} />
				      </Col>
				      <Col className="gutter-row" span={3}>
				        <Input value={hourValue} onChange={onChange} />
				      </Col>
				      <Col className="gutter-row" span={3}>
				        <Input value={dayValue} onChange={onChange} />
				      </Col>
				      <Col className="gutter-row" span={3}>
				        <Input value={monthValue} onChange={onChange} />
				      </Col>
				      <Col className="gutter-row" span={3}>
				        <Input value={weekValue} onChange={onChange} />
				      </Col>
				      <Col className="gutter-row" span={3}>
				        <Input value={yearValue} onChange={onChange} />
				      </Col>
				    </Row>
				    <Row gutter={16} style={rowMarginStyle}>
				      <Col className="gutter-row" span={3}>
				        <div className="gutter-box" style={tabStyle}>
				        	<Tag color="#108ee9">Cron表达式</Tag>
				        </div>
				      </Col>
				      <Col className="gutter-row" span={18}>
				        <Input  value={cronValue} onChange={onChange} />
				      </Col>
				      <Col className="gutter-row" span={3}>
				        <Button type="primary" style={{width:"100%"}} onClick={onSubmit} icon="poweroff">
				          反解析到UI
				        </Button>
				      </Col>
				    </Row>
			        <div>
			        	最近5次运行时间：
			        </div>
			        <div>
			        	{CronViews}
			        </div>
				</div>
			</div>
		</div>
	)
}

export default cronController;