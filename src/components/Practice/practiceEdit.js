import React,{ Component } from 'react';
import RichTextEditor from 'react-rte-image';

 function practiceEdit({
 	value,
 	onChange,
 }) {
 	const toolbarConfig = {
    display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS','IMAGE_BUTTON', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS','COLOR_PI'],
    INLINE_STYLE_BUTTONS: [
      {label: '加粗', style: 'BOLD', className: 'custom-css-class'},
      {label: '斜体', style: 'ITALIC'},
      {label: '下划线', style: 'UNDERLINE'},
      {label: '删除线', style: 'STRIKETHROUGH'},
      {label: 'Monospace', style: 'CODE'},
    ],
    BLOCK_TYPE_DROPDOWN: [
      {label: '正常', style: 'unstyled'},
      {label: '一号', style: 'header-one'},
      {label: '二号', style: 'header-two'},
      {label: '三号', style: 'header-three'},
      {label: '四号', style: 'header-four'},
      {label: '五号', style: 'header-five'},
      {label: '六号', style: 'header-six'},
      {label: '代码块', style: 'code-block'},
    ],
    BLOCK_TYPE_BUTTONS: [
      {label: '无序标签', style: 'unordered-list-item'},
      {label: '有序标签', style: 'ordered-list-item'},
      {label: '强调', style: 'blockquote'},
    ],
    LINK_BUTTONS: [
      {label:'link', style:'image'},
    ],
  };
  // 只读属性
  // readOnly={true}
 	return (
 		<div>
 			<RichTextEditor
        className="rte-editor"
 				 toolbarConfig={toolbarConfig}
		        value={value}
		        onChange={onChange}
		      />
 		</div>
 	)
 }

 export default practiceEdit;