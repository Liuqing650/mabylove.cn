import React from 'react';
import { Spin,message, Button ,Row,Col,Input,Icon,Select,Tag,Form } from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { convertToRaw,ContentState,EditorState } from 'draft-js';
import styles from '../BlogInfo/blogStyle.less';
import editStyles from '../BlogInfo/BlogEditStyle.less';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import storage from '../../../utils/browserData';

const blogEditor = ({
	editLoading,
	editorContent,
	blogEditData,
	onEditBlogChange,
	onColseEdit,
	blogType,
	addBlog,
	onTitleChange,
	onSubTitleChange,
	onAutoClick,
	onSelectType,
}) => {
	const InputGroup = Input.Group;
	const Option = Select.Option;
	function hanldBlog() {
		const obj={};
		const jsonData = editorContent&&editorContent!=null?JSON.stringify(convertToRaw(editorContent.getCurrentContent())):null;	
		obj['user_id'] = blogEditData.userId?blogEditData.userId:storage.userId;
		obj['blog_title'] = blogEditData.blogTitle?blogEditData.blogTitle:null;
		obj['blog_state'] = blogEditData.blogState?blogEditData.blogState:"1";
		obj['blog_type'] = blogEditData.blogType;
		obj['description'] = blogEditData.subContent;
		obj['content'] = jsonData;

		const judgeType = judgeBlog(obj.blog_type,'文章类型 还没有选择，请选择!');
		const judgeTitle = judgeBlog(obj.blog_title,'文章标题 没有填写完整!');
		const judgeDescription = judgeBlog(obj.description,'文章描述没有填写,可以点击【一键补全】');
		const judgeContent = judgeBlog(obj.content,'文章内容不能为空');

		if (judgeType&&judgeTitle&&judgeDescription&&judgeContent) {
			addBlog(obj);
		}
	}

	// 博客内容验证
	function judgeBlog(data,msg) {
		var result = true;
		if(data==null) {
			const errorMsg = "不能发布，您的 "+msg;
			message.error(errorMsg);
			result = false;
		}
		return result;
	}

	const onDraftEditorChange = (editorContent) => {
	    onEditBlogChange(editorContent);
	}

	const onTabChange = (event) =>　{
		// 阻止原生事件发生;
		event.preventDefault();
		message.info('很抱歉,目前还不支持制表符缩进功能!');
	}

	const loopSelect =  data => data.map((item,index) => {
		const type_id = item.id.toString();
		return (
			<Option key={index} value={type_id}>{item.type_name}</Option>
		)
	})

	const selectOption = loopSelect(blogType);

	return (
		<div className={styles.detailWrapper}>
			<Spin tip="发布中，请稍等..." spinning={editLoading}>
				<div className={styles.topDetaiStyle}>
					<h2 onClick={onColseEdit}>发布文章</h2>
					<div className={styles.topToolStyle}>
						<Row className={styles.rowWrapper}>
							<Col span={3} offset={1}>
								<div className={styles.labelStyle}>文章主题：</div>
							</Col>
							<Col span={14}>
								<div>
									<InputGroup compact>
										<Select 
											onSelect={onSelectType}
											style={{ width: '20%' }}  
											placeholder="请选择类型">
								            {selectOption}
								        </Select>
										<Input style={{ width: '80%' }} onBlur={(e)=>{onTitleChange(e.target.value)}} placeholder="请输入您的标题" />
									</InputGroup>
								</div>
							</Col>
							<Col span={4} offset={1}>
								<div>
									<Button size="default" onClick={hanldBlog} type="primary"><Icon type="export" />发布文章</Button>
								</div>
							</Col>
						</Row>
						<Row className={styles.rowWrapper}>
							<Col span={3} offset={1}>
								<div className={styles.labelStyle}>简要描述：</div>
								<Tag color="#f50" onClick={onAutoClick} className={styles.unSelectText} title="自动补全">一键补全</Tag>
							</Col>
							<Col span={17}>
								<div>
									<Input type="textarea" value={blogEditData.subContent} rows={4} onChange={(e)=>{onSubTitleChange(e.target.value)}} placeholder="请对下文的内容进行简要的描述，也可以复制一段下文内容" />
								</div>
							</Col>
						</Row>
					</div>
				</div>
				<div>
					<Editor 
				  		toolbarClassName={editStyles.toolbar} 
				  		wrapperClassName={editStyles.wrapper} 
				  		editorClassName={editStyles.editor}
				  		onTab={onTabChange}
				  		placeholder="你的写作之路，从这里开始..."
				  		localization={{ locale: 'zh', translations: {'generic.add': '添加'} }}
				  		editorState={editorContent}
				  		onEditorStateChange={onDraftEditorChange} />
				</div>
			</Spin>
		</div>
	)
}
export default blogEditor;