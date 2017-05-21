import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { convertToRaw,convertFromHTML,ContentState,EditorState } from 'draft-js';
import draftToMarkdown from 'draftjs-to-markdown'
import { Row, Col } from 'antd';
import styles from './Editor.less'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


const practiceTextEdit =({
	editorContent,
	editorState,
	onDraftWysTextEditChange,
}) => {
	const onDraftEditorChange = (editorContent) => {
	    onDraftWysTextEditChange(editorContent);
	}

	const editDraftTab = (event) => {
	 	if(event.keyCode===9) {
		 	event.preventDefault();
		 }
	}
	const colProps = {
	      span: 12,
	}
    const textareaStyle = {
      minHeight: 496,
      width: '100%',
      background: '#f7f7f7',
      borderColor: '#F1F1F1',
      padding: '16px 8px',
    }
    // editorState 是写入数据
    // contentState 是读取数据
	 return (
	 	<Row>
 			<Editor 
		  		toolbarClassName={styles.toolbar} 
		  		wrapperClassName={styles.wrapper} 
		  		editorClassName={styles.editor} 
		  		onTab={editDraftTab}
		  		localization={{ locale: 'zh', translations: {'generic.add': '添加'} }}
		  		editorState={editorContent}
		  		onEditorStateChange={onDraftEditorChange} />
	 	</Row>
	)
 
}

export default practiceTextEdit;
