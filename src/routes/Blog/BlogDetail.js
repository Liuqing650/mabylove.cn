import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import BlogRight from '../../components/Blog/BlogInfo/blogRight';
import DetailComponents from '../../components/Blog/BlogDetail/blogDetail';
import BlogComment from '../../components/Blog/BlogDetail/blogComment';
import CommentModal from '../../components/Blog/BlogDetail/commentModal';
import styles from './BlogStyle.less';

function BlogDetail({dispatch,location,blog}) {

	const {
		background,
		selectColor,alphaColor,blogType,
		commentList,commentVisible,
		contentState,starObj,authorInfo,blogINfo,detailLoading,user_id,
	} = blog;
	
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

	const ComponentModalProps = {
		visible: commentVisible,
		blog_id: blogINfo.blog_id,
		user_id: user_id,
		onSubmit(obj) {
			dispatch({
				type:'blog/onAddComment',
				payload: obj,
			})
		},
		onCancel() {
			dispatch({
				type:'blog/onHideModal'
			})
		},
	}

	const BlogCommentProps = {
		commentList: commentList,
		onShowCommentModal() {
			dispatch({
				type:'blog/onShowModal',
			})
		}
	};

	const DetailComponentsProps = {
		starObj:starObj,
		contentState:contentState,
		authorInfo:authorInfo,
		detailLoading: detailLoading,
		blogINfo:blogINfo,
		onHide() {
			dispatch({
				type:'blog/onHideDetail',
			})
		},
		onStarChange(obj) {
			dispatch({
				type:'blog/addStar',
				payload: obj,
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
					<DetailComponents {...DetailComponentsProps}/>
					<BlogComment { ...BlogCommentProps }/>
					<CommentModal {...ComponentModalProps} />
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

export default connect(({blog})=>({blog}))(BlogDetail);
