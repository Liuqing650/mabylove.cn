import { parse } from 'qs'
import {message} from 'antd'
import {getPictureList,getPictureListById,getData,getWeather} from '../../services/Cms/picture';
import {hashHistory} from 'react-router';
// import getPictureList from '../utils/jqAjaxUtil';
export default {
	namespace:'picture',

	state:{
		weatherData:'',
		size:128,
		value:'http://www.cnblogs.com/cosyer/',
		bgColor:'#FFFFFF',
		fgColor:'#000000',
		level:'L',
		htData:[],
    pictureArray:[],
    previewImage:'',
    previewVisible:false,
    index:''
	},
	subscriptions:{
		setup({ dispatch, history }) {
			history.listen(location => {
				if(location.pathname=== '/app/picture'){
					dispatch({
					type: 'query',
					payload: location.pathname,
				})
				}
				if(location.pathname=== '/app/handsontable'){
					dispatch({
					type: 'getData',
					payload: location.pathname,
				})
				}
			})
		}
	},

	effects:{
		*query({payload},{call,put}){
		  const data=yield call(getPictureList)
		  if(data.status){
		  yield put({type:'querySuccess',payload:{pictureArray:data.tngou}})
		  }
	    },
	    *getPictureListById({payload},{call,put}){
          const data=yield call(getPictureListById,payload)
          yield put({type:'querySuccess',payload:{pictureArray:data.tngou}})
	    },
	    *getData({payload},{call,put}){
	      const data=yield call(getData)
	      yield put({type:'querySuccess',payload:{htData:data}})
	    },
	    *searchWeather({payload},{call,put}){
	      const data=yield call(getWeather,payload)
	      if(data.error==0){
	      yield put({type:'querySuccess',payload:{weatherData:data.results[0].weather_data}})
	      }
	      else message.info(data.status)
	    }
	},

	reducers:{
        querySuccess(state,action){
            return {...state,...action.payload}
        }

    }
}