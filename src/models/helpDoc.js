import React from 'react';
import { parse } from 'qs';
import {message} from 'antd';
import {query,} from '../services/helpDoc';

export default {
	namespace: 'helpDoc',

	state: {
		loading: true,
		helpDocList: [],
		helpDocContent: [],
	},

	subscriptions: {
		setup({dispatch, history}) {
			history.listen( location => {
				if(location.pathname === '/helpdoc') {
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
			const testList = [
				{id:'1',value: '类型一',pid:'0'},
				{id:'2',value: '类型二',pid:'0'},
				{id:'3',value: '类型三',pid:'0'},
				{id:'4',value: '类型四',pid:'0'},
				{id:'5',value: '类型五',pid:'0'},

				{id:'6',value: '文档一',pid:'1'},
				{id:'7',value: '文档二',pid:'1'},
				{id:'8',value: '文档三',pid:'1'},
				{id:'9',value: '文档四',pid:'1'},
				{id:'10',value: '文档一',pid:'2'},
				{id:'11',value: '文档二',pid:'2'},
				{id:'12',value: '文档三',pid:'2'},
				{id:'13',value: '文档四',pid:'2'},
				{id:'14',value: '文档一',pid:'3'},
				{id:'15',value: '文档二',pid:'3'},
				{id:'16',value: '文档三',pid:'3'},
				{id:'17',value: '文档四',pid:'3'},
				{id:'18',value: '文档一',pid:'4'},
				{id:'19',value: '文档二',pid:'4'},
				{id:'20',value: '文档三',pid:'4'},
				{id:'21',value: '文档四',pid:'4'},
				{id:'22',value: '文档一',pid:'5'},
				{id:'23',value: '文档二',pid:'5'},
				{id:'24',value: '文档三',pid:'5'},
				{id:'25',value: '文档四',pid:'5'},
			]

			const testContent = [
				{id:'6',content:'这是一段关于第1组的描述性文字'},
				{id:'7',content:'这是一段关于第1组的描述性文字'},
				{id:'8',content:'这是一段关于第1组的描述性文字'},
				{id:'9',content:'这是一段关于第1组的描述性文字'},
				{id:'10',content:'这是一段关于第2组的描述性文字'},
				{id:'11',content:'这是一段关于第2组的描述性文字'},
				{id:'12',content:'这是一段关于第2组的描述性文字'},
				{id:'13',content:'这是一段关于第2组的描述性文字'},
				{id:'14',content:'这是一段关于第3组的描述性文字'},
				{id:'15',content:'这是一段关于第3组的描述性文字'},
				{id:'16',content:'这是一段关于第3组的描述性文字'},
				{id:'17',content:'这是一段关于第3组的描述性文字'},
				{id:'18',content:'这是一段关于第4组的描述性文字'},
				{id:'19',content:'这是一段关于第4组的描述性文字'},
				{id:'20',content:'这是一段关于第4组的描述性文字'},
				{id:'21',content:'这是一段关于第4组的描述性文字'},
				{id:'22',content:'这是一段关于第5组的描述性文字'},
				{id:'23',content:'这是一段关于第5组的描述性文字'},
				{id:'24',content:'这是一段关于第5组的描述性文字'},
				{id:'25',content:'这是一段关于第5组的描述性文字'},
			]
			state.helpDocList = testList;
			state.helpDocContent = testContent;
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
		}
	},
}