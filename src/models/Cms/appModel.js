import { parse } from 'qs'
import {message} from 'antd'
import {updatePassword,logout,getMenuByUserId} from '../../services/Cms/login';
import {hashHistory} from 'react-router';
import storage from '../../utils/browserData';
export default {
	namespace:'appModel',

	state:{
		loading:false,
		menu:[],
		selectedKeys:['0'],
		menuSelectedKeys:[],
		openKeys:[],
		defaultOpenKeys:'',
		visibleModal: false
	},
	subscriptions:{
		setup({ dispatch, history }) {
			history.listen(location => {
				dispatch({
					type: 'getMenuByUserId',
					payload: location.pathname,
				})
				dispatch({
					type: 'configKeyModal',
					payload: location.pathname,
				})
			})
		}
	},

	effects:{
		*updatePassword({ payload }, { call, put }) {
			const data=yield call(updatePassword,payload)
			if(data.msg){
		      message.success('修改成功')
		      yield put({type:'querySuccess',payload:{visibleModal:false}})
			}
			else message.error('原密码不一致')
		},
	    *logout({ payload }, { call, put }){
	    	const data=yield call(logout,payload)
	    	if(data){
	    	  message.success('注销成功')
	    	}
	    },
	    *getMenuByUserId({ payload }, { call, put }){
	    	if(storage.isLogin){
	    		const data=yield call(getMenuByUserId,{userId:storage.userId})
		        function fn(data, p_id) {
	    			var result = [], temp;
	    			for (var i = 0; i < data.length; i++) {
	        		if (data[i].p_id == p_id) {
	           		var obj = data[i];
	            	temp = fn(data, data[i].menu_id);
	           		if (temp.length > 0) {
	                obj.child = temp;
	            	}
	            	result.push(obj);
	        		}
	    		}
    		return result;
  			}
  		    yield put({type:'querySuccess',payload:{menu:fn(data,-1)}})
	    	}
	    }
	},

	reducers:{
        querySuccess(state,action){
            return {...state,...action.payload}
        },
        configKeyModal(state,action){
        	var selected=action.payload.split("/")
        	var selectedPathname = selected[selected.length-1];
			state.menuSelectedKeys = [selectedPathname]
			if(selected.length>2){
				state.openKeys=[selected[selected.length-2]]
			}
        	if(action.payload=='/home'){
        		state.selectedKeys=[]
        		state.selectedKeys.push('0')
        	}
        	if(action.payload=='/game'){
        		state.selectedKeys=[]
        		state.selectedKeys.push('1')
        	}
        	if(action.payload=='/manage'){
        		state.selectedKeys=[]
        		state.selectedKeys.push('2')
        	}
        	if(action.payload=='/upload'){
        		state.selectedKeys=[]
        		state.selectedKeys.push('3')
        	}
        	if(action.payload=='/login'){
        		state.selectedKeys=[]
        		state.selectedKeys.push('4')
        	}
        	return {...state};
        },

    }
}