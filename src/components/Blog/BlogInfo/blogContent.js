import React from 'react';
import ReactDOM from 'react-dom';
import QueueAnim from 'rc-queue-anim';
import { Spin,Tabs,Row, Col,Tag,Icon } from 'antd';
import styles from './blogStyle.less';
import webUrl from '../../../utils/webResUrl';

const blogContent = ({
	blogType,
	blogList,
	listLoading,
	onShow,
	tabsChange,
}) => {
	// console.log("blogList==========>",blogList)
	const TabPane = Tabs.TabPane;
	// 获取到屏幕高度。
	const screenHeight = document.body.clientHeight-238;
	// 改变tabs
	function onTabChange(index) {
		var key = 1;
		for(let i=0;i<blogType.length;i++) {
			if(blogType[i].index==index) {
				key = blogType[i].id;
			}
		}
		tabsChange(key)
	}
	// 遍历博客内容
	const loop = data => data.map((item,index) => {
		// 截取部分文字
		var blogPartContent = cutBlog(item.description)
		function cutBlog(text) {
			var maxlength = 60;
			var len = text.length;
			var cutText = '';
			if(len>maxlength) {
				cutText=text.substring(0,maxlength)+'...';
			} else {
				cutText = text;
			}
			return cutText;
		}

		return (
			<div key={item.blog_id} className={styles.listWrapper}>
				<div className={styles.listStyle}>
					<div className={styles.clearfix}>
						<div className={styles.listLeft}>
							<div className={styles.leftStyle}>
								<img src={item.avatar?item.avatar:webUrl.default.headPic}  className={styles.listLeftPic}/>
							</div>
						</div>
						<div className={styles.listRight}>
							<div className={styles.topStyle} onClick={() => {onShow(item.blog_id)}}>
								<span className={styles.topleft}><Tag color="#00A854"><span className={styles.topleftText}>{item.nick_name}</span></Tag></span>
								<span className={styles.topCenter}>{item.blog_name}</span>
								<span className={styles.topRight}>{item.blog_time}</span>
							</div>
							<div className={styles.lineStyle}></div>
							<div className={styles.centerStyle} onClick={() => {onShow(item.blog_id)}}>
								<div className={styles.blogItem}>
									<span style={{width:40,display:"inline-block"}}></span>
									<a onClick={()=>{console.log(item.blog_id)}}>{blogPartContent}</a>
								</div>
							</div>
							<div className={styles.bottomStyle}>
								<Icon type="like-o" />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	})

	const dataType = blogType;
	// 遍历分类标签
	const loopTags = dataType.map((item,index) => {
		var type = item.id;
		var arr = [];
		for(let i=0;i<blogList.length;i++) {
			if(blogList[i].type==type) {
				arr=blogList[i].list;
			}
		}
		return (
			 <TabPane key={item.index} tab={<span className={styles.unSelectTextTabs}>{item.type_name}</span>}>
          		<Spin tip="加载内容中..." spinning={listLoading}>
		    		<QueueAnim 
		    			delay={300}
						 type={['right', 'left']}
	          			ease={['easeOutQuart', 'easeInOutQuart']}>
				 			{loop(arr)}
		    		</QueueAnim>
				</Spin>
			 </TabPane>
		)
	})
  	return (
	    <div className={styles.blogContentWrapper}>
	    	<div className="my-tabs-style">
	    		<Tabs 
	    			type="card" 
	    			animated={true} 
	    			defaultActiveKey="1"
	    			onTabClick={onTabChange}
	    		>
	    			{loopTags}
	    		</Tabs>
	    	</div>
	    </div>
  	);
};

export default blogContent;
