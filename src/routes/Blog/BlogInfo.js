import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import {hashHistory} from 'dva/router';
import BlogTop from '../../components/Blog/BlogInfo/blogTop';
import BlogContent from '../../components/Blog/BlogInfo/blogContent';
// import BlogDetail from '../../components/Blog/BlogInfo/blogDetail';
import BlogRight from '../../components/Blog/BlogInfo/blogRight';
// import BlogEdit from '../../components/Blog/BlogInfo/blogEdit';
import styles from './BlogStyle.less';

function BlogInfo({dispatch,location,blog}) {

	const {
		background,
		selectColor,alphaColor,blogType,blogList,listLoading,
	} = blog;

	const BlogTopProps = {};

	const BlogContentProps = {
		blogType: blogType,
		listLoading: listLoading,
		blogList: blogList,
		onShow(blog_id) {
			dispatch({
				type:'blog/showDetailPage',
				payload: blog_id,
			})
		},
		tabsChange(key) {
			dispatch({
				type:'blog/tabsChange',
				payload: key,
			})
		},
	};

	const BlogRightProps = {
		background:background,
		selectColor:selectColor,
		alphaColor:alphaColor,
		changeColor(colorObj) {
			dispatch({
				type:'blog/changeColor',
				payload: colorObj,
			})
		},
		onShowEdit(userInfo) {
			dispatch({
				type:'blog/editBlog',
				payload: userInfo,
			})
		},
		onShowBlog() {
			dispatch({
				type:'blog/showBlog',
			})
		},
	};

	// 状态改变区
	let docH = document.body.clientHeight;
	let docW = document.body.clientWidth;
	const leftSpan = docW<1000?24:(docW>1400?20:18);
	const rightSpan = docW<1000?0:(docW>1400?4:6);
	const rightPosition = docW<1000?0:(docW>1400?50:30);
  return (
	    <div 
	    	className={styles.blogWrapper}
	    	style={{minHeight:`${docH-144}px`,background:`${background}`}}>
	    	<Row type="flex" justify="space-around">
				<Col span={leftSpan}>
					<BlogTop {...BlogTopProps} />
					<BlogContent {...BlogContentProps} />
				</Col>
				<Col span={rightSpan} className={styles.rightWrapper}>
					<div style={{'position': 'fixed',right:`${rightPosition}px`}}>
						<BlogRight {...BlogRightProps} />
					</div>
				</Col>
    		</Row>
	    </div>
  );
}

export default connect(({blog})=>({blog}))(BlogInfo);
