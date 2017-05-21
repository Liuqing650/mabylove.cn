import React from 'react'
import { Editor } from 'react-draft-wysiwyg'
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import draftToMarkdown from 'draftjs-to-markdown'
import { Row, Col } from 'antd';
import styles from './Editor.less'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


class draftJsEdit extends React.Component {
	constructor (props) {
	    super(props)
	    this.state = {
	      editorContent: null,
	    }
	}
	onDraftEditorChange = (editorContent) => {
	    this.setState({
	      editorContent,
	    })
	}

	 editDraftTab = (event) => {
	 	if(event.keyCode===9) {
		 	event.preventDefault();
		 }
	}
	render () {
		 const { editorContent } = this.state;
		 // console.log('editorContent--->',editorContent)
		 // readOnly={true}
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
		 return (
		 	<Row>
		 		<Col {...colProps}>
		 			<Editor 
				  		toolbarClassName={styles.toolbar} 
				  		wrapperClassName={styles.wrapper} 
				  		editorClassName={styles.editor} 
				  		onTab={this.editDraftTab}
				  		editorState={editorContent}

				  		onEditorStateChange={this.onDraftEditorChange} />
		 		</Col>
		 		<Col {...colProps}>
		 			<textarea
		              style={textareaStyle}
		              disabled
		              value={editorContent ? draftToHtml(convertToRaw(editorContent.getCurrentContent())) : ''}
		            />
		 		</Col>
		 	</Row>
		 	
  		)
	}
 
}

export default draftJsEdit;
