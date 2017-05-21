import React from 'react';
import { parse } from 'qs'
import {message } from 'antd'

export default {
	namespace:'indexModel',

	state:{
		navMenu:[],
	},

	subscriptions:{
		setup({ dispatch, history }) {
			history.listen(location => {
				if(location.pathname === '/home') {
					dispatch({
			        	type: 'query',
			            payload: location.pathname,
			        })
				}
		    })
		}
	},

	effects:{
		*query({ payload }, { call, put }) {
			yield put({type:'navSuccess'});
		}
	},

	reducers:{
		navSuccess(state,action){
			const tempMenu = [{menu: '首页',src: ''}, {menu: '登录平台',src:'login'}, {menu: '申请帐号',src:'myaccount'}, {menu: '帮助文档',src:'helpdoc'},{menu: '更新日志', src:'updatelog'} ];
			state.navMenu = tempMenu;
			return {...state};
		}

	}
}