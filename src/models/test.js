import React from 'react';
import { Icon,message } from 'antd';
import { Editor, createEditorState, } from 'medium-draft';

export default {
	namespace: 'test',

	state: {
		htmlText:'',
		editorState: createEditorState(),	

		editorContent: null,
		
		data:[],
		newData:[],
		oldCol:null,
		colValue:1,
		remove:{state:false},
		oldColumns:[],		
		newColumns:[],			

		ecmsData:{api:'',text:''},

		moreData:[],
		newMoreData:[],
		oldMoreColumns:[],
		newMoreColumns:[],
		columnsTitle: {},
		columnsText:['名字','年龄','性别','地址'],
		move:{state:false},

		cols:[
			{col:'0',state:false,now:0,old:null,index:0},
			{col:'1',state:false,now:1,old:null,index:0},
			{col:'2',state:false,now:2,old:null,index:0},
			{col:'3',state:false,now:3,old:null,index:0}
		],
	},

	subscriptions: {
		setup({dispatch,history}) {
			history.listen( location => {
				if(location.pathname === '/test') {
					dispatch({
						type: 'query',
						payload: location.query,
					})
				}
			});
		}
	},

	effects: {
		*query({payload},{call,put}) {
			yield put({type: 'querySuccess'})
			// const data = yield call(query,payload)
			// if(!data) {
			// 	yield put({
			// 		type: 'querySuccess',
			// 		payload: data,
			// 	})
			// }
		},
	},

	reducers: {
		querySuccess(state,action) {
			const tempData = [{
			  key: '1',
			  name: 'John Brown',
			  age: 32,
			  address: 'New York No. 1 Lake Park',
			}, {
			  key: '2',
			  name: 'Jim Green',
			  age: 42,
			  address: 'London No. 1 Lake Park',
			}, {
			  key: '3',
			  name: 'Joe Black',
			  age: 32,
			  address: 'Sidney No. 1 Lake Park',
			}]
			const tempDataNew = [{
			  key: '1',
			  name: 'John Brown',
			  age: 32,
			  address: 'New York No. 1 Lake Park',
			}, {
			  key: '2',
			  name: 'Jim Green',
			  age: 42,
			  address: 'London No. 1 Lake Park',
			}, {
			  key: '3',
			  name: 'Joe Black',
			  age: 32,
			  address: 'Sidney No. 1 Lake Park',
			}]
			/* 处理一列移动的数据 */
			// 第一步：1.我们获取到数据就需要给数据一个顺序值，假设我们初始给在第三位
			function detailData(arr,index) {
				for(let i=0;i<arr.length;i++){
					arr[i]['col']=index;
				}
				return arr;
			}
			// 第二步：2.定好初始的移动值
			const col = 2;
			state.data= detailData(tempData,col);
			state.colValue = col;

			/* 处理多列移动的数据 */
			function detailMoreData(arr) {
				for(let i=0;i<arr.length;i++){
					arr[i]['col']=i;
				}
				return arr;
			}
			state.moreData = detailMoreData(tempDataNew)
			return { ...state }
		},
		htmlChange(state,action) {
			state.htmlText = action.payload;
			return { ...state }
		},
		onEditorState(state,action) {
			const obj = action.payload;
			state.editorState = obj;
			return { ...state };
		},
		onChangeECMS(state,action){
			const obj = action.payload;
			state.ecmsData.api = obj;
			return { ...state };
		},
		onDraftEditorChange(state,action) {
			state.editorContent = action.payload;
			console.log('onDraftEditorChange--->',state.editorContent)
			return { ...state };
		},
		onChangeColumns(state,action) {
			const data = action.payload;
			state.oldColumns = data.colData;
			// 开始调用方法
			setUp(data);

			// 方法执行
			function setUp(data) {
				// 1.获取真实col值
				var col = judgeCol(data,data.col);
				// 2.判断端部异常
				const result = judgeIsSide(col,data.left,data.right,data.colData.length);
				// 3.判断是否执行移动函数
				const exc = judgeSetUpMove(result);
				// 4.异常操作排除,如果没有问题执行移动函数
				var obj={};
				exc?null:obj=judgeMove(data,col);
				cleanUpData(exc,data,obj);
			}
			// 1.col非常重要，需要进行校验(我们根据类型判断)
			function judgeCol(data,col) {
				var key=0;
				var result = false;
				for(let i=0;i<data.length;i++) {
					if(typeof(data[i].title)==="object") {
						key = i;
						result = true;
						break;
					}
				}
				return result?key:col;
			}

			// 2.判断是否符合移动的条件：到两端的时候，不可继续向前移动,根据col来判断
			function judgeIsSide(col,left,right,length) {
				var result =false;
				if(left) {
					result = col>0?true:false;
				}
				if(right) {
					result = col<length-1?true:false;
				}
				return result;
			}
			// 3.判断是否执行移动函数
			function judgeSetUpMove(result) {
				var exc=false;
				if(result) {
				} else {
					exc = exceptionOperate();
				}
				return exc;
			}
			// 4.异常操作执行方法
			function exceptionOperate() {
				const exc = true;
				return exc;
			}
			// console.log(judgeCol(oldColData,col))
			// 5.判断调用移动列表函数(返回移动后的数组)
			function judgeMove(data,col) {
				var obj={};
				var oldColData = data.colData;
				const left = data.left;
				const right = data.right; 
				if(left&&!right) {
					obj=leftMove(oldColData,col)
				}
				if(right&&!left){
					obj=rightMove(oldColData,col)
				}
				return obj;
			}
			// 6-1.左移
			function leftMove(oldColData,col) {
				var obj={};
				obj = change(oldColData,col,'left');
				return obj;
			}
			
			
			// 6-2.右移
			function rightMove(oldColData,col) {
				var obj={};
				obj = change(oldColData,col,'right');
				return obj;
			}
			

			// 7.数组交换位置
			function change(arr,index,commond){
			    var temp={};
			    var tempCol=0;
			    var obj={arr:[],newCol:0};
			    if(commond=='left') {
				    if(index===0||index>arr.length-1){
				        return arr;
				    }
				    temp = arr[index];
			    	arr[index] = arr[index-1];
	    			arr[index-1] = temp;
	    			tempCol = index-1;
			    }
			   	if(commond=='right') {
				    if(index<0||index>arr.length-1){
				        return arr;
				    }
				    temp = arr[index];
		   			arr[index] = arr[index+1];
		    		arr[index+1] = temp;
		    		tempCol = index+1;
			   	}
			   	obj.arr = sortCol(arr);
			   	obj.newCol = tempCol;
			    return obj; 
			}
			// 8.对列中的col值排序
			function sortCol(arr) {
			   	for(let i=0;i<arr.length;i++) {
			   		arr[i].col=i;
			   	}
				return arr;
			}
			// 9.重新修改数据的col值以及存储下新的col值
			function setDataNewCol(arr,index) {
				for(let i=0;i<arr.length;i++){
					arr[i]['col']=index;
				}
				return arr;
			}

			// 10.整理数据
			function cleanUpData(exc,data,obj) {
				const oldData = getOldData();
				if(exc) {
					// 执行数据不修改处理
					message.error('已经到边了，不能继续移动');
					// return false;
					setChangeData(oldData,data.colData,data.col)
				} else {
					// 执行数据修改处理
					const newData=setDataNewCol(oldData,obj.newCol);
					setChangeData(newData,obj.arr,obj.newCol)
				}
			} 

			// 11.获取旧数据
			function getOldData() {
				var tempOldData=[];
				if(state.newData&&state.newData.length=='0') {
					tempOldData = state.data;
				} else {
					tempOldData = state.newData;
				}
				return tempOldData;
			}

			// 12.数据处理完成，填充新数据
			function setChangeData(setData,setArr,setCol){
				state.newData=setData;
				state.newColumns = setArr;
				state.colValue = setCol;
				state.oldCol = setCol;
			}
			// 13.半重置数据
			state.remove=[];
			state.remove.state=data.state;
			state.remove.left=data.left;
			state.remove.right=data.right;
			return { ...state};
		},

		onMoreChangeColumns(state,action) {
			const data = action.payload;

			// 开始调用方法
			setUp(data);
			// 方法执行
			function setUp(data) {
				// 1.获取col值和列表长度
				const col = data.col;
				const length = data.colData.length;
				// 2.判断端部异常
				const result = judgeIsSide(col,data.left,data.right,length);
				// 3.判断是否执行移动函数
				const exc = judgeSetUpMove(result);
				// 4.异常操作排除,如果没有问题执行移动函数
				var obj={};
				exc?null:obj=judgeMove(data,col);
				// 5.整理数据
				arrangeData(exc,data,obj);
				// end
			}

			/*************
			 * 一、判断方法区 
			 *************/
			// 1.判断是否符合移动的条件：到两端的时候，不可继续向前移动,根据col来判断
			function judgeIsSide(col,left,right,length) {
				var result =false;
				if(left) {
					result = col>0?true:false;
				}
				if(right) {
					result = col<length-1?true:false;
				}
				return result;
			}
			// 2.判断是否执行移动函数
			function judgeSetUpMove(result) {
				var exc=false;
				if(result) {
				} else {
					exc = exceptionOperate();
				}
				return exc;
			}

			/*************
			 * 二、移动方法区 
			 *************/
			 // 1.判断向什么方向移动
			 function judgeMove(data,col) {
			 	var obj={};
				var oldColData = data.colData;
				var title = data.columnsText;
				var cols = data.cols;
				const left = data.left;
				const right = data.right; 
				if(left&&!right) {
					obj=leftMove(oldColData,cols,title,col)
				}
				if(right&&!left){
					obj=rightMove(oldColData,cols,title,col)
				}
				return obj;
			 }
			 // 2-1.左移动
			function leftMove(oldColData,cols,title,col) {
				var obj={};
				var COMMOND = 'left';
				obj = change(oldColData,title,col,COMMOND);
				cols = updateCols(cols,col,COMMOND);
				obj['cols'] = cols;
				// console.log('obj----leftMove--->',obj)
				return obj;
			}
			 // 2-2.右移动
			function rightMove(oldColData,cols,title,col) {
				var obj={};
				var COMMOND = 'right';
				obj = change(oldColData,title,col,COMMOND);
				cols = updateCols(cols,col,COMMOND);
				obj['cols'] = cols;
				// console.log('cols----rightMove--->',obj)
				return obj;
			}

			// 3.处理cols中的值
			// col=2 cols:{col:2,state:true,now:2,old:null}
			// 参数：cols值,点击的col值,移动命令commond
			function updateCols(cols,col,commond) {
				for(let i=0;i<cols.length;i++) {
					// 1.先判断之前是否有移动
					if(cols[i].state) {
						cols[i].old = cols[i].now;
						cols[i].state=false;
					}
					// 2.将移动的参数放到对应的数据中
					if(cols[i].now==col) {
						cols[i].state=true;
					}
				}
				// 下面计算cols的排序值 暂定为1
				cols = sortCols(cols,commond,1);
				return cols;
			}
			// 4.cols值排序,移动大小index
			// 2左移1，2的时候sate=true,cols[2].now=1;cols[1].now=[2]
			// 这里的逻辑是 
			// 不变的点 1. 从a->b,b处时new:b,old:a,b处点击后其他位置假设不变，now:b,old:b，改变的再进行计算
			// 改变的点 2. 从a->b,b处时new:b,old:a,b处点击后这一点左移，now:b-1,old:b,它前面的数字：(now-1):b+1,old:b
			function sortCols(cols,commond,index) {
				if(commond=='left') {
					for(let i=0;i<cols.length;i++) {
						var newCol =parseInt((cols[i].now>=0&&cols[i].now<=4)?cols[i].now:cols[i].col);
						cols[i].now=newCol;
						cols[i].old=newCol;
						cols[i].index=index;
						if(cols[i].state) {
							cols[i].now=cols[i].now-index;
							cols[i-index].now=cols[i-index].now+index;
						}
					}

			    }
			   	if(commond=='right') {
			   		for(let i=cols.length-1;i>=0;i--) {
						var newCol =parseInt((cols[i].now>=0&&cols[i].now<=4)?cols[i].now:cols[i].col);
						cols[i].now=newCol;
						cols[i].old=newCol;
						cols[i].index=index;
						if(cols[i].state) {
							cols[i].now=cols[i].now+index;
							cols[i+index].now=cols[i+index].now-index;
						}
					}
			   	}
			   	// 调试程序
			   	// var tempTitle =[{id:0,name:'名字'},{id:1,name:'年龄'},{id:2,name:'性别'},{id:3,name:'地址'}];
			   	// for(let i =0;i<cols.length;i++) {
			   	// 	for(let j in tempTitle) {
				   // 		if(cols[i].col==tempTitle[j].id) {
				   // 			console.log(tempTitle[j].name+'--->','now='+cols[i].now,'old='+cols[i].old)	
				   // 		}
			   	// 	}
			   	// }
			   	// 对 cols 需要进行排序，我们根据最新的位置排序,用以解决上面考虑不全面的BUG
			   	const COMPARE = 'now';
			   	cols = sortColsArr(cols,COMPARE);
			   	// console.log('cols-----排序',cols)
			   	return cols;
			}

			 // 5.移动方法
			 function change(arr,title,index,commond){
			    var temp={}; 
			    var obj={arr:[],title:[]}; //数据缓存区
			    if(commond=='left') {
				    if(index===0||index>arr.length-1){
				    	obj.arr=arr;
				    	obj.newCol=index;
				        return obj;
				    }
				    temp = arr[index];
			    	arr[index] = arr[index-1];
	    			arr[index-1] = temp;
			    }
			   	if(commond=='right') {
				    if(index<0||index>arr.length-1){
				        obj.arr=arr;
				    	obj.newCol=index;
				        return obj;
				    }
				    temp = arr[index];
		   			arr[index] = arr[index+1];
		    		arr[index+1] = temp;
			   	}
			   	// obj.arr = restoreCol(arr); // 先不排col值，不便于测试
			   	obj.arr = arr;
			   	obj.title = sortTitle(title,index,commond)
			    return obj; 
			}
			// 4.重新根据移动方向排序 title 位置
			function sortTitle(title,index,commond) {
			    var temp={}; 
				if(commond=='left') {
				    if(index===0||index>title.length-1){
				        return title;
				    }
				    temp = title[index];
			    	title[index] = title[index-1];
	    			title[index-1] = temp;
			    }
			   	if(commond=='right') {
				    if(index<0||index>title.length-1){
				        return title;
				    }
				    temp = title[index];
		   			title[index] = title[index+1];
		    		title[index+1] = temp;
			   	}
			   	return title;
			}
			// 5.恢复col值
			function restoreCol(arr) {
				for (var i=0; i<arr.length; i++) {
					arr[i].col=i
				}
				return arr;
			}

			// 6.sortColsArr
			function sortColsArr(cols,val) {
				// val表示需要根据哪一个对象排序
				var arr = [];
				arr = cols.sort(compare(val))
				return arr;
			}
			function compare(property){
			    return function(a,b){
			        var value1 = a[property];
			        var value2 = b[property];
			        return value1 - value2;
			    }
			}
			/*************
			 * 三、异常处理区 
			 *************/
			function exceptionOperate() {
				const exc = true;
				return exc;
			}

			/*************
			 * 四、结果整理区 
			 *************/
			// 1.整理列表数据
			function arrangeData(exc,data,obj) {
				const oldData = getOldData();
				if(exc) {
					// 执行数据不修改处理
					message.error('已经到边了，不能继续移动');
					var colsExc = data.cols;
					for(let i=0;i<colsExc.length;i++) {
						colsExc[i].state=false;
					}
					setChangeData(oldData,data.colData,data.columnsText,colsExc)
				} else {
					// 执行数据修改处理
					setChangeData(oldData,obj.arr,obj.title,obj.cols)
				}
			}

			// 2.数据处理完成，填充新数据
			function setChangeData(setData,setArr,title,cols){
				state.newMoreData=setData;
				state.newMoreColumns = setArr;
				state.columnsText=title;
				state.cols = cols;
			}

			// 3.获取旧数据
			function getOldData() {
				var tempOldData=[];
				if(state.newMoreData&&state.newMoreData.length=='0') {
					tempOldData = state.moreData;
				} else {
					tempOldData = state.newMoreData;
				}
				return tempOldData;
			}
			
			// 13.半重置数据
			state.move=[];
			state.move.state=data.state;
			state.move.left=data.left;
			state.move.right=data.right;
			state.oldMoreColumns = data.colData;
			// console.log('model数据处理完毕-->',state.newMoreColumns)
			 // 测试方法
			 const debug= false;
			 if(debug) {
			 	state.move.state=false;
			 }
			return { ...state };
		}

	}
}
/* 
	多列移动需要一个状态来控制，还是表头无法改变，我们只能通过函数来变更
	
测试：	
	1.首先我们需要产生一组确定的columns表头，这个应该可以遍历实现
	具体实现方法：
		a.先定义一个存放移动表头的名称字符数据，
		const char = ['a','b','c','d']
		b.用一个方法实现对象的遍历
	2.我们发现遍历函数是可行的，那么可以考虑，每一次点击，都将执行一次遍历
	目前有两种方式：
		第一种方式是：按照以前的点击在model里面进行移动方法块，其实我们知道
			无论如何移动，我们都没有办法改变方法的参数，因为方法是死的，所以
			只能自己在后台进行判断。如果我们依然按照这样的形式进行移动，那么就需要
			在后台单独存下移动位置的数据，并需要提前赋一个初始值，便于知道具体的位置
			【more】处理多列的时候，就需要多列判断，特别复杂，先想想其他的办法
		第二种方法是：我们所有的方法在每一列固定，改变其他的参数，包括标题，
			通俗点就是除了每一列的移动方法原封不变，列表的标题、key、dataIndex都改变，
			所以需要进行两次遍历，第一次遍历就是全部改变，第二次进行方法的还原。
			这样的好处是我们不再改变col值，因为我们的方法不会改变
实现：【第二种】
	1.获取title 获取到列名的title，存放到单独的对象，由state接管。
	2.赋予状态值 赋予一个 moveState ，状态，判断是否选用初始表列。
	3.遍历标题方法 组件中的 setInitHtml方法 遍历列表移动方法=>title.
	4.方法传递 将遍历好的移动方法赋值给 tableDataTwo 中，
	5.点击移动事件触发执行参数变更及model获取，
		左移left:true,右移：right:true, moreMoveState=true,col=key,tableDataTwo
	6.具备以上参数以后，进入model进行数据修改，假设所有的过程在 onMoreChangeColumns 中进行。

	7.方法执行 setUp(); 我们得考虑获取到这么多数据以后第一步需要做什么。

	8. 参数判断 (这个是第七步执行后需要做的事情)
		8-1: 判断是否到端 这里没有像上面进行col值判断，因为col本身就是固定的，所以我们不需要检测，
		8-2: 判断是否移动 根据获取到是否到端的结果判断是否执行异常操作处理，没有异常就开始执行移动 
	9. 移动方法执行 
		9-1: 无异常处理 执行 移动方法块 根据方向：left,right去判断到底需要执行左移动还是右移动
		9-2: 左移动函数 函数左边移动的时候,执行change方法，传入: oldColData , index,commond 
			 index表示移动的位置 对应col值,commond对应数据移动的命令
		9-3: 新的数据存入到state.newColumns中
		9-4: 对新数据进行列值和col值的替换。 [数据处理完成]
	10. 异常操作处理
		异常方法处理 return false;这个本身没有任何处理过程，也可以将返回的数据原封不动的返回回去
	11. 整理数据到state中
		10-1: 存入旧的列数据
		10-2: 存入新的列数据
		 	异常操作	旧数据存入
		 	非异常操作 	新数据存入
		10-3: 存入moreMove对象
	12. model数据处理完毕,组件更新移动结果
[数据无法动态更新，无法实现]

再实现第一种
上面是由于col值无法获取到，仍然只能用另外的机制存col值，并且需要动态更新col的位置

基本处理流程一致：
cols包含三个属性==> col值,state状态,now,old,index
	col值依然保持固定位置
	state生命周期为点击开始到下次点击事件促发中，随计算完成消失
	now 表示移动到新的位置
	old 表示上一步的位置
	index 一次移动了几格，默认1格

变更：
所有的顺序将重新排序
排序算法：
...

 */


 /*
1.我们需要给新的数据指定一个默认移动行的顺序，使用一个函数完成，顺序存在col中,并把这个确定的值传递到组件中，
下次点击移动事件的时候将会返回传递位置的参数
2.我们获取到用户点击的数据，传递到model中来进行处理，并把新的newColumns返回回去。


model中数据处理流程
1.需要获取的数据
col,oldColData,oldData,remove.state,right,left
2.col决定了移动的关键，所以所有方法执行之前必须对col进行校验，通过title的类型进行校验
judgeCol()方法 return col值;
3.有了col值开始判断col值是否已经移动到两端，
judgeIsSide()方法 return result值
4.根据result值判断是否执行移动方向判断函数
5.如果已经移动到两端，且点击函数为继续向到端方向，则执行异常操作函数
exceptionOperate()方法 void 这个函数一旦执行，数据将保持不动，不执行任何函数，结束程序

6.如果没有到两端，执行移动方向判断函数
judgeMove()方法 return arr
7.根据left、right判断执行哪一个方法,都将去调用change函数改变列的位置
leftMove() change(oldColData,col,'left')
rightMove() change(oldColData,col,'right')
8.修改列的位置,change函数需要得到需要修改单列名数据，以及要改变的列号，和移动的方向,这里产生新的col值
change() return obj{newColData,newCol}
9.当移动玩所有的列以后，将重新给列中的col值进行排序，执行col排序函数
sortCol() return arr
10.排序完成，接下来我们需要把新的col值存起来，测试时把col值给存到移动函数中的，
setDataNewCol() return data 或则 state.newCol = newCol;
11.数据的排序等都已经完成，最后进行数据的写入
setChangeData()
需要写入的函数有：newColData,oldCol,newData,move.state,

*/