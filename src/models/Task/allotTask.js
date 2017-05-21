import React from 'react';
import { parse } from 'qs';
import {message} from 'antd';
import { 
	getTaskListName,getTaskInfo,getTaskItemInfo,getGroupInfo,getUserForTask,addUserToTask,updateUserForTask,addUsersToTask,
	updateTaskDetail,
 } from '../../services/taskManage';
import {hashHistory} from 'dva/router';
import storage from '../../utils/browserData';

export default {
	namespace: 'allotTask',

	state: {
		loading: false,
		taskLoading: false,
		detailLoading: false,
		groupLoading: false,
		addUserLoading: false,

		taskList: [],
		taskInfo: {},
		taskDetail: [],
		groupUserList: [],
		groupList:[],
		checkedList: [],

		taskId: '',
		groupId: '',

		indeterminate: true,
		checkAll: false,
	},

	subscriptions: {
		setup({dispatch, history}) {
			history.listen( location => {
				if(location.pathname === '/task/allot') {
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
		*onQueryDetail({ payload }, { call, put }) {
			yield put({type:'showTaskLoadding'});
			yield put({type:'showGroupLoading'});
			const taskInfo = yield call(getTaskInfo,payload);
			const taskDetail = yield call(getTaskItemInfo,payload);
			const groupUserList = yield call(getUserForTask,payload);
			const groupList = yield call(getGroupInfo,payload);
			if(taskInfo&&taskDetail&&groupUserList) {
				yield put({
					type:'queryDetailSuccess',
					payload: {
						taskInfo: taskInfo,
						taskDetail: taskDetail,
						userList: groupUserList,
						groupList: groupList,
					}
				})
			};
		},
		*onQueryGroup({ payload }, { call, put }) {
			const groupUserList = yield call(getGroupInfo,payload);
			if(groupUserList) {
				yield put({
					type:'queryDetailSuccess',
					payload: groupUserList,
				})
			};
		},
		*changeDtail({payload},{ call,put }) {
			const task_id = payload.task_id;
			const taskData = yield call(updateTaskDetail,payload);
			if(taskData) {
				yield put({
					type:'queryTaskItem',
					payload: {
						task_id:task_id,
					},
				})
			}
		},
		*queryTaskItem({payload},{ call,put }) {
			yield put({type:'showDetailLoading'});
			const taskDetail = yield call(getTaskItemInfo,payload);
			if(taskDetail) {
				yield put({
					type:'queryTaskItemsSuccess',
					payload: taskDetail,
				})
			}
		},
		*addUserToTask({payload},{ call,put }) {
			yield put({type:'showAddUserLoading'});
			console.log('addUserToTask----->',payload);
			const data = yield call(addUsersToTask,payload);
			if (data) {
				yield put({
					type:'onQueryDetail',
					payload: payload,
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
		queryDetailSuccess(state, action) {
			const data = action.payload;
			const users = data.groupList;
			state.taskInfo=data.taskInfo[0];
			state.taskDetail=data.taskDetail;
			state.groupUserList=data.groupList;
			state.groupList = [data.groupList[0]];

			state.groupLoading=false;
			state.taskLoading=false;
			state.detailLoading = false;
			state.addUserLoading = false;

			function setCheckedArr(data) {
				var arr = [];
				if(data.length>0) {
					for(let i=0;i<data.length;i++) {
						arr.push(data[i].group_user_id);
					}
				}
				return arr;
			}
			state.checkedList = setCheckedArr(users);
			state.taskId = state.taskInfo.id;
			return { ...state };
		},
		queryGroupSuccess(state, action) {
			state.groupUserList=action.payload.groupInfo;
			state.groupLoading=false;
			state.addUserLoading = false;
			return { ...state };
		},
		queryTaskItemsSuccess(state, action) {
			state.taskDetail=action.payload;
			state.detailLoading=false;
			return { ...state };
		},
		checkAllChange(state, action) {
			const checked = action.payload;
			const userData = state.groupUserList;
			function setCheckedArr(data) {
				var arr = [];
				for(let i=0;i<data.length;i++) {
					// 整形会导致超出int类型的最大长度
					// arr.push(parseInt(data[i].group_user_id));
					arr.push(data[i].group_user_id);
				}
				return arr;
			}
			state.checkedList = checked ? setCheckedArr(userData) : [],
			state.indeterminate= false;
			state.checkAll=checked;
			return { ...state };
		},
		checkdUser(state,action) {
			state.checkAll = state.checkedList.length === action.payload.length;
			state.checkedList = action.payload;
			state.indeterminate=!!state.checkedList.length && (state.checkedList.length < action.payload.length);
			return { ...state };
		},
		setTaskInfo(state,action) {
			state.groupId = action.payload;
			state.taskId = state.taskInfo.id;
			return { ...state };
		},
		showLoadding(state,action) {
			state.loading = true;
			return { ...state };
		},
		showModal(state, action){
			return {...state};
		},
		hideModal(state, action) {
			return {...state};
		},
		showTaskLoadding(state,action){
			state.taskLoading = true;
			return { ...state };
		},
		showDetailLoading(state,action){
			state.detailLoading = true;
			return { ...state };
		},
		showGroupLoading(state,action){
			state.groupLoading = true;
			return { ...state };
		},
		showAddUserLoading(state,action){
			state.addUserLoading = true;
			return { ...state };
		},
	},
}