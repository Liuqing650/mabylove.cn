import React from 'react';
import { connect } from 'dva';
import { Row, Col,Icon } from 'antd';
import PracticeTool from '../components/Practice/practiceTool';
// import PracticeEdit from '../components/Practice/practiceEdit';
import PracticeTextEdit from '../components/Practice/practiceTextEdit';
import PracticeShow from '../components/Practice/practiceShow';
import PracticeHtmlEdit from '../components/Practice/practiceHtmlEdit';
import PracticeHtmlShow from '../components/Practice/practiceHtmlShow';
import styles from './PracticeStyle.less';


function Practice({dispatch,location,practice}) {
	const {
		toolVisible,
		editCol,showCol,sliderValue,debugWidth,disabled,sizeValue,

		editorContent,editorState,

		editValue,htmlVisible,textVisible,
		debugValue,
		htmlValue,
	} = practice;
	
	const practiceProps = {
		value: editValue,
		onChange(value) {
			dispatch({
				type: 'practice/reactEdit',
				payload: value,
			})
		}
	};

	const practiceToolProps = {
		htmlVisible,
		textVisible,
		disabled: disabled,
		sliderValue: sliderValue,
		sizeValue: sizeValue,
		debugWidth: debugWidth,
		debugShow() {
			dispatch({
				type: 'practice/debugEdit',
			})
		},
		editChange(value) {
			dispatch({
				type: 'practice/editWidthChange',
				payload: value,
			})
		},
		onHandleSubmit() {
			dispatch({
				type: 'practice/onDocSubmit',
				payload:editValue,
			})
		},
		onHtmlSubmit() {
			dispatch({
				type: 'practice/onHtmlSubmit',
				payload:htmlValue,
			})
		},
		onFontSizeChange(value) {
			dispatch({
				type: 'practice/fontSizeChange',
				payload: value,
			})
		},
		showHtml() {
			const value=htmlVisible;
			dispatch({
				type: 'practice/showHtmlEdit',
				payload: value,
			})
		},
		showText() {
			const value=textVisible;
			dispatch({
				type: 'practice/showTextEdit',
				payload: value,
			})
		},
		onEditShow() {
			dispatch({
				type: 'practice/onEditShow',
			})
		}
	};

	const practiceShowProps = {
		debugValue: debugValue,
		closeDebug() {
			dispatch({
				type: 'practice/closeDebug',
			})
		}
	};

	const practiceTextEditPros = {
		editorContent:editorContent,
		editorState:editorState,
		onDraftWysTextEditChange(editorContent) {
			dispatch({
				type:'practice/onDraftWysTextEdit',
				payload:editorContent,
			})
		}
	};

	const practiceHtmlEditProps = {
		sizeValue:sizeValue,
		htmlValue: htmlValue,
		onHtmlChange(value) {
			dispatch({
				type: 'practice/htmlChange',
				payload: value,
			})
		},
	}

	const practiceHtmlShowProps = {
		htmlValue:htmlValue,
		closeDebug() {
			dispatch({
				type: 'practice/closeDebug',
			})
		}
	}

	const textState = textVisible?'block':'none';
	const htmlState = htmlVisible?'block':'none';
	const toolState = toolVisible?'block':'none';
	// console.log(textState)
	function onChangeTool(toolVisible) {
		
		dispatch({
			type: 'practice/changeToolDisplay',
			payload: toolVisible,
		})
	}
	// <PracticeEdit { ...practiceProps } />
	return (
		<div className={ styles.practiceStyle } >
			<div>
				<Row style={{display:`${toolState}`}}>
					<Col span={24}>
						<PracticeTool { ...practiceToolProps } />
					</Col>
				</Row>
				<div className={styles.downButtonStyle} style={{top: `${toolVisible?'-56px':'9px'}`}} onClick={() =>{onChangeTool(toolVisible)}}><Icon type={`${toolVisible?'down-circle-o':'up-circle-o'}`} /></div>
			</div>

			<div className={ styles.editWrapper } style={{marginTop: `${toolVisible?'10px':'10px'}`}}>
				<Row style={{display:`${textState}`}}>
					<Col span={editCol} >
						<PracticeTextEdit { ...practiceTextEditPros } />
					</Col>	
					<Col span={showCol}>
						<PracticeShow { ...practiceShowProps } />
					</Col>
				</Row>
				<Row style={{display:`${htmlState}`}}>
					<Col span={editCol} >
						<PracticeHtmlEdit { ...practiceHtmlEditProps } />
					</Col>
					<Col span={showCol}>
						<PracticeHtmlShow { ...practiceHtmlShowProps } />
					</Col>
				</Row>
			</div>
		</div>
		
	)
}

export default connect(({practice}) => ({practice}))(Practice);