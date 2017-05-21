import React from 'react';
import { parse } from 'qs';
import {message} from 'antd';
import { 
	getTaskListToUser, getTaskDetailToUser, updateIsRead, updateIsSubmit, updateUserIsSubmit, updateIsComplete,updateDescription,
 } from '../../services/taskManage';
import {hashHistory} from 'dva/router';
import storage from '../../utils/browserData';

export default {
	namespace: 'executeTask',

	state: {
		loading: false,
		taskLoading: false,
		taskList: [],
		taskInfo: {},
		detailList: [],
		submitData: {},
		defaultSelectTask: '',

		visible: false,
		editable: false,
		isRead: false,
	},

	subscriptions: {
		setup({dispatch, history}) {
			history.listen( location => {
				if(location.pathname === '/task/execute') {
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
			var index = '0';
			index = payload.task_id?'1':'0';
			yield put({type:'showLoadding'});
			if(!storage.isLogin) {
				message.info('很抱歉,您还没有登录,不能获取到任务信息!');
				hashHistory.push('/login');
			}
			var obj={};
			obj['user_id'] = storage.userId;
			const data = yield call(getTaskListToUser,obj)
			if(data&&data.length>0&&index=='0') {
				obj['task_id'] = data[0].task_id;
				const detailData = yield call(getTaskDetailToUser,obj);
				yield put({
					type:'querySuccess',
					payload: {
						data:data,
						index: index,
						detailData: detailData,
					},
				})
			} else {
				obj['task_id'] = payload.task_id;
				const detailData = yield call(getTaskDetailToUser,obj);
				yield put({
					type:'querySuccess',
					payload: {
						data: data,
						task_id: payload.task_id,
						index: index,
						detailData: detailData,
					},
				})
			}
		},
		*queryDetail({ payload }, { call, put }) {
			yield put({type:'showTaskLoadding'});
			const data = yield call(getTaskDetailToUser,payload)
			if(data) {
				yield put({
					type:'onSetTaskInfo',
					payload: {
						data: data,
						task_id: payload.task_id,
					},
				})
			}
		},
		*readChange({ payload }, { call, put }) {
			yield put({type:'showTaskLoadding'});
			const data = yield call(updateIsRead,payload);
			if(data) {
				yield put({
					type:'query',
					payload: {
						task_id: payload.task_id,
					}
				})
			}
		},
		*taskCompleteSubmit({ payload }, { call, put }) {
			yield put({type:'showTaskLoadding'});
			const data = yield call(updateIsSubmit,payload);
			if(data) {
				yield put({
					type:'query',
					payload: {
						task_id: payload.task_id,
					}
				})
			}
		},
		*detailCompleteSubmit({ payload }, { call, put }) {
			yield put({type:'showTaskLoadding'});
			const data = yield call(updateUserIsSubmit,payload);
			if(data) {
				yield put({
					type:'query',
					payload: {
						task_id: payload.task_id,
					}
				})
			}
		},
		*taskSubmit({ payload }, { call, put }) {
			yield put({type:'showTaskLoadding'});
			const data = yield call(updateDescription,payload);
			if(data) {
				yield put({type:'hideModal'});
				yield put({
					type:'query',
					payload: {
						task_id: payload.task_id,
					}
				})
			}
		}
	},

	reducers: {
		querySuccess(state, action){
			const data = action.payload.data;
			const detailData = action.payload.detailData;
			var task_id = data.length>0?data[0].task_id:null;
			var index = action.payload.index;
			task_id = index=='1'?action.payload.task_id:task_id;
			var taskInfo = data.length>0?data[0]:[];
			taskInfo=getTaskInfo(data,task_id);

			// 获取任务详细情况
			function getTaskInfo(data,id) {
				var obj = {};
				for(let i=0;i<data.length;i++) {
					if(data[i].task_id == id) {
						obj = data[i];
					}
				}
				return obj;
			}

			for(let i=0;i<detailData.length;i++) {
				let a = i+1;
				detailData[i]['index']='第'+a+'项';
			}
			state.defaultSelectTask = task_id;
			state.taskList = data;
			state.taskInfo = taskInfo;
			state.detailList = detailData;
			state.loading = false;
			state.showTaskLoadding = false;
			state.isRead = state.taskInfo.is_read=='1'?true:false;

			state.visible = false;
			return {...state};
		},
		onSetTaskInfo(state,action) {
			const task_id = action.payload.task_id;
			const taskArr = state.taskList;
			const detailData = action.payload.data;
			// 获取任务详细情况
			function getTaskInfo(data,id) {
				var obj = {};
				for(let i=0;i<data.length;i++) {
					if(data[i].task_id == id) {
						obj = data[i];
					}
				}
				return obj;
			}
			state.taskInfo = getTaskInfo(taskArr,task_id);

			for(let i=0;i<detailData.length;i++) {
				let a = i+1;
				detailData[i]['index']='第'+a+'项';
			}
			state.detailList = detailData;
			state.isRead = state.taskInfo.is_read=='1'?true:false;
			state.showTaskLoadding = false;
			return { ...state };
		},
		readChange(state,action) {
			state.isRead = action.payload;
			return { ...state };
		},

		showLoadding(state,action) {
			state.loading = true;
			return { ...state };
		},
		showTaskLoadding(state,action) {
			state.taskLoading = true;
			return { ...state };
		},
		showModal(state, action){
			const taskInfo = action.payload;
			state.submitData['description'] = taskInfo.description;
			state.submitData['url'] = taskInfo.file_url;
			state.submitData['user_id'] = taskInfo.user_id;
			state.submitData['task_id'] = taskInfo.task_id;
			state.visible = true;
			return {...state};
		},
		hideModal(state, action) {
			state.visible = false;
			return {...state};
		}
	},
}