import React from 'react';
import { parse } from 'qs';
import {message} from 'antd';

export default {
	namespace: 'showProject',

	state: {
		projectList: [],
		popoverVisible: false,
	},

	subscriptions: {
		setup({dispatch, history}) {
			history.listen( location => {
				if(location.pathname === '/showProject') {
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
			yield put({type:'setProjectList',})
			if(true) {
				yield put({
					type:'querySuccess',
				})
			}
		},
	},

	reducers: {
		querySuccess(state,action) {

			return { ...state };
		},
		setProjectList(state,action) {
			const tempData = [
				{	name:'CronTab',
					content:'时间解析工具,将返回一个时间解析函数',
					descript:'用于计划任务组中进行时长或时间段执行函数表达式',
					go:'oppen',
					state: 1,
					src:'/cron'
				},
				{	name:'图片分享',
					content:'请带上一双别致的眼看世界,同时可以随时上传新的图片到文件中,请文明分享和使用图片',
					descript:'',
					go:'image',
					state: 1,
					src:'/showImage'
				},
				{	name:'音乐分享',
					content:'累了,倦了,回归音乐的世界,获取你有新的憧憬和梦想',
					descript:'',
					go:'music',
					state: 1,
					src:'#'
				},
				{	name:'游戏设计',
					content:'React设计的简单游戏，游戏用于开发自己的脑洞',
					descript:'',
					go:'game',
					state: 1,
					src:'/game/cargame'
				},
				{	name:'未完待续',
					content:'我的梦远远没有完,你们呢?',
					descript:'',
					go:'please wait',
					state: 0,
					src:'#/showProject'
				}
			];
			state.projectList = tempData;
			return { ...state };
		},
		onPopoverChange(state,action) {
			state.popoverVisible = !state.popoverVisible;
			return { ...state };
		}
	},
}