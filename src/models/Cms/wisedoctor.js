import { parse } from 'qs'
import {message} from 'antd'
import {getDrugList,getDrugListById} from '../../services/Cms/wisedoctor';
import {hashHistory} from 'react-router';
export default {
	namespace:'wisedoctor',

	state:{
	loading:false,
    drugArray:[],
    previewImage:'',
    previewVisible:false,
    index:'',
    controller:false
	},
	subscriptions:{
		setup({ dispatch, history }) {
			history.listen(location => {
				if(location.pathname=== '/app/wisedoctor'){
					dispatch({
					type: 'query',
					payload: location.pathname,
				})
				}
			})
		}
	},

	effects:{
		*query({payload},{call,put}){
		  yield put({type:'showLoading'})
		  const data=yield call(getDrugList)
		  if(data.status){
		  yield put({type:'querySuccess',payload:{drugArray:data.tngou}})
		  yield put({type:'hideLoading'})
		  }
	    },
	    *getDrugListById({payload},{call,put}){
	      yield put({type:'showLoading'})
          const data=yield call(getDrugListById,payload)
          if(data.status){
          yield put({type:'querySuccess',payload:{drugArray:data.tngou}})
          yield put({type:'hideLoading'})
          }
	    }
	},

	reducers:{
        querySuccess(state,action){
            return {...state,...action.payload}
        },
        showLoading(state,action){
        	state.loading=true;
            return {...state,...action.payload}
        },
        hideLoading(state,action){
        	state.loading=false;
            return {...state,...action.payload}
        },

    }
}