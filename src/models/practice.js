import React from 'react';
import { parse } from 'qs';
import {query} from '../services/practice';
import RichTextEditor from 'react-rte-image';
import { convertToRaw,convertFromHTML,ContentState,EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import SizeOfText from '../utils/sizeOfText.js';
/*
* RichTextEditor的用法:
* 1.初始化值需要定义为：RichTextEditor.createEmptyValue();
* 2.value={value};onChange={onChange},value是包装后的数据,onChange是返回用户操作的数据
* 3.onChange事件返回的值处理: 
* 	>  a.返回的值是一个被RichTextEditor.createEmptyValue()包装后的EditorValue对象,可以直接赋值给value
* 	>  b.当我们需要获取输入信息的包装内容时,EditorValue对象允许我们进行转换成想要的几种格式,分别是:markdown,html,String;
* 4.EditorValue对象转换方法:
* 	>  a.例如var testEditor = RichTextEditor.createEmptyValue();
* 	>  b. testEditor = onChange(){return value};
* 	>  c. testMarkdown = testEditor.toString('markdown');
* 5.字符串转换EditorValue方法:
* 	>  a.例如var testHtml = '<a>I am Ant-Design UI</a>';
* 	>  b.state.value = RichTextEditor.createValueFromString(testHtml,'html');
* 	>  c.转换完成,将字符串中的内容转换成了一个EditorValue对象
* 6.浏览模式：readOnly={true}
* >>> React-rte编辑器说明:
*   > 由于该编辑器目前本身不支持图片形式的插入;
*   > 所以使用了Zerocho提供的方法进行图片的插入和预览
*   > 对应的gitHub文档:https://github.com/zerocho/react-rte
*   > 原React-rte编辑器文档:https://github.com/sstur/react-rte
*/

/*
* React-draft-wysiwyg 的用法
* 1.首先我们知道以下几个功能以及用法
* 	a.convertToRaw(tempEdit.getCurrentContent())是用于将数据形式转为对象类型
* 	b.editorState 是写入数据的时候使用
*	c.contentState 是读取后台数据的时候使用
* 2.数据形式目前支持三种： raw 、 html 、 markdown 
* 	存储最佳选择格式：json
* 3.编辑器提供的转换方法：
*	 html: draftToHtml(object)
*	 markdown: draftToMarkdown(object)
* 4.各种格式转换方式：
* 	JSON: JSON是最好转换的格式类型，由于convertToRaw(tempEdit.getCurrentContent())转换后的
* 		  数据类型本身就是一个对象，所以直接将对象转为JSON即可，JSON.stringify(object)
* 	html: 使用draftjs-to-html提供的 draftToHtml 方法实现， draftToHtml(convertToRaw(tempEdit.getCurrentContent()))
* 	markdown: 使用draftjs-to-markdown提供的 draftToMarkdown draftToMarkdown(convertToRaw(tempEdit.getCurrentContent()))
* 5.读取数据方式
* 	初始化变量一定要先置空， contentState =null,
*		如果定义为：contentState =EditorState.createEmpty()否则会在第一次渲染页面的时候就会进行读取数据，出现类型报错。
* 	由于我们存储的json对象，所以可以直接放在 contentState 中，
* 		即： contentState={ JSON对象 } JSON对象也为后台存储数据形式。可能需要字符串转JSON。
*		JSON.parse(b)
* 6.写入数据方式
*  初始化变量先置空， editorState =null,
*		普通编辑模式下，直接 state.editorState = action.payload; 传递的是一个对象。
*		如果需要对格式转换，可以按照【方法4】进行转换存储。
* 7.只读模式：readOnly={true}
* 	隐藏工具栏： <Editor toolbarHidden />
* 8. 中英文
* localization={{ locale: 'zh', translations: {'generic.add': '添加'} }}
* 后面translations表示要自定义的中文内容
* 具体请看：https://github.com/jpuri/react-draft-wysiwyg/blob/master/js/src/i18n/zh.js
*/

export default {
	namespace: 'practice',

	state: {
		editCol: '24',
		showCol: '0',
		sliderValue: 0,
		sizeValue: 15,
		debugWidth: 0,
		toolVisible: true,

		editorContent: null,
		editorState: null,

		htmlVisible: false,
		textVisible: true,
		disabled: true,
		editValue: RichTextEditor.createEmptyValue(),
		debugValue: '',
		htmlValue: '',
	},

	subscriptions: {
		setup({dispatch,history}) {
			history.listen( location => {
				if(location.pathname === '/practice') {
					dispatch({
						type: 'query',
						payload: location.query,
					})
				}
			});
		}
	},

	effects: {
		*query({payload},{call,put}) {
			const data = yield call(query,payload)
			// yield put({type: 'initHtml'});
			// yield put({type: 'debugEdit'});
			if(!data) {
				yield put({
					type: 'querySuccess',
					payload: data,
				})
			}
		},

		*onHtmlSubmit({ payload }, { call, put }) {
			// 保存数据到文件中,将以文件流的形式保存
			var headerStart = '<!DOCTYPE html><html>';
			var headerEnd = '</html>';
			// const data = yield call(testEdit,payload)
			console.log('ReactEdit编辑的内容在model中打印======>',payload)
		},

		*onDocSubmit({payload}, {call,put}) {
			var tempa = payload.toString('html');

			console.log('保存成功,===>>',tempa)
		}
	},

	reducers: {
		querySuccess(state,action) {
			const testStr = {"entityMap":{"0":{"type":"IMAGE","mutability":"MUTABLE","data":{"src":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1492659916925&di=80dc0eba373e39eb2214a1fc5728b5c0&imgtype=0&src=http%3A%2F%2Fa.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F342ac65c103853438b3c5f8b9613b07ecb8088ad.jpg","height":"300","width":"auto","alignment":"left"}}},"blocks":[{"key":"7veff","text":"78wddjawjdawj","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":13,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"asomo","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"hgvg","text":" ","type":"atomic","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":0,"length":1,"key":0}],"data":{}},{"key":"erknv","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
			state.editorState =  testStr;
			return { ...state }
		},

		reactEdit(state,action) {
			const tempEdit = action.payload;
			state.editValue = tempEdit;
			state.debugValue = tempEdit.toString('html');
			// console.log('reactEdit-------->',state.debugValue)
			return { ...state }
		},

		// React-draft-wysiwyg赋值
		onDraftWysTextEdit(state,action) {
			const tempEdit = action.payload;
			state.editorContent = tempEdit;
			// state.debugValue = draftToHtml(convertToRaw(tempEdit.getCurrentContent()));
			state.debugValue = JSON.stringify(convertToRaw(tempEdit.getCurrentContent()));
			// var str = SizeOfText(state.debugValue,'utf8');
			// console.log('文件大小---->',str+'kb')
			return { ...state }
		},
		htmlChange(state,action) {
			const stringValue = action.payload;
			state.htmlValue = stringValue;
			return { ...state };
		},
		debugEdit(state,action) {
			state.disabled = false;
			state.editCol = 12;
			state.showCol = 12;
			state.debugWidth = state.showCol;
			state.sliderValue = state.showCol;
			return { ...state };
		},
		fontSizeChange(state,action) {
			state.sizeValue = action.payload;
			return { ...state };
		},
		closeDebug(state,action) {
			state.disabled = true;
			state.editCol = '24';
			state.showCol = '0';
			return { ...state }
		},
		editWidthChange(state,action) {
			const debugWidth = action.payload;
			const maxWidth = '24';
			state.debugWidth = debugWidth;
			state.sliderValue = debugWidth;
			if(parseInt(debugWidth) < 20) {
				// console.log(parseInt(maxWidth - debugWidth))
				state.editCol = parseInt(maxWidth - debugWidth);
				state.showCol = parseInt(debugWidth);
			} else {
				state.editCol = 0;
				state.showCol = 23;
			}
			return { ...state }
		},
		showHtmlEdit(state,action) {
			const obj = state.htmlVisible;
			if(obj) {
				state.htmlVisible = !state.htmlVisible;
				state.textVisible = !state.textVisible;
			}
			else {
				state.htmlVisible = !state.htmlVisible;
				state.textVisible = !state.textVisible;
			}
			return { ...state };
		},
		showTextEdit(state,action) {
			const obj = state.textVisible;
			if(obj) {
				state.htmlVisible = !state.htmlVisible;
				state.textVisible = !state.textVisible;
			}
			else {
				state.htmlVisible = !state.htmlVisible;
				state.textVisible = !state.textVisible;
			}
			return { ...state };
		},
		changeToolDisplay(state,action) {
			state.toolVisible = !action.payload;
			return { ...state };
		},
		onEditShow(state,action) {
			state.editCol = 24;
			state.showCol = 0;
			state.toolVisible = false;
			return { ...state };
		},
		initHtml(state,action) {
			state.htmlValue = 
			"<style type=text/css>回车换行,进行CSS样式书写</style><div class=my>回车换行,进行HTML文档书写</div>";
			return { ...state };
		}
	}
}