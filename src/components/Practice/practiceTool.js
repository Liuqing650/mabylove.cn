import React from 'react';
import { Row,Col,Button,Slider, InputNumber,Tag,Icon } from 'antd';
import styles from './praticeStyle.less';

const practiceTool = ({
	debugShow,
	editChange,
	sizeValue,
	debugWidth,
	sliderValue,
	disabled,
	showHtml,
	showText,
	htmlVisible,
	textVisible,
	onFontSizeChange,
	onHandleSubmit,
	onHtmlSubmit,
	onEditShow,
}) => {
	function onSubmit() {
		if(htmlVisible) {
			onHtmlSubmit();
		}
		if(textVisible) {
			onHandleSubmit();
		}
	}

	return (
		<div className={styles.toolStyle}>
			<Row>
				<Col lg={{ span: 3}} md={{span:4}} sm={{span:4}} xs={{span:4}}>
					<h2>帷中暮色编辑工具</h2>
					如需帮助,请查看
					<a href="#/helpdoc">帮助文档</a>
				</Col>
				<Col lg={{ span: 5, offset: 0}} md={{span:8}} sm={{span:10}} xs={{span:6}}>
					<Button className={styles.toolButton} type="dashed" size="large" icon="code" disabled={htmlVisible?true:false} onClick={showHtml} >{htmlVisible?'正在编辑HTML':'HTML文档编辑'}</Button>
					<Button className={styles.toolButton} type="dashed" size="large" icon="edit" disabled={textVisible?true:false} onClick={showText} >{textVisible?'正在编辑文本':'文本文档编辑'}</Button>
				</Col>
				<Col lg={{ span: 6, offset: 0}} md={{span:10}} sm={{span:10}} xs={{span:14}}>
					<Button className={styles.toolButton} type="dashed" onClick={onEditShow} size="large" icon="eye" >全局预览</Button>
					<Button className={styles.toolButton} type="primary" onClick={onSubmit} size="large" icon="save" >保存文档</Button>
					<Button className={styles.toolButton} type="primary" size="large" onClick={debugShow} icon="eye-o" >预览调试</Button>
				</Col>
				
				<Col lg={{ span: 3,}} md={{span:0}} sm={{span:0}} xs={{span:0}}>
					<Tag color="#87d068" style={{fontSize:'15px'}}><Icon type="code-o" />代码字体大小</Tag>
					<InputNumber min={10} max={100}
			            value={sizeValue} onChange={onFontSizeChange}
			        />
				</Col>
				<Col lg={{ span: 4, offset: 1}} md={{span:0}} sm={{span:0}} xs={{span:0}}>
					<Slider min={0} max={24} onChange={editChange} step={0.01} disabled={disabled} value={sliderValue} />
				</Col>
				<Col lg={{ span: 2}} md={{span:0}} sm={{span:0}} xs={{span:0}}>
					<InputNumber min={1} max={20} disabled={disabled}
			            value={debugWidth} onChange={editChange}
			        />
				</Col>
			</Row>
		</div>
	);
}

export default practiceTool;