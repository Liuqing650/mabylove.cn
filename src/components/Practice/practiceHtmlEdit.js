import React from 'react';
import { Input } from 'antd';
const practiceHtmlEdit = ({
	onHtmlChange,
	sizeValue,
	htmlValue,
}) => {
	function onChange(value) {
		onHtmlChange(value);
	}

function editTab(event) {
	if(event.keyCode===9) {
		// 阻止原生事件发生;
		event.preventDefault();
        var indent = '	';
        var start = event.target.selectionStart;
        var end = event.target.selectionEnd;
        var selected = window.getSelection().toString();
        selected = indent + selected.replace(/\n/g,'\n'+indent);
        event.target.value = event.target.value.substring(0,start) + selected + event.target.value.substring(end);
        event.target.setSelectionRange(start+indent.length,start+selected.length);
	}
}
	return (
		<div>
			<h4>HTML编辑功能<a href="#">如何使用？</a></h4>
			<Input 
				type="textarea" 
				style={{fontSize:`${sizeValue}px`}}
				rows={20} 
				value={htmlValue}
				onKeyDown={editTab}
				onChange={(e)=>{onChange(e.target.value)}}
			/>
		</div>
	)
}

export default practiceHtmlEdit;