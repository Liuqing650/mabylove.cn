import React from 'react';
import { Spin,Row,Col,Rate, Icon } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw,convertFromHTML,ContentState,EditorState } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown'
import styles from '../BlogInfo/blogStyle.less';
import editStyles from '../BlogInfo/BlogEditStyle.less';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import storage from '../../../utils/browserData';

const blogDetail = ({
	detailLoading,
	onHide,
	authorInfo,
	blogINfo,
	contentState,
	starObj,
	onStarChange,
}) => {
	function starChange(star) {
		const obj={};
		obj['star']=star;
		obj['blog_id']=blogINfo.blog_id;
		obj['user_id']=storage.isLogin?storage.userId:null;
		obj['click']=!starObj.click;
		onStarChange(obj);
	}
	const starColor = starObj&&starObj.click?'#f40044':'#eee';
	return (
		<div className={styles.detailWrapper}>
			<div className={styles.topDetaiStyle}>
				<h2 onClick={onHide}>详细页面</h2>
				<div className={styles.topWrapper}>
					<div className={styles.topDetaiStyle}>
						<div className={styles.topDetaiSub}>
							<div className={styles.topLeft}>
								<h2 className={styles.blogDetailTitle}>{blogINfo&&blogINfo.blog_name?blogINfo.blog_name:'加载中...'}</h2>
							</div>
						</div>
					</div>
					<Row>
						<Col span={3} offset={2} >
							<div className={styles.blogDetailCenter}>
								<span>作者：</span>
								<span>{authorInfo&&authorInfo.author_name?authorInfo.author_name:'加载中...'}</span>
							</div>
						</Col>
						<Col  span={6} offset={1} >
							<div className={styles.blogDetailCenter}>
								<span>积分：</span>
								<span>{blogINfo&&blogINfo.star?blogINfo.star:'0'}</span>
								<span style={{width:10,display:'inline-block'}}></span>
								<Icon onClick={() =>starChange(blogINfo.star)} style={{color:`${starColor}`}} type="api" />
							</div>
						</Col>
						<Col  span={3} offset={1} >
							<div className={styles.blogDetailCenter}>
								<span>阅读：</span>
								<span>80</span>
							</div>
						</Col>
						<Col  span={6} offset={1} >
							<div className={styles.blogDetailDateCenter}>
								<span>发布：</span>
								<span>{blogINfo&&blogINfo.blog_time?blogINfo.blog_time:'加载中...'}</span>
							</div>
						</Col>
					</Row>
				</div>
			</div>
			<div>
				<Spin tip="加载内容中..." spinning={detailLoading}>
					<Editor 
				  		toolbarClassName={editStyles.toolbar} 
				  		wrapperClassName={editStyles.wrapper} 
				  		editorClassName={editStyles.editor}
				  		toolbarHidden
				  		readOnly={true}
				  		contentState={contentState?contentState:null} />
				</Spin>
			</div>
		</div>
	)
}

export default blogDetail;