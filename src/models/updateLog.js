import React from 'react';
import { parse } from 'qs';
import {message} from 'antd';
import {query,add,} from '../services/updateLog';
import RichTextEditor, {createEmptyValue} from 'react-rte';
import storage from '../utils/browserData';

export default {
	namespace: 'updateLog',

	state: {
		loading: false,
		updateLogList: [],
		defaultTabKey: '0',
		visible: false,
		logData:{},
		editLoading: false,
		nowVersion: '',
		bigVersion: '',
		lastNum: '',
		secondNum: '',
		firstNum: '',
		testItem: [],
	},

	subscriptions: {
		setup({dispatch, history}) {
			history.listen( location => {
				if(location.pathname === '/updatelog') {
					dispatch({
						type:'query',
						payload: location.query,
					})
				}
			});
		}
	},

	effects: {
		*query({ payload }, { call, put }) {
			yield put({type:'showContentLoading'});
			const data = yield call(query,payload)
			yield put({type:'hideContentLoading'});
			if(data) {
				yield put({
					type:'querySuccess',
					payload: data,
				})
			}
		},
		*add({ payload }, { call, put }) {
			yield put({type: 'showLoadding'})
			const data = yield call(add,payload)
			yield put({type: 'hideModal'})
			if(data) {
				yield put({
					type:'query',
				})
			}
		},
	},

	reducers: {
		querySuccess(state, action){
			const data = action.payload;
			for(let i=0;i<data.length; i++) {
				data[i]['order'] = i;
			}
			state.updateLogList = data;
			return {...state};
		},
		showContentLoading(state, action){
			state.loading = true;
			return { ...state };
		},
		hideContentLoading(state, action){
			state.loading = false;
			return { ...state };
		},
		showLoadding(state,action) {
			state.editLoading = true;
			return { ...state };
		},
		showModal(state, action){
			var tempMenu = [];
			var obj = {};
			if(storage.isLogin) {
				obj['author']=storage.nickName;
				obj['pk'] = storage.pk;
				tempMenu.push(obj);
			}
			if(state.updateLogList.length>0) {
				const tempLog = state.updateLogList[0];
				const tempVersion = tempLog.version
				// const tempVersion = 'v 1.5.1'
				const pattern = tempVersion.substring(-1,2);
				const numVersion = tempVersion.replace(new RegExp(pattern), "");
				const tempNumber = numVersion.split(".");
				const charVersion = '.';
				for(let i=0;i<tempNumber.length;i++) {
					state.firstNum = parseInt(tempNumber[0]);
					state.secondNum = parseInt(tempNumber[1]);
					state.lastNum = parseInt(tempNumber[2]);
				}
				if(state.secondNum>4) {
					state.lastNum = 0;
					state.secondNum = 0;
					state.firstNum = state.firstNum + 1;
				} else if(state.lastNum>15) {
					state.lastNum = 0;
					state.secondNum = state.secondNum + 1;
				} else {
					state.lastNum = state.lastNum +1;
				}

				state.nowVersion = pattern + state.firstNum + charVersion + state.secondNum + charVersion + state.lastNum;
				obj['version'] = state.nowVersion;
				tempMenu.push(obj);
			}
			state.logData = tempMenu[0];
			state.visible = true;
			return {...state};
		},
		hideModal(state, action) {
			state.editLoading = false;
			state.visible = false;
			state.editVisible = false;
			return {...state};
		},
	},
}