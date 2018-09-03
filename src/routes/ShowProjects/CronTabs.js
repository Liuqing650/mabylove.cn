import React from 'react';
import { connect } from 'dva';
import Cron from '../../components/ShowProject/CronTabs/cron';

function CronTabs({ location, dispatch, cronTabs }) {
	const {
		cronTitle,cronModalVisible,isDesabled,dispatchItem,groupname,updateParams,
	    timelevel,radioValue,beforeValue,endValue,cronDefaultValue,cronDefaultBoxValue,checkedCron,selectLevel,selectRadio,checkboxValue,
	    secondValue,minuteValue,hourValue,dayValue,monthValue,weekValue,yearValue,cronValue,cronViewDate,
	} = cronTabs;

    const CronProps = {
		title: cronTitle,
		visible: cronModalVisible,
		isDesabled,

		dispatchItem:dispatchItem,
		groupname:groupname,

		timelevel:timelevel,
    	radioValue: radioValue,
    	beforeValue: beforeValue,
    	endValue: endValue,
		cronDefaultValue: cronDefaultValue,
		cronDefaultBoxValue: cronDefaultBoxValue,
		checkedCron: checkedCron,
		selectLevel: selectLevel,
		selectRadio: selectRadio,
		checkboxValue: checkboxValue,

    	secondValue:secondValue,
		minuteValue:minuteValue,
		hourValue:hourValue,
		dayValue:dayValue,
		monthValue:monthValue,
		weekValue:weekValue,
		yearValue:yearValue,
		cronValue:cronValue,
		cronViewDate: cronViewDate,
		
    	onTabsChange(key) {
    		dispatch({
    			type: 'cronTabs/onCron',
    			payload: key,
    		})
  		},
  		onRadioChange(key) {
  			dispatch({
    			type: 'cronTabs/onRadioCron',
    			payload: {
    				radioKey:key,
    			}
    		})
  		},
  		onCheckBoxsChange(value) {
  			var timeArray = value.sort(function(a,b){return a-b;});
  			dispatch({
    			type: 'cronTabs/onRadioCron',
    			payload: {
    				timeArray:timeArray,
    			}
    		});
		},
  		onNumberB(number) {
  			dispatch({
    			type: 'cronTabs/onRadioCron',
    			payload: {
    				numBerfore:number,
    			},
    		})
  		},
  		onNumberE(number) {
  			dispatch({
    			type: 'cronTabs/onRadioCron',
    			payload: {
    				numEnd:number,
    			},
    		})
  		},
  		onNumberOne(number) {
  			dispatch({
  				type: 'cronTabs/onNumberOneCron',
  				payload: number,
  			})
  		},
  		onAnalyze(cron) {
  			dispatch ({
  				type: 'cronTabs/cronTabAnalyze',
  				payload: cron,
  			})
  		},
  		onClear() {
  			dispatch({
  				type: 'cronTabs/clearCron',
  			})
  		},
		onOk(cronItem) {
			if(updateParams=='修改计划任务组'){
				//console.log("cronItem==",cronItem)
				dispatch ({
					type: 'cronTabs/updateCron',
					payload: cronItem,
				})
			}else{
				dispatch ({
					type: 'cronTabs/cronTask',
					payload: cronItem,
				})
			}
		},
		onCancel() {
			dispatch({
				type: 'cronTabs/clearCron',
			})
			dispatch ({
				type: 'cronTabs/hideModal',
			})
		}
	};

	return (
		<div>
			<Cron { ...CronProps }/>
		</div>
	)
}

export default connect(({cronTabs})=>({cronTabs}))(CronTabs)