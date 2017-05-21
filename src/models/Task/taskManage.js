import React from 'react';
import { parse } from 'qs';
import {message} from 'antd';
import {query,} from '../../services/helpDoc';

export default {
	namespace: 'taskManage',

	state: {
		value:5,
		loading: true,
		taskDataList: [],
		taskDataContent: [],
	},

	subscriptions: {
		setup({dispatch, history}) {
			history.listen( location => {
				if(location.pathname === '/task') {
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
			const data = yield call(query,payload)
			if(!data) {
				yield put({
					type:'querySuccess',
					payload: data,
				})
			}
		},
	},

	reducers: {
		querySuccess(state, action){
			return {...state};
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
		success(state,action){
			return {...state,...action.payload}
		}
	},
}