export default {
  namespace: 'app',
  state: {
    selectedNav: 'home',
    navData: [
      {
        name: '首页',
        path: 'home'
      },
      {
        name: '更新日志',
        path: 'list'
      },
      {
        name: '登录',
        path: 'login'
      },
    ],
  },
  subscriptions: {
    setup({ dispatch, history }) {
      const allNavBarPath = ['/home', '/list', '/login'];
      history.listen(location => {
        if (location.pathname === '/') {
          dispatch({
            type: 'query',
            payload: location.pathname
          });
        } else if (allNavBarPath.includes(location.pathname)) {
          dispatch({
            type: 'changeNav',
            payload: location.pathname
          });
        }
      });
    }
  },
  effects: {
    *query({ payload }, { call, put }) {
      console.log('payload---->', payload);
    },
    *changeNav({ payload }, { put }) {
      yield put({
        type: 'change',
        payload: {
          selectedNav: payload.substring(1, payload.length)
        }
      });
    },
  },
  reducers: {
    change(state, action) {
      return { ...state, ...action.payload };
    }
  }
};
