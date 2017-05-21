import { getList,getGroupByUserId,getGroupUserStudent,updateGroup,add,searchByKeyword,deleteGroup,addGroupUser} from '../../services/Cms/groupManage'
import { parse } from 'qs'
import {message} from 'antd';
import storage from '../../utils/browserData';

export default {
	namespace: 'groupManage',

	state: {
		listData:[],
	    userList: [],
	    checkedList:[],
	    groupList:[],
	    loading: false, 
	    currentItem: {},
	    selectedRowKeys: [],
	    modalVisible: false, 
	    listModalVisible:false,
	    groupUserModalVisible: false,
	    modalType:'',
	},
	
	//类似监听
	subscriptions: {
		setup({ dispatch, history }) {
	  		history.listen(location => {
		    	if (location.pathname === '/user/groupManage') {
		      		dispatch({
			        	type: 'query',
			        	payload: location.query,
		      		});
		   		}
			});
		},
	},
	effects: {
		*query({payload},{ call,put}) {
			yield put({ type: 'showLoading' });
			const data = yield call(getGroupByUserId,{userId:storage.userId} )
			if (data) {
				yield put({
					type:'querySuccess',
					payload: {
						groupList: data,
					}
				});
			}
		},
		// 学生列表
	    *queryUser({ payload }, {select, call, put }) {
	      const data=yield call(getGroupUserStudent,payload)
	      if(data){
	    	  var userList=[]
	    	  var checkedList=[]
	    	  for(var i=0;i<data.length;i++){
	    	  	var json={}
	    	  	json['label']=data[i].user_name
	    	  	json['value']=data[i].id
	    	  	userList.push(json)
	    	  	if(data[i].checked==1){
	    	  		checkedList.push(data[i].id)
	    	  	}
	    	  }
	    	  yield put({type:'querySuccess',payload:{userList:userList,checkedList:checkedList,groupUserModalVisible:true}})
	    	}
	      },

		*search({payload},{ call,put}) {
			yield put({ type: 'showLoading' })
			const newUser={...payload,userId:storage.userId}
			const data = yield call( searchByKeyword,newUser )
			if (data) {
				yield put({
					type:'querySuccess',
					payload: {
						roleList: data,
					}
				});
			}
		},

		*add({payload},{ call,put}) {
			yield put({ type: 'hideModal'})
			yield put({ type: 'showLoading' })
			const newUser={...payload,userId:storage.userId}
			const data = yield call( add, newUser )
			if(data) {
				message.success("增加成功");
				yield put({
					type: 'query'
				})
			}
		},

		*update({payload},{ select,call,put}) {
			yield put({ type: 'hideModal'})
			yield put({ type: 'showLoading' })
			const data = yield call( updateGroup, payload )
			if(data) {
				message.success("修改成功");
				yield put({
					type: 'query'
				})
			}
		},

		*deleteGroup({payload},{ call,put}) {
			yield put({ type: 'showLoading' })
		    const data = yield call(deleteGroup, payload)
		    if (data) {
		        message.success("删除成功");
		        yield put({
		          type: 'query'
		        })
		    } else {
		    	message.error("删除失败");
		        yield put({
		          type: 'query'
		        })
		    }
		},
		*addGroupUser({payload},{ call,put}){
			const data=yield call(addGroupUser,payload)
			if(data){
			yield put({type:'querySuccess',payload:{selectedRowKeys:[],groupUserModalVisible:false}})
			message.success('添加成员成功')	
			}	
		},
		*showList({payload},{call,put}){
			const data=yield call(getList,payload)
			if(data){
			yield put({type:'querySuccess',payload:{listData:data,listModalVisible:true}})
			}
		}
	},

	reducers: {
		showLoading(state, action){
			return {loading: true};
		},
		querySuccess(state, action){
			return {...state, ...action.payload,loading: false};
		},
	    showModal(state, action){
	    	return {...state, ...action.payload, modalVisible: true  }
	    },
	    hideModal(state, action){
	    	return {...state, ...action.payload, modalVisible: false,groupUserModalVisible: false }
	    },
	    clearSelectedRowKeys(state) {
	    	state.selectedRowKeys=[];
	    	return { ...state }
	    },
	    onSelectChange(state,action){
	      state.selectedRowKeys = action.payload
	      return { ...state}
	    },
	}
}