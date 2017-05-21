import React from 'react';
import { parse } from 'qs';
import {message} from 'antd';

export default {
	namespace: 'showImage',

	state: {
		imgList: [],
		showImgItem:{},
		imageData:[],
		loading: false,
  		visible: false,
	  	commentData: [],
	  	picOpen:{},
	  	clearText: false,
	},

	subscriptions: {
		setup({dispatch, history}) {
			history.listen( location => {
				if(location.pathname === '/showImage') {
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
			yield put({type:'setImgList',})
			if(true) {
				yield put({
					type:'querySuccess',
				})
			}
		},
		*showDetail({ payload }, { call, put }) {
			yield put({type:'showModal'})
			const data = payload;
			// const data = yield call();
			if(true) {
				yield put({
					type: 'queryDetailSuccess',
					payload: data,
				})
			}
		},
		*newComment({ payload }, { call, put }) {
			const data = payload;
			yield put({type: 'clearCommend'})
			// const data = yield call();
			if(true) {
				yield put({
					type: 'queryCommentSuccess',
					payload: data,
				})
			}
		},
		*updateFile({payload},{call,put}) {
			const file = payload;
			console.log('file====================>>',file);
		}
	},

	reducers: {
		querySuccess(state,action) {
			const Capital = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
			const chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
			const textOne = '我觉得楼下说的很有道理，请继续说';
			const textTwo = '我猜楼下会说的更有道理，请继续说';
			// 测试假数据
			function loopCommentData(length,textOne,textTwo,Capital,chars) {
				var arr=[];
				for(let i=0;i<length;i++) {
					var obj={};
					const firstName=generateMixed(1,Capital);
					const otherChars=generateMixed(Math.ceil(Math.random()*6),chars);
					obj['name']=firstName+otherChars;
					obj['comment']=i>0?textTwo:textOne;
					arr.push(obj);
				}

				return arr;
			}

			// 产生随机字符
			function generateMixed(index,arr) {
			     var res = "";
			     if(index>1) {
			     	for(var i = 0; i<index; i ++) {
				         var id = Math.ceil(Math.random()*25);
				         res += arr[id];
				     }
			     } else {
			     	var id = Math.ceil(Math.random()*25);
			     	res=arr[id];
			     }
			     
			     return res;
			}
			const initData = loopCommentData(4,textOne,textTwo,Capital,chars);
			console.log('initData--->',initData)
			state.commentData = initData;
			return { ...state };
		},
		queryDetailSuccess(state,action) {
			// console.log('action.payload===',action.payload)
			state.showImgItem = action.payload;
			return { ...state };
		},
		queryCommentSuccess(state,action) {
			// console.log('action.payload===',action.payload)
			const Capital = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
			const chars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

			for(let i=0;i<2;i++) {
				var obj={}
				if(i<1) {
					obj['name']='我';
					obj['comment']=action.payload.comment;
					state.commentData.push(obj);
				} else {
					const firstName=generateMixed(1,Capital);
					const otherChars=generateMixed(Math.ceil(Math.random()*6),chars);
					obj['name']=firstName+otherChars;
					obj['comment']='楼上说的太好了，请继续，我们听着';
					state.commentData.push(obj);
				}
			}
			state.clearText = false;
			// 产生随机字符
			function generateMixed(index,arr) {
			     var res = "";
			     if(index>1) {
			     	for(var i = 0; i<index; i ++) {
				         var id = Math.ceil(Math.random()*25);
				         res += arr[id];
				     }
			     } else {
			     	var id = Math.ceil(Math.random()*25);
			     	res=arr[id];
			     }
			     
			     return res;
			}
			return { ...state };
		},
		setImgList(state,action) {
			const textData = {
			  content: '春天的紫云岩充满生机勃勃。那里的树木抽出新的枝条，' +
			  ' 突出嫩绿的新芽，放眼一望，就像绿色的海洋。' +
			  ' 山路两旁盛开着姹紫嫣红的野花，红的似火，粉的似霞。',
			  title: '网络图片欣赏',
			};

			const dataArray = [
			  { image: 'https://zos.alipayobjects.com/rmsportal/DGOtoWASeguMJgV.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/BXJNKCeUSkhQoSS.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/TDIbcrKdLWVeWJM.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/SDLiKqyfBvnKMrA.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/UcVbOrSDHCLPqLG.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/QJmGZYJBRLkxFSy.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/PDiTkHViQNVHddN.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/beHtidyjUMOXbkI.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/vJcpMCTaSKSVWyH.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/dvQuFtUoRmvWLsZ.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/QqWQKvgLSJaYbpr.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/pTfNdthdsUpLPLJ.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/PDiTkHViQNVHddN.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/beHtidyjUMOXbkI.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/vJcpMCTaSKSVWyH.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/dvQuFtUoRmvWLsZ.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/QqWQKvgLSJaYbpr.png' },
			  { image: 'https://zos.alipayobjects.com/rmsportal/pTfNdthdsUpLPLJ.png' },
			];

			state.imgList = dataArray.map(item => ({ ...item, ...textData }));
			state.imageData = dataArray.map(item => ({ ...item, ...textData }));
			return { ...state };
		},
		showModal(state,action) {
			state.visible = true;
			return { ...state };
		},
		hideModal(state,action) {
			state.visible = false;
			return { ...state };
		},
		storePicOpen(state,action) {
			return { ...state,...action.payload};
		},
		showLoading(state,action) {
			state.loading = true;
			return { ...state };
		},
		clearCommend(state,action) {
			state.clearText=true;
			return { ...state };
		}
	},
}
