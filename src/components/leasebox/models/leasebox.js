import router from 'umi/router';
import {Toast} from 'antd-mobile';
import moment from 'moment';
import 'moment/locale/zh-cn';
import * as leaseService from '../services/leasebox';

export default {
  namespace: 'leasebox',
  state: {
    visible: false,
    config: {},
    submitData: {},
    saveData: {}, // 临时表单数据
    isSubmit: false,
    isUpdate: false,
    orderId: null,
    companyId: null,
    type: 'RENT'
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/order/leasebox') {
          dispatch({
            type: 'search',
            payload: location.query
          });
        }
      });
    }
  },
  effects: {
    *search({payload}, {select, call, put}) {
      const status = payload.status || false;
      const config = {
        local: localStorage.getItem('leasebox') || '{}',
        origin: {}
      };
      if (!payload.orderId && (!status || status === 'add')) {
        localStorage.leasebox = '';
        const clientStore = yield select((state) => { return state.client; });
        yield put({
          type: 'resetState',
          payload: clientStore.userInfo
        });
      } else if (config.local && status === 'edit') {
        const localData = JSON.parse(config.local);
        yield put({
          type: 'combined',
          payload: localData
        });
      } else if (payload.orderId) {
        const req = {
          orderId: payload.orderId,
          status: payload.status
        };
        if (payload.companyId) {
          req.companyId = payload.companyId;
        }
        const data = yield call(leaseService.getOrderList, req);
        yield put({
          type: 'updateState',
          payload: data
        });
      }
      if (payload.companyId) {
        yield put({
          type: 'change',
          payload: {
            companyId: payload.companyId
          }
        });
      }
    },
    *addOrder({payload}, {call, put}) {
      yield put({type: 'changeSubmitStatus', payload: true});
      Toast.loading('提交中...', 0, true);
      // 解析时间
      const handleDateToStr = (date) => {
        return date ? moment(date).format('YYYY-MM-DD') : null;
      };
      payload.requiredDate = handleDateToStr(payload.requiredDate);
      yield call(leaseService.createOrder, payload);
      yield put({type: 'changeSubmitStatus', payload: false});
      Toast.hide();
      Toast.success('提交完成', 1, () => {
        router.push('/');
      });
    },
    *modifyOrder({ payload }, { call, put }) {
      Toast.loading('提交中...', 0, true);
      yield put({ type: 'changeSubmitStatus', payload: true });
      // 解析时间
      const handleDateToStr = (date) => {
        return date ? moment(date).format('YYYY-MM-DD') : null;
      };
      payload.requiredDate = handleDateToStr(payload.requiredDate);
      const orderId = payload.orderId;
      yield call(leaseService.modifyOrder, payload, orderId);
      yield put({ type: 'changeSubmitStatus', payload: false });
      console.log('payload------>', payload);
      Toast.hide();
      Toast.success('提交完成', 1, () => {
        router.push('/');
      });
    }
  },
  reducers: {
    change(state, action) {
      return {...state, ...action.payload};
    },
    changeSubmitStatus(state, action) {
      state.isSubmit = action.payload;
      return {...state};
    },
    combined(state, action) { // 合并数据到submitData
      state.submitData = {...state.submitData, ...action.payload};
      return {...state};
    },
    saveForm(state, action) {
      state.saveData = action.payload;
      localStorage.leasebox = JSON.stringify(action.payload);
      return {...state};
    },
    updateState(state, action) {
      const updateData = action.payload[0];
      const mapping = {
        ...updateData,
        orderNum: updateData.num,
        requiredDate: updateData.requiredTime
      };
      state.visible = false;
      state.config = {};
      state.submitData = mapping;
      state.saveData = {}; // 临时表单数据
      state.isSubmit = false;
      state.isUpdate = true;
      state.orderId = updateData.orderId;
      state.companyId = null;
      return { ...state };
    },
    resetState(state, action) {
      const userInfo = action.payload;
      state.visible = false;
      state.config = {};
      state.submitData = {
        contact: userInfo.nickName || '',
        phone: userInfo.mobile || null
      };
      state.saveData = {}; // 临时表单数据
      state.isSubmit = false;
      state.isUpdate = false;
      state.orderId = null;
      state.companyId = null;
      return {...state};
    }
  }
};
