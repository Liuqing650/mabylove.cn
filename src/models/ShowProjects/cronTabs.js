import React from 'react';
import {parse} from 'qs';
import {message } from 'antd';
import {cronTabAnalyze} from '../../services/showProject/cronTab';

export default {
	namespace: 'cronTabs',

	state: {
		cronTitle: '计划任务组配置',
		isDesabled: false,
		modalVisible: false,
		cronModalVisible: false,
		dispatchItem: {},
		dispatchList: [],
		newTaskList: [],
		planGroupList:[],
		groupname:'计划任务组CronTabs',

	    sign: [',','-','*','/','L','W','#',' ','?'],
		cronDefaultValue: ['0','1','2','3','4','5','6','7','8','9','10','11','12','W','L','2016','2017','*','',0],
		cronDefaultBoxValue: ['0'],
		checkedCron: false,
		timelevel:1,
		radioValue: '',
		aloneValue: '',
		checkBoxsValue: [],
		beforeValue: '',
		endValue: '',
		lastLevel: 1,
		lastRadio: '',
		lastBefore: '',
		lastEnd: '',
		selectLevel: '1',
		selectRadio: '',
		checkboxValue: '',

	    secondValue:'*',
	    minuteValue:'*',
	    hourValue:'*',
	    dayValue:'*',
	    monthValue:'*',
	    weekValue:'?',
	    yearValue:'',
	    cronValue: '* * * * * ?',
	    cronViewDate: [],
	},

	subscriptions: {
		setup({dispatch, history}) {
			history.listen( location => {
				if(location.pathname === '/cron') {
					dispatch({
						type:'onStartCron',
						payload: {
							isDesabled: false,
						},
					})
				}
			});
		}
	},

	effects: {
		// 解析cronTab表达式
		*cronTabAnalyze({ payload }, { call, put }) {
			yield put({type: 'clearCronAnalyze',})
			const obj = {};
			obj['cron'] = payload;
			const cron = yield call(cronTabAnalyze,obj)
			if(cron) {
				yield put({
					type: 'cronAnalyzeSuccess',
					payload: cron,
				})
			} else {
				message.error('没有获取到结果，请检查cron表达式的正确性');
				yield put({
					type: 'cronAnalyzeSuccess',
					payload: [],
				})
			}
		},
	},

	reducers: {
        
		// Cron相关数据
		onStartCron(state,action) {
			state.groupname = [];
			state.dispatchItem = [];
			state.isDesabled = action.payload.isDesabled;
			return { ...state, cronModalVisible: true, }
        },
		showCronModal(state,action) {
			state.groupname = [];
			state.dispatchItem = [];
			state.dispatchItem = action.payload.item;
			state.isDesabled = action.payload.isDesabled;
			state.groupname = action.payload.groupname;
			state.updateParams='修改计划任务组'

			if(state.dispatchItem.cronExpression) {
				// 获取cronTable表达式
				const cronAnalyze = state.dispatchItem.cronExpression;
				// 执行方法
				openCronTable(cronAnalyze);
			} else {
				message.error('这项任务里面还没有cron表达式,请创建新的表达式');
			}
			
			// 用于拆分开cronTable表达式的功能
			function openCronTable(cronAnalyze) {
				var tempArray = [];
				tempArray = cronAnalyze.split(' ');
				for(let i=0;i<tempArray.length;i++) {
					tempArray[i].indexOf(' ',tempArray[i]);
					state.secondValue = tempArray[0];
					state.minuteValue = tempArray[1];
					state.hourValue = tempArray[2];
					state.dayValue = tempArray[3];
					state.monthValue = tempArray[4];
					state.weekValue = tempArray[5];
					state.yearValue = tempArray[6];
					state.cronValue = state.secondValue+state.sign[7]+state.minuteValue+state.sign[7]+state.hourValue+state.sign[7]+state.dayValue+state.sign[7]+state.monthValue+state.sign[7]+state.weekValue+state.sign[7]+state.yearValue;
					// console.log("第"+i+"个tempArray[i]",tempArray[i])
				}
			}
			return { ...state, cronModalVisible: true, }
        },
		onCron(state,action) { // 1.获取Cron中选择的标签值(并初始化值)
			state.lastLevel = state.timelevel;
			state.timelevel = action.payload;
			// 1-1.用于初始化需要动态更改数据的项，当用户选其他的时间级别的时候，state里面原来存放的数据已经送到对应的时间级下，所以应该清空重新接值
			if(state.tempLevel != state.lastLevel) {
				state.beforeValue = '';
				state.endValue = '';
				state.aloneValue = '';
				state.checkBoxsValue = [];
			}
			return { ...state, }
		},
		onRadioCron(state,action) { // 2.获取Radio中单选框的值，借此知道选中的第几项
			state.lastRadio = state.radioValue;
			if(action.payload.radioKey) {
				const tempValue = action.payload.radioKey.target.value;
				state.selectLevel = state.timelevel;
				state.selectRadio = tempValue;
				state.radioValue = tempValue;
			}
			if(action.payload.timeArray) {
				const tempCheckValue = action.payload.timeArray;
				state.checkBoxsValue = tempCheckValue;
				state.checkboxValue = state.checkBoxsValue;
			}

			if(action.payload.numBerfore) {
				// 存上一个数据的值
				state.lastBefore = state.beforeValue;
				state.lastEnd = state.endValue;

				// 存当前的值
				state.beforeValue = action.payload.numBerfore
				// 判断输入的数据是否符合规则
				if(state.beforeValue!=state.lastBefore || state.endValue!=state.lastEnd) {
					numberRegular(state.timelevel,state.radioValue,state.beforeValue,state.endValue)
				}
			}
			if(action.payload.numEnd) {
				state.endValue = action.payload.numEnd
			}
			// 2-1.用于判断用户在一个单选框内有两个输入框的情况下，输入数据后再选择其他单选框后初始化state中用于获取两个输入框前后值的容器
			// 现在交替的时候取的是默认值，如果能够获取到输入框的值，这里可以直接获取到的网页中的原数据
			if(state.radioValue != state.lastRadio) {
				state.beforeValue = '';
				state.endValue = '';
				if(state.timelevel==1) { // 秒
					state.secondValue = '';
					if(state.radioValue==2) {
						state.beforeValue = state.cronDefaultValue[1];
						state.endValue = state.cronDefaultValue[2];
					} else if(state.radioValue==3) {
						state.beforeValue = state.cronDefaultValue[0];
						state.endValue = state.cronDefaultValue[1];
					} else if(state.radioValue==4) {
						state.checkBoxsValue = [0];
					} else {
						state.beforeValue = '';
						state.endValue = '';
					}
				} else if (state.timelevel==2) { // 分钟
					state.minuteValue = '';
					if(state.radioValue==2) {
						state.beforeValue = state.cronDefaultValue[1];
						state.endValue = state.cronDefaultValue[2];
					} else if(state.radioValue==3) {
						state.beforeValue = state.cronDefaultValue[0];
						state.endValue = state.cronDefaultValue[1];
					} else if(state.radioValue==4) {
						state.checkBoxsValue = [0];
					} else {
						state.beforeValue = '';
						state.endValue = '';
					}
				} else if (state.timelevel==3) { // 小时
					state.hourValue = '';
					if(state.radioValue==3) {
						state.beforeValue = state.cronDefaultValue[1];
						state.endValue = state.cronDefaultValue[2];
					} else if(state.radioValue==4) {
						state.beforeValue = state.cronDefaultValue[0];
						state.endValue = state.cronDefaultValue[1];
					} else if(state.radioValue==5) {
						state.checkBoxsValue = [0];
					} else {
						state.beforeValue = '';
						state.endValue = '';
					}
				} else if (state.timelevel==4) { // 日
					state.dayValue = '';
					if(state.radioValue==3) {
						state.beforeValue = state.cronDefaultValue[1];
						state.endValue = state.cronDefaultValue[2];
					} else if(state.radioValue==4) {
						state.beforeValue = state.cronDefaultValue[1];
						state.endValue = state.cronDefaultValue[1];
					} else if(state.radioValue==5) {
						state.aloneValue = state.cronDefaultValue[1];
					} else if(state.radioValue==6) {
						state.checkBoxsValue = [0];
					} else {
						state.beforeValue = '';
						state.endValue = '';
						state.aloneValue = '';
					}
				} else if (state.timelevel==5) { // 月
					state.monthValue = '';
					if(state.radioValue==3) {
						state.beforeValue = state.cronDefaultValue[1];
						state.endValue = state.cronDefaultValue[12];
					} else if(state.radioValue==4) {
						state.beforeValue = state.cronDefaultValue[1];
						state.endValue = state.cronDefaultValue[1];
					} else if(state.radioValue==5) {
						state.checkBoxsValue = [0];
					} else {
						state.beforeValue = '';
						state.endValue = '';
					}
				} else if (state.timelevel==6) { // 周
					state.weekValue = '';
					if(state.radioValue==3) {
						state.beforeValue = state.cronDefaultValue[1];
						state.endValue = state.cronDefaultValue[2];
					} else if(state.radioValue==4) {
						state.beforeValue = state.cronDefaultValue[1];
						state.endValue = state.cronDefaultValue[1];
					}  else if(state.radioValue==5) {
						state.aloneValue = state.cronDefaultValue[1];
					} else if(state.radioValue==6) {
						state.checkBoxsValue = [0];
					} else {
						state.beforeValue = '';
						state.endValue = '';
						state.aloneValue = '';
					}

				} else if (state.timelevel==7) { // 年
					state.yearValue = '';
					if(state.radioValue==3) {
						state.beforeValue = state.cronDefaultValue[15];
						state.endValue = state.cronDefaultValue[16];
					} else {
						state.beforeValue = '';
						state.endValue = '';
					}
				}
				
			}

			// 比较两个数的大小
			function numberCompare(beforeValue,endValue,min,max) {
				if(beforeValue>endValue) {
					message.error("输入有误，应该小于"+endValue);
				} else if (endValue<beforeValue) {
					message.error("输入有误，应该大于"+beforeValue);
				} else if (beforeValue<min || endValue<min) {
					message.error("输入有数据过小");
				} else if (beforeValue>max || endValue>max) {
					message.error("输入有数据过大");
				}
			}

			// 调用函数判断是否出现错误
			function numberRegular(timelevel,radioValue,beforeValue,endValue) {
				if(timelevel==1 ) {
					if(radioValue==2) {
						numberCompare(beforeValue,endValue,1,59)
					} else if(radioValue==3) {
						numberCompare(beforeValue,endValue,0,59)
					}
				}
				if(timelevel==2 ) {
					if(radioValue==2) {
						numberCompare(beforeValue,endValue,1,59)
					} else if(radioValue==3) {
						numberCompare(beforeValue,endValue,0,59)
					}
				}
				if(timelevel==3 ) {
					if(radioValue==2) {
						numberCompare(beforeValue,endValue,0,23)
					} else if(radioValue==3) {
						numberCompare(beforeValue,endValue,0,23)
					}
				}
				if(timelevel==4 ) {
					if(radioValue==3) {
						numberCompare(beforeValue,endValue,1,31)
					} else if(radioValue==4) {
						numberCompare(beforeValue,endValue,1,31)
					}
				}
				if(timelevel==5 ) {
					if(radioValue==3) {
						numberCompare(beforeValue,endValue,1,12)
					} else if(radioValue==4) {
						numberCompare(beforeValue,endValue,1,12)
					}
				}
				if(timelevel==6 ) {
					if(radioValue==3) {
						numberCompare(beforeValue,endValue,1,7)
					} else if(radioValue==4) {
						numberCompare(beforeValue,endValue,1,7)
					}
				}
				if(timelevel==7 ) {
					if(radioValue==3) {
						numberCompare(beforeValue,endValue,2016,2200)
					}
				}
			}

			// 用于对用户输入的值进行Cron表达式组合拼接，当数据录入成功，就传递到控制台进行显示
				// 用于给包含一个单选框中包含两个输入框的数据进行Cron表达式组合
				function getDoubleNumber(beforeValue,endValue,signNo,defaultBefore,defaultEnd) {
					var tempTimeValue = '';
					if(beforeValue && endValue) {
						tempTimeValue = state.beforeValue+state.sign[signNo]+state.endValue;
					} else if(!beforeValue && endValue) {
						tempTimeValue = state.cronDefaultValue[defaultBefore]+state.sign[signNo]+state.endValue;
					} else if(beforeValue && !endValue) {
						tempTimeValue = state.beforeValue+state.sign[signNo]+state.cronDefaultValue[defaultEnd];
					}
					return tempTimeValue;
				}

				// 用于处理输入框中数值发生变化的时候Radio没有获取到焦点

				// 1.点击位置预判(由于timelevel我们肯定提前就知道了，所以只需要判断当前radio下的内容就可以锁定点击位置)
					// 获取radio位置需要在每一个输入框或则多选框的onChange事件触发的时候去判断。
				function clickRadio(radio) {

				}
				// 2.获取到具体位置的时候给组件传递数据
				function checkedRadio(level,radio) {
					const radioChecked = state.radioValue;
					const timeChecked = state.timelevel;
					console.log('level========>',level)
					console.log('radio========>',radio)
					if(timeChecked == level) {
						if(radioChecked == radio) {
							state.selectLevel = level;
							state.selectRadio = radio;
						} else {
							state.timelevel = radio;
							state.selectLevel = level;
							state.selectRadio = radio;
						}
					}
				}

				
			// 1.秒
			if(state.timelevel==1) {
				if(state.radioValue==1) {
					state.secondValue = state.sign[2];
				} else if(state.radioValue==2) {
					state.secondValue = getDoubleNumber(state.beforeValue,state.endValue,1,1,2);
				} else if(state.radioValue==3) {
					state.secondValue = getDoubleNumber(state.beforeValue,state.endValue,3,0,1);
				} else if(state.radioValue==4) {
					var tempBoxsStr = '';
					const boxsValue = state.checkBoxsValue;
					tempBoxsStr = boxsValue.join(state.sign[0])
					state.secondValue = tempBoxsStr;
				}
			}
			// 2.分
			if(state.timelevel==2) {
				if(state.radioValue==1) {
					state.minuteValue = state.sign[2];
				} else if(state.radioValue==2) {
					state.minuteValue = getDoubleNumber(state.beforeValue,state.endValue,1,1,2);
				} else if(state.radioValue==3) {
					state.minuteValue = getDoubleNumber(state.beforeValue,state.endValue,3,0,1);
				} else if(state.radioValue==4) {
					var tempBoxsStr = '';
					const boxsValue = state.checkBoxsValue;
					tempBoxsStr = boxsValue.join(state.sign[0])
					state.minuteValue = tempBoxsStr;
				}
			}
			// 3.小时
			if(state.timelevel==3) {
				if(state.radioValue==1) {
					state.hourValue = state.sign[2];
				} else if(state.radioValue==2) {
					state.hourValue = getDoubleNumber(state.beforeValue,state.endValue,1,1,2);
				} else if(state.radioValue==3) {
					state.hourValue = getDoubleNumber(state.beforeValue,state.endValue,3,0,1);
				} else if(state.radioValue==4) {
					var tempBoxsStr = '';
					const boxsValue = state.checkBoxsValue;
					tempBoxsStr = boxsValue.join(state.sign[0])
					state.hourValue = tempBoxsStr;
				}
			}
			// 4.日
			if(state.timelevel==4) {
				if(state.radioValue==1) {
					state.dayValue = state.sign[2];
				} else if(state.radioValue==2) {
					state.dayValue = state.sign[8];
				} else if(state.radioValue==3) {
					state.dayValue = getDoubleNumber(state.beforeValue,state.endValue,1,1,2);
				} else if(state.radioValue==4) {
					state.dayValue = getDoubleNumber(state.beforeValue,state.endValue,3,1,1);
				} else if(state.radioValue==5) {
					state.dayValue = state.aloneValue+state.sign[5];
				} else if(state.radioValue==6) {
					state.dayValue = state.sign[4];
				} else if(state.radioValue==7) {
					var tempBoxsStr = '';
					const boxsValue = state.checkBoxsValue;
					tempBoxsStr = boxsValue.join(state.sign[0])
					state.dayValue = tempBoxsStr;
				}
			}
			// 5.月
			if(state.timelevel==5) {
				if(state.radioValue==1) {
					state.monthValue = state.sign[2];
				} else if(state.radioValue==2) {
					state.monthValue = state.sign[8];
				} else if(state.radioValue==3) {
					state.monthValue = getDoubleNumber(state.beforeValue,state.endValue,1,12);
				} else if(state.radioValue==4) {
					state.monthValue = getDoubleNumber(state.beforeValue,state.endValue,1,1);
				} else if(state.radioValue==5) {
					var tempBoxsStr = '';
					const boxsValue = state.checkBoxsValue;
					tempBoxsStr = boxsValue.join(state.sign[0])
					state.monthValue = tempBoxsStr;
				}
			}
			// 6.周
			if(state.timelevel==6) {
				if(state.radioValue==1) {
					state.weekValue = state.sign[2];
				} else if(state.radioValue==2) {
					state.weekValue = state.sign[8];
				} else if(state.radioValue==3) {
					state.weekValue = getDoubleNumber(state.beforeValue,state.endValue,1,1,12);
				} else if(state.radioValue==4) {
					state.weekValue = getDoubleNumber(state.beforeValue,state.endValue,6,1,1);
				} else if(state.radioValue==5) {
					state.weekValue = state.aloneValue+state.sign[4];
				} else if(state.radioValue==6) {
					var tempBoxsStr = '';
					const boxsValue = state.checkBoxsValue;
					tempBoxsStr = boxsValue.join(state.sign[0])
					state.weekValue = tempBoxsStr;
				}
			}
			// 7.年
			if(state.timelevel==7) {
				if(state.radioValue==1) {
					state.yearValue = '';
				} else if(state.radioValue==2) {
					state.yearValue = state.sign[2];
				} else if(state.radioValue==3) {
					state.yearValue = getDoubleNumber(state.beforeValue,state.endValue,1,15,16);
				}
			}
			state.cronValue = state.secondValue+state.sign[7]+state.minuteValue+state.sign[7]+state.hourValue+state.sign[7]+state.dayValue+state.sign[7]+state.monthValue+state.sign[7]+state.weekValue+state.sign[7]+state.yearValue;
			return { ...state, }
		},
		onNumberOneCron(state,action) { // 4.获取单个数字输入框的值
			state.aloneValue = action.payload;
			return { ...state, }
		},

		clearCron(state,action) {
			state.secondValue='*';
		    state.minuteValue='*';
		    state.hourValue='*';
		    state.dayValue='*';
		    state.monthValue='*';
		    state.weekValue='?';
		    state.yearValue='';
		    state.cronValue= '* * * * * ?';
		    state.cronViewDate = [];
		    state.checkBoxsValue = [];
			return { ...state, }
		},
		
		// 清空控制台中Cron解析表达式
		clearCronAnalyze(state,action) {
			state.cronViewDate = [];
			return { ...state, }
		},

		// 解析Cron表达式
		cronAnalyzeSuccess(state,action) {
			state.cronViewDate = [];
			var cronTimeList = [];
			var tempList = action.payload;
			if(tempList.length>0) {
				for(let i=0;i<tempList.length;i++) {
					const obj = {};
					obj['key'] = i+1;
					obj['cronItem'] = tempList[i];
					cronTimeList.push(obj);
				}
			} else {
				const obj = {};
				obj['key'] = 0;
				obj['cronItem'] = '没有解析出Cron表达式';
				cronTimeList.push(obj);
			}
			
			state.cronViewDate = cronTimeList;
			// 1.从后台获取到解析数据后将表达式输出
			// state.cronViewDate = action.payload;
			return { ...state, }
		}
	}
}