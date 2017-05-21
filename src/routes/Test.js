import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
// import TestPage from '../components/Test/htmlEdit';
// import TestEdit from '../components/Test/testEdit';
// import AntdEdit from '../components/Test/antdEdit';
// import TableDemo from '../components/Test/tableDemo';
import TestES from '../components/Test/testES';
// import DraftJsEdit from '../components/Test/draftJsEdit.js';
// import UEditor from '../components/Test/uEditor.js';


function Test({dispatch,location,test}) {
	const {
		data,newColumns,colValue,newData,

		moreData,newMoreData,columnsText,move,newMoreColumns,cols,

		editorContent,
		htmlText,
		remove,
		editorState,
		ecmsData,
	} = test;
	const testEditProps = {};

	const TestPageProps = {
		htmlText: htmlText,
		editorState:editorState,
		
		htmlChange(value) {
			dispatch({
				type: 'test/htmlChange',
				payload: value,
			})
		},
		htmlTestChange(value) {
			dispatch({
				type: 'test/htmlTestChange',
				payload: value,
			})
		},
		onEditorChange(editorState) {
			dispatch({
				type: 'test/onEditorState',
				payload: editorState,
			})
		},
	}

	const AntdEditProps = {};

	const DraftJsEditProps = {
		// editorContent:editorContent,
		// onDraftEditorChange(editorContent) {
		// 	// console.log('editorContent--->',editorContent)
		// 	dispatch({
		// 		type: 'test/onDraftEditorChange',
		// 		payload: editorContent,
		// 	})
		// },
	};

	const TestESProps = {
		test:'aa',
		size: 'large',
		getDP: '我传递了getDP的参数，不用 getDefaultProps中的值了',
		ecmsData:ecmsData,
		testFun(val) {
			console.log('你成功的调用了我，传递给我的值是：',val)
		},
		onChangeECMS(val) {
			dispatch({
				type: 'test/onChangeECMS',
				payload: val,
			})
		}
	}
	
	const TableDemoProps = {
		colValue:colValue,
		data:data,
		newData:newData,
		remove:remove,
		newColumns:newColumns,
		onChangeColumns(data) {
			dispatch({
				type:'test/onChangeColumns',
				payload:data,
			})
		},

		moreData:moreData,
		newMoreData:newMoreData,
		columnsText:columnsText,
		move:move,
		cols:cols,
		newMoreColumns:newMoreColumns,
		onMoreChangeColumns(data) {
			dispatch({
				type:'test/onMoreChangeColumns',
				payload:data,
			})
		},
	}

	const UEditorProps = {}

			// <TestPage { ...TestPageProps } />
			// <TestEdit { ...TestPageProps } />
			// <TableDemo { ...TableDemoProps } />
			// <AntdEdit { ...AntdEditProps } />
			// <DraftJsEdit {...DraftJsEditProps}/>
			// <TestES {...TestESProps}/>
			// <UEditor {...UEditorProps}/>
	return (
		<div>
			<TestES {...TestESProps}/>
		</div>
		
	)
}

export default connect(({test}) => ({test}))(Test);