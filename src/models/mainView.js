import {logout} from '../services/loginPage';
import storage from '../utils/browserData';

export default {
	namespace:'mainView',
	state:{
		navMenu:[],
		defaultKey: ['home'],
		selectedKeys: [],
		visible: false,
		loginState: false,
		initMenu:[],
	},

	subscriptions:{
		setup({ dispatch, history }) {
			history.listen(location => {
		        dispatch({
		        	type: 'query',
		            payload: location.pathname,
		        })
		    })
		}
	},

	effects:{
		*query({ payload }, { call, put }) {
			yield put({
				type:'navSuccess',
				payload: payload,
			});
		},
		*changePassword({ payload }, { call, put }) {
			console.log('目前没做');
			yield put({
				type:'changeSuccess',
				payload: payload,
			});
		},
		*onSignOut({ payload }, { call, put }) {
		  const data=yield call(logout,{userId:storage.userId})
		  yield put({type:'signOut'})
		}
	},

	reducers:{
		// navSuccess(state,action){
		// 	const tempMenu = [{menu_name: '首页',src: 'home'}, {menu_name: '登录平台',src:'login'}, {menu_name: '申请帐号',src:'regist'}, {menu_name: '帮助文档',src:'helpdoc'},{menu_name: '更新日志', src:'updatelog'} ];
		// 	var loginStorage = localStorage;
		// 	if(loginStorage) {
		// 		const obj = {};
		// 		obj['menu_name']=loginStorage.nick_name;
		// 		if(loginStorage.nick_name) {
		// 			obj['src']='myself';
		// 			tempMenu.push(obj);
		// 		}
		// 	}
		// 	state.navMenu = tempMenu;
		// 	var tempMenuItem = state.navMenu
		// 	var pathname = action.payload;
		// 	var tempPath = pathname.split("/")[pathname.split("/").length-1];
		// 	state.selectedKeys = [tempPath]
		// 	return {...state};
		// }

		navSuccess(state,action){
			var tempMenu = [{menu_name: '首页',src: 'home'}, {menu_name: '交流广场',src:'blog'}, {menu_name: '申请帐号',src:'regist'}, {menu_name: '任务中心',src:'task'},{menu_name: '更新日志', src:'updatelog'},{menu_name: '登录', src:'login'}];
			var loginSuccessMenu = [];
			if(storage.isLogin) {
				state.loginState = true;
				loginSuccessMenu = removeLogin(tempMenu,'login');
			} else {
				loginSuccessMenu = tempMenu;
			}

			function removeLogin(menu,src) {
				var arr=[];
				for(let i=0;i<menu.length;i++) {
					if(menu[i].src!=src) {
						arr.push(menu[i])
					}
				}
				return arr;
			}
			state.initMenu = tempMenu;
			state.navMenu = loginSuccessMenu;
			var tempMenuItem = state.navMenu
			var pathname = action.payload;
			var tempPath = pathname.split("/")[pathname.split("/").length-1];
			state.selectedKeys = [tempPath]
			return {...state};
		},
		changeSuccess(state,action) {
			state.visible = false;
			return{...state};
		},
		onShowModal(state,action) {
			state.visible = true;
			return{...state};
		},
		onHideModal(state,action) {
			state.visible = false;
			return{...state};
		},
		signOut(state,action) {
			localStorage.clear();
			state.loginState = false;
			state.navMenu = [];
			state.navMenu = state.initMenu;
			return{...state};
		}
	}
}