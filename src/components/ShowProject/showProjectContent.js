import React from 'react';
import { Layout,Breadcrumb,Card,Icon,Popover } from 'antd';
import styles from './showProjectStyle.less';
import {hashHistory} from 'react-router';

const showProjectContent = ({
	projectList,
	popoverVisible,
	onPoverClick,
}) => {
	const { Header, Footer, Sider, Content } = Layout;
	const tip = <span>不要点我啦!!!</span>;
	const contentPop = (
	  <div>
	    <p>我还没有想好下面的事情呢Q_Q</p>
	    <p>如果你有好的想法,请亲亲<a href="#">告诉我</a></p>
	  </div>
	);
	// <img alt="example" width="100%" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />


	function onRightClick(src) {
		hashHistory.push(src);
	}

	const Cards =  projectList.map((item,index) => {
		return (
			 <Card title={item.name} key={index}
			 	onClick={() =>{item.state=='0'?onPoverClick():onRightClick(item.src)}}
			  extra={
			 	 <Popover
			 	 	title={<h4 onClick={onPoverClick}>{tip}</h4>}
			        content={contentPop}
			        trigger="click"
			        visible={item.state=='0'?popoverVisible:false}
			      >
			 		<a onClick={() =>{item.state=='0'?onRightClick():onRightClick(item.src)}}>{item.go}</a>
			 	 </Popover>
			 } className={styles.cardStyle}>
			    <p className={styles.unSelectText}>{item.content}</p>
			    <p className={styles.unSelectText}>{item.descript}</p>
			  </Card>
		);
	});

	return (
		<div>
			<Layout>
				<Content style={{ padding: '0 50px' }}>
				  <Breadcrumb style={{ margin: '12px 0' }}>
				    <Breadcrumb.Item>Home</Breadcrumb.Item>
				  </Breadcrumb>
				  <div className={styles.contentStyle}>
				  		<div className={styles.clearfix}>{Cards}</div>
				  </div>
				</Content>
			    <Footer style={{ textAlign: 'center' }}>
			    </Footer>
			</Layout>
		</div>
	);
}

export default showProjectContent;
