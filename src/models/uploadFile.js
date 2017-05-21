import React from 'react';
import { parse } from 'qs';
import {message} from 'antd';
import storage from '../utils/browserData';
export default {
	namespace:'uploadFile',

	state:{
		previewVisible: false,
		loading: false,
		previewImage:'',
		uploadInterface:'',
		uploadMsg:{},
		fileList: [{uid: -1,name: 'xxx.png',status: 'done',url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'}],
	},

	subscriptions: {
		setup({dispatch, history}) {
			history.listen( location => {
				if(location.pathname === '/uploadFile') {
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
			if(true) {
				yield put({
					type:'querySuccess',
				})
			}
		},
		*updateFile({payload},{call,put}) {
			const file = payload;
			yield put({
				type:'showPreviewVisible',
				payload: payload,
			});
		}
	},

	reducers: {
		querySuccess(state,action) {
			return { ...state };
		},
		showPreviewVisible(state,action) {
			const file = action.payload;
			state.previewImage=file.url || file.thumbUrl;
			state.previewVisible = true;
			return { ...state };
		},
		hidePreviewVisible(state,action) {
			state.previewVisible = false;
			return { ...state };
		},
		showLoading(state,action) {
			state.loading = true;
			return { ...state }
		},
		hideLoading(state,action) {
			state.loading = false;
			return { ...state };
		},
		fileChange(state,action) {
			return { ...state,...action.payload};
		},
		changeUploadData(state,action) {
			const msg = storage.userId;
			state.uploadMsg = {};
			state.uploadMsg['user_id']=msg;
			state.uploadInterface=action.payload;
			return { ...state };
		}
	}
}