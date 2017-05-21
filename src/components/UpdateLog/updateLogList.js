import React from 'react';
import { Spin,Tabs,Tag,Button,Icon } from 'antd';
const TabPane = Tabs.TabPane;

const tapsPosition = {
	width: '60%',
	margin: '0 auto',
	position: 'relative',
	zIndex: '10',
}

const tagStyle = {
	margin: '10px 0',
	fontSize: '20px',
}

const spanStyle = {
	fontSize: '14px',
	fontWeight: '700',
	fontFamily: 'Microsoft YaHei',
	color:'#108ee9',
}

const logContentStyle = {
	fontSize: '14px',
	margin: '10px 10px',
}

const toolButton = {
	position: 'fixed',
    display: 'block',
    zIndex: '999',
	bottom: '100px',
	right: '100px',
}

function updateLogList({
	list,
	tabPosition= 'left',
	defaultTabKey,
	onEdit,
	logTag,
	loading,
}) {

	if(list.length>0) {
		logTag = list.map((item) => {
	 	return (<TabPane tab={item.version} key={item.order}>
 				<Tag color={item.grade=='1'?"#f50":"#87d068"} style={tagStyle}>{item.author}</Tag>&nbsp;&nbsp;&nbsp;&nbsp;{item.create_time}<br />
 				<pre style={logContentStyle}>
 					<span style={spanStyle}>更新内容：</span><br />
 					{item.update_log}
 				</pre>
	 		</TabPane>)
		})
	}
	return (
		<div style={tapsPosition}>
			<div style={toolButton}>
				<Button type="dashed" onClick={onEdit} size="large"><Icon type="plus-square-o" />添加新的更新内容</Button>
			</div>
			<Spin tip="加载更新日志中..." spinning={loading}>
				<Tabs 
					tabPosition={tabPosition}
					defaultActiveKey={defaultTabKey}
				>
					{logTag}
				</Tabs>
			</Spin>
		</div>
	)
}

export default updateLogList;