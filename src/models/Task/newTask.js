import React from 'react';
import { parse } from 'qs';
import {message,} from 'antd';
import {hashHistory} from 'dva/router';
import {getTaskList, getTaskListByUser, getTaskDetail, addTask, addTaskDetail, updateTask, hideTask, updateTaskDetail, } from '../../services/taskManage';
// import { getList,getGroupByUserId} from '../../services/Cms/groupManage';
import storage from '../../utils/browserData';
export default {
	namespace: 'newTask',

	state: {
		user_id: '',
		uuid: 1,
		loading: true,
		taskLoading: false,
		detailLoading: false,
		groupList: [],

		startValue: null,
    	endValue: null,
    	endOpen: false,

    	detailData: [],
    	taskData:[],

    	selectedGroup: null,
	},

	subscriptions: {
		setup({dispatch, history}) {
			history.listen( location => {
				if(location.pathname === '/task/newtask') {
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
			// const data = yield call(query,payload)
			yield put({type:'showTaskLoadding'});
			if(!storage.isLogin) {
				message.info('很抱歉,您还没有登录,不能发布任务!');
				hashHistory.push('/login');
			}
			const obj={};
			obj['userId'] = storage.userId;
			obj['user_id'] = storage.userId;
			// 获取任务列表
			const taskData = yield call(getTaskListByUser,obj);
			// 获取分组列表
			// const groupData = yield call(getGroupByUserId,obj);
			// if(taskData&&groupData) {
			// 	yield put({
			// 		type:'querySuccess',
			// 		payload: {
			// 			user_id:obj.userId,
			// 			task_data:taskData,
			// 			groupData:groupData,
			// 		}
			// 	})
			// }
		},
		*queryTaskDetail({ payload }, { call, put }) {
			yield put({type:'showDetailLoading'});
			const obj={};
			obj['task_id'] = payload.task_id;
			const detailData = yield call(getTaskDetail,obj);
			if(detailData) {
				yield put({
					type:'queryTaskDetailSuccess',
					payload: {
						taskId:obj.task_id,
						detailData:detailData,
					},
				})
			}
		},
		*queryTaskList({ payload }, { call, put }) {
			yield put({type:'showTaskLoadding'});
			const obj={};
			obj['user_id'] = storage.userId;
			// 获取任务列表
			const data = yield call(getTaskListByUser,obj);
			if(data) {
				yield put({
					type:'queryTaskListSuccess',
					payload: data,
				})
			}
		},
		*addTask({payload},{ call,put }) {
			const taskData = yield call(addTask,payload);
			if(taskData) {
				yield put({type:'showTaskLoadding'});
				const obj={};
				obj['user_id'] = storage.userId;
				// 获取任务列表
				const data = yield call(getTaskListByUser,obj);
				if(data) {
					yield put({
						type:'queryTaskListSuccess',
						payload: data,
					})
				}
			}
		},
		*changeDtail({payload},{ call,put }) {
			const task_id = payload.task_id;
			const taskData = yield call(updateTaskDetail,payload);
			if(taskData) {
				yield put({
					type:'queryTaskDetail',
					payload: {
						task_id:task_id,
					},
				})
			}
		}
	},

	reducers: {
		querySuccess(state, action) {
			const user_id = action.payload.user_id;
			const task_data = action.payload.task_data;
			const group_data = action.payload.groupData;
			var tempArr = [];
			for(let i=0;i<task_data.length;i++) {
				const obj={};
				obj['task_id']=task_data[i].id;
				obj['arr']=[];
				tempArr.push(obj);
			}

			state.user_id = user_id;
			state.taskData = task_data;
			state.detailData = tempArr;
			state.groupList = group_data;
			state.taskLoading = false;
			state.selectedGroup = group_data&&group_data.length>0?group_data[0].group_id:null;
			return {...state};
		},
		queryTaskListSuccess(state,action) {
			state.taskData = action.payload;
			state.taskLoading = false;
			return { ...state };
		},
		queryTaskDetailSuccess(state,action) {
			var taskId = action.payload.taskId;
			const detailData = action.payload.detailData;
			for(let i=0;i<state.detailData.length;i++) {
				if(state.detailData[i].task_id==taskId) {
					state.detailData[i].arr=detailData;
				}
			}
			state.detailLoading = false;
			return { ...state };
		},
		showTaskLoadding(state,action){
			state.taskLoading = true;
			return { ...state };
		},
		showDetailLoading(state,action){
			state.detailLoading = true;
			return { ...state };
		},
		showLoadding(state,action) {
			state.loading = true;
			return { ...state };
		},
		addUUID(state,action) {
			state.uuid = state.uuid+1;
			return { ...state };
		},
		showModal(state, action){
			return {...state};
		},
		hideModal(state, action) {
			return {...state};
		},
		// 时间处理方法块
		onStartChange(state,action) {
			state.startValue = action.payload;
			return { ...state };
		},
		onEndChange(state,action) {
			state.endValue = action.payload;
			return { ...state };
		},
		handleStartOpenChange(state,action) {
			const open = action.payload;
			if(!open) {
				state.endOpen = true;
			}
			return { ...state };
		},
		handleEndOpenChange(state,action) {
			state.endOpen = action.payload;
			return { ...state };
		},

		// 群组选择
		onGroupChange(state,action) {
			state.selectedGroup = action.payload;
			return { ...state };
		},

		// 重置信息
	},
}