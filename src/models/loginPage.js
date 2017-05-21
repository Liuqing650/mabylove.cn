import React from 'react';
import { parse } from 'qs';
import {message} from 'antd';
import {login} from '../services/loginPage';
import {hashHistory} from 'react-router';
import storage from '../utils/browserData';

export default {

  namespace: 'loginPage',

  state: { 
    loading: false,
    disabled: false,
  },

  effects: {
    *login({ payload }, { call, put }) {
      yield put({type:'showLoading'});
      localStorage.clear();
      const data = yield call(login,payload)
      if(data) {
        const loginMsg = data.loginMsg;
        if(loginMsg) {
          if(loginMsg[0].state==1) {
            // console.log("loginMsg=========>",loginMsg)
            message.success('登陆成功')
            localStorage.setItem('nickName', loginMsg[0].nick_name);
            localStorage.setItem('userId', loginMsg[0].id);
            localStorage.setItem('avatar',loginMsg[0].avatar?loginMsg[0].avatar:null);
            localStorage.setItem('pk', loginMsg[0].powkey);
            console.log('storage--old----->',storage);
            // 插入值进入到storage中。
            storage&&storage.isLogin?storage:setStorage();
            console.log('storage--new----->',storage);
            // 判断是否获取到浏览器中的数据，没有则直接赋予
            function setStorage() {
              storage.userId = loginMsg[0].id;
              storage.avatar = loginMsg[0].avatar?loginMsg[0].avatar:null;
              storage.nickName = loginMsg[0].nick_name;
              storage.pk = loginMsg[0].powkey;
              storage.isLogin = loginMsg[0].id?true:false;
            }
            yield put({type:'hideLoading'});
            hashHistory.push('/home');
            yield put({
              type:'loginSuccess',
              payload: loginMsg,
            })
          } else if(loginMsg[0].state==2) {
            message.warning('您的账号已被封')
            yield put({type:'hideLoading'});
          } else if(loginMsg[0].state==0) {
            message.warning('登陆失败,您的账号或者密码错误!')
            yield put({type:'hideLoading'});
          }
        } else {
          message.error('登陆失败,您的账号或者密码错误!')
          yield put({type:'hideLoading'});
        }
      } else {
        yield put({type:'hideLoading'});
      }
    },
  },

  reducers: {
    loginSuccess(state, action) {
      return { ...state, };
    },
    showLoading(state, action) {
      state.loading = true;
      return { ...state, };
    },
    hideLoading(state, action) {
      state.loading = false;
      return { ...state, };
    },
  },

};
