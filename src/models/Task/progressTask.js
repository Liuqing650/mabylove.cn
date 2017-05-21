import React from 'react';
import { parse } from 'qs';
import {message} from 'antd';
import { getTaskListName, getAllTaskCount, getTaskCountByTaskId, getTaskReport } from '../../services/taskManage';
import {hashHistory} from 'dva/router';
import storage from '../../utils/browserData';

export default {
	namespace: 'progressTask',

	state: {
		loading: false,
		taskLoading: false,
		taskList: [],

		countData: [],
		reportData: [],

		defaultSelectTask: '',

		visible: false,
	},

	subscriptions: {
		setup({dispatch, history}) {
			history.listen( location => {
				if(location.pathname === '/task/progress') {
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
			yield put({type:'showLoadding'});
			if(!storage.isLogin) {
				message.info('很抱歉,您还没有登录,不能发布任务!');
				hashHistory.push('/login');
			}
			const obj={};
			obj['user_id'] = storage.userId;
			const data = yield call(getTaskListName,obj);
			if(data) {
				yield put({
					type:'querySuccess',
					payload: data,
				})
			}
		},
		*queryReport({ payload }, { call, put }) {
			yield put({type:'showTaskLoading'});
			const countData = yield call(getTaskCountByTaskId,payload);
			const reportData = yield call(getTaskReport,payload);
			if(countData&&reportData) {
				yield put({
					type:'queryReportSuccess',
					payload: {
						countData: countData,
						reportData: reportData,
					},
				})
			}
		}
	},

	reducers: {
		querySuccess(state, action){
			state.taskList = action.payload;
			state.loading = false;
			return {...state};
		},
		queryReportSuccess(state, action){
			const data = action.payload;

			state.countData = data.countData;
			state.reportData = data.reportData;
			state.taskLoading = false;
			return {...state};
		},
		showLoadding(state,action) {
			state.loading = true;
			return { ...state };
		},
		showTaskLoading(state,action) {
			state.taskLoading = true;
			return { ...state };
		},
		showModal(state, action){
			return {...state};
		},
		hideModal(state, action) {
			return {...state};
		}
	},
}