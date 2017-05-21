import React from 'react';
import { parse } from 'qs';
import {message} from 'antd';
import {hashHistory} from 'react-router';
import {judgeInvite,useInvite,repeatJudgeInvite,regist,userExists} from '../services/userRegist';

export default {
	namespace: 'userRegist',

	state: {
		judgePwd: '',
		loading: false,
		visible: false,
		isExisits: null,
		invite: true,
		startState: false,
		agreement: false,
		inviteCode: '',
	},

	subscriptions: {
		setup({dispatch, history}) {
			history.listen( location => {
				if(location.pathname === '/regist') {
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
			// if(data) {
			// 	yield put({
			// 		type:'querySuccess',
			// 		payload: data,
			// 	})
			// }
		},
		*judgeInvite({payload},{call,put}) {
			yield put({type:'showLoadding'})
			const obj={};
			obj['invite']=payload;
			const data = yield call(judgeInvite,obj);
			if(data&&data.length=='1') {
				yield put({type:'hideLoadding'})
				yield put({type:'isStart',payload:payload})
				message.success('恭喜您,验证成功！赶紧注册并加入我们吧。',2);
			} else {
				yield put({type:'hideLoadding'})
				message.error('很抱歉,验证失败！如果确认该邀请码有效请核对无误后重新验证吧。',3);
			}
		},
		*useInvite({payload},{call,put}) {
			yield put({type:'showLoadding'})
			const obj={};
			obj['invite']=payload;
			const data = yield call(useInvite,obj);
			if(data) {
				yield put({type:'hideLoadding'})
				yield put({type:'hideInvite'})
			} else {
				message.error('无法启动注册程序，因为注册码无法使用。',2);
			}
		},
		*judgeUser({payload},{call,put}) {
			const obj={};
			obj['user_name'] = payload;
			const data = yield call(userExists,obj)
			if(data && !data.is_exists) {
				yield put({type:'notUse'});
			} else {
				yield put({type:'isUsed'});
			}
		},
		*addUser({payload},{call,put}) {
			yield put({type:'showLoadding'})
			const obj={};
			obj['invite']= payload.invite;
			const judgeRepeat = yield call(repeatJudgeInvite,obj);
			if(judgeRepeat&&judgeRepeat.length=='1') {
				const data = yield call(regist,payload);
				if(data) {
					yield put({type:'clearInvite'})
					yield put({type:'hideLoadding'})
					message.success('恭喜您,注册成功！将跳转到登录页面。',2);
					hashHistory.push('/login');
				}
			} else {
				message.error('您还没有输入邀请码，无法注册。',2);
			}

		}
	},

	reducers: {
		querySuccess(state, action){
			return {...state};
		},
		showLoadding(state,action) {
			state.loading = true;
			return { ...state };
		},
		hideLoadding(state,action) {
			state.loading = false;
			return { ...state };
		},
		showModal(state, action){
			state.visible=true;
			return {...state};
		},
		hideModal(state, action) {
			state.visible=false;
			return {...state};
		},
		agreementChange(state,action) {
			state.agreement=action.payload;
			state.visible=false;
			return {...state}
		},
		onCheckbox(state,action) {
			state.agreement=action.payload;
			return {...state}
		},
		onJudgePwd(state,action) {
			state.judgePwd = action.payload;
			return { ...state }
		},
		showInvite(state,action) {
			state.invite = true;
			return { ...state };
		},
		hideInvite(state,action) {
			state.invite = false;
			return { ...state };
		},
		isStart(state,action) {
			state.inviteCode = action.payload;
			state.startState = true;
			return { ...state };
		},
		notStart(state,action) {
			state.startState = false;
			return { ...state };
		},
		isUsed(state,action) {
			state.isExisits = true;
			return { ...state };
		},
		notUse(state,action) {
			state.isExisits = false;
			return { ...state };
		},
		clearInvite(state,action) {
			state.invite= true;
			state.startState= false;
			state.inviteCode = '';
			return { ...state }
		}
	},
}