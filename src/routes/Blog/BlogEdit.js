import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import BlogRight from '../../components/Blog/BlogInfo/blogRight';
import BlogEditor from '../../components/Blog/BlogEdit/blogEditor';
import styles from './BlogStyle.less';

function BlogEdit({dispatch,location,blog}) {

	const {
		background,
		selectColor,alphaColor,blogType,
		showEdit,editorContent,blogEditData,editLoading,
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

	const BlogEditorProps = {
		editLoading: editLoading,
		editorContent:editorContent,
		background:background,
		blogType:blogType,
		blogEditData:blogEditData,
		onEditBlogChange(editorContent) {
			dispatch({
				type:'blog/onEditBlog',
				payload: editorContent,
			})
		},
		onAutoClick() {
			dispatch({
				type: 'blog/onAutoContent',
			})
		},
		addBlog(obj) {
			dispatch({
				type:'blog/addBlog',
				payload: obj,
			})
		},
		onColseEdit() {
			dispatch({
				type:'blog/onHideEdit',
			})
		},
		onSelectType(type) {
			dispatch({
				type:'blog/selectType',
				payload: type,
			})
		},
		onTitleChange(title) {
			dispatch({
				type:'blog/titleChange',
				payload: title,
			})
		},
		onSubTitleChange(subTitle) {
			dispatch({
				type:'blog/subTitleChange',
				payload: subTitle,
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
					<BlogEditor {...BlogEditorProps}/>
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

export default connect(({blog})=>({blog}))(BlogEdit);
