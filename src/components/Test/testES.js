import React,{Component} from 'react';
import { Button, Radio, Icon,Input } from 'antd';
import moveTableUtil from './moveTableUtil';


const wrapperStyle={
	width:'100%',
	marginTop:30,
	marginLeft:'auto',
	marginRight:'auto',
}
const divStyle={
	width:300,
	marginTop:30,
	marginLeft:'auto',
	marginRight:'auto',
}
class testES extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleRepClick = this.handleRepClick.bind(this);
		this.state = {
			count: 0,
			startCount: 0,
			loopTime: 100,
			initDark: 0.1,
			text:'启动计数器',
			timeId:0,
			startTimeId: 0,
		};
	}

	render() { 
		const testFUn = moveTableUtil.setUp;
		const {color,size} = this.props;
		const {count,arr,text,startCount} = this.state;
		
		return(
			<div style={wrapperStyle}>
				<div style={divStyle}>
					<h4>还有{startCount}秒开始</h4><br/>
					<h2>{count>0?count:'点击计'}次</h2>
					<Button type={color} size={size} onClick={this.handleClick}>{text}</Button><br/><br/>
					<Button type={color} size={size} onClick={this.handleRepClick}>重置技术器</Button><br/>
				</div>
			</div>
		)
	}

	handleClickMap(item,index) {
		this.setState({isActive:index});
	}

	handleClick() {
		this.setState({
			text: this.state.text==='启动计数器'?'停止计数器':'启动计数器',
		});
		
		this.state.isCount = this.state.text==='启动计数器'?true:false;
		this.state.isCount?this.updateLoopTime(10000):clearInterval(this.state.startTimeId);
		this.state.isCount?this.timeCount():clearInterval(this.state.timeId);
	}
	
	timeCount() {
		
		clearInterval(this.state.timeId)
		// 倒计时
		this.setUpStartTime();
		const init = setInterval(()=>{
			this.setTimeCount();
		},this.state.loopTime);
		this.setState({timeId:init});
	}
	// 修改循环时间间隔
	updateLoopTime(time) {
		this.setState({
			loopTime:time,
		});
	}

	setUpStartTime() {
		this.setStartTimeCount();
		this.loopStartTime();
	}

	// 加计数
	setTimeCount() {
		this.setState({
			count: this.state.count + 1,
		});
	}

	// 初始化倒计时计数 
	setStartTimeCount() {
		console.log(parseInt(this.state.loopTime*this.state.initDark))
		this.setState({
			startCount: parseInt(this.state.loopTime*this.state.initDark),
		});
	}

	// 循环启动计数
	loopStartTime() {
		clearInterval(this.state.startTimeId)
		const init = setInterval(()=>{
			this.judgeStartCount();
			this.sumStartTimeCount();
		},parseInt(this.state.initDark*10));
		this.setState({startTimeId:init});
	}

	// 倒计时减计数 
	sumStartTimeCount() {
		this.setState({
			startCount: this.state.startCount-1,
		});
	}

	// 判断是否重置启动计数
	judgeStartCount() {
		const index = this.state.startCount;
		index===0?this.setStartTimeCount():null;
	}

	// 重置计数器
	handleRepClick() {
		clearInterval(this.state.timeId);
		clearInterval(this.state.startTimeId);
		this.setState({
			count: 0,
			startCount: 0,
			loopTime: 1000,
			text:'启动计数器',
		})
	}
}

testES.defaultProps = {
	color: 'primary',
	size:'large',
}
export default testES;

