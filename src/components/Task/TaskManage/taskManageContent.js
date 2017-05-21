import React from 'react';
import { Icon,Row, Col } from 'antd';
import TweenOne from 'rc-tween-one';
import styles from './taskStyle.less';
import webUrl from '../../../utils/webResUrl';

function taskManageContent({

}) {
	const taskPic = webUrl.taskPic;
	const taskMenuData = [
		{name:'创建任务',src:taskPic.create.md,color:'#03A9F4',href:'#/task/newtask'},
		{name:'任务管理',src:taskPic.manage.md,color:'#8bc34a',href:'#/task/allot'},
		{name:'执行任务',src:taskPic.execute.md,color:'#ffc107',href:'#/task/execute'},
		{name:'任务进度',src:taskPic.echarts.md,color:'#f3135f',href:'#/task/progress'},
	]
	const loopCard = data => data.map((item,index) => {
		return (
			<Col span={4} key={index}>
				<div 
					className={styles.taskChildWrapper}
					> 
						<TweenOne
					        animation={{ y: '+=30', opacity: 0, type: 'from' }}
		    				reverseDelay={300}
					    >
							<a href={item.href} className={styles.iconStyle}>
								<img src={item.src} className={styles.taskImgStyle} type={item.icon} />
							</a>
							<a href={item.href}><h2 className={styles.taskTextStyle}>{item.name}</h2></a>
						</TweenOne>
				</div>
			</Col>
		);
	});
	const taskMenuNode = loopCard(taskMenuData);
	return (
		<div>
			<Row type="flex" justify="space-around" align="middle">
			    {taskMenuNode}
			</Row>
		</div>
	)
}

export default taskManageContent;