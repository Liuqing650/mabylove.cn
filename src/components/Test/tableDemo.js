import React from 'react';
import { Table, Icon } from 'antd';

const tableDemo=({
	data,
	newData,
	remove,
	colValue,
	nowHtml={},
	newColumns,
	onChangeColumns,

	moreData,
	newMoreData,
	columnsText,
	move,
	cols,
	newMoreColumns,
	onMoreChangeColumns,
}) => {
	// console.log('move----->',move);
	// 思路：先思考点击单独的一列来移动
	// 假设每点击一次向左或则向右移动一次
	// 1.点击左边，告诉remove的state为true，以及left激活
	// 2.组件中left被激活，那么就开始获取到初始数据，并给这组数据中每一列插入一个col值，
	// 3.我们再根据col值排序（获取col值的准确性是最大的问题）
	// 4.将排序好的数据放到columns中
	// 用于解决数据不变导致的空值BUG
	data=remove.state?newData:data;
	moreData = move.state?newMoreData:moreData;
	const newTableData = newColumns;
	const newMoreCol = newMoreColumns;
	// console.log('newMoreCol--up--->',newMoreCol);

	const initHtml = {html:<span><a onClick={()=>{onLeft()}} ><Icon style={{fontSize:20}} type="arrow-left" /></a>性别<a onClick={()=>{onRight()}}><Icon style={{fontSize:20}} type="arrow-right" /></a></span>};

	/***************** 
	 *单行移动测试方法 
	 *****************/
	function onRight() {
		// 由于点击方法无法动态更新，所以只能在外部动态加入进去
		// 获取col值
		const tempKey = getFirstCol(data);
		remove.state=true;
		remove.right?remove.right=true:remove['right']=true;
		remove.left?remove.left=false:remove['left']=false;
		remove.colData?remove.data=tableData:remove['colData']=tableData;
		remove.col=tempKey;
		onChangeColumns(remove);
	}
	function onLeft() {
		// 由于点击方法无法动态更新，但其实我们只需要知道在那一列就行，
		// 之前我们在每一列数据中都存了一个虚拟值col，后期可以将这个值提取出来单独管理
		// 这个col值将和当前移动功能行严格对齐，否则会产生奇怪的BUG

		// 获取col值
		const tempKey = getFirstCol(data);
		remove.state=true;
		remove.left?remove.left=true:remove['left']=true;
		remove.right?remove.right=false:remove['right']=false;
		remove.colData?remove.data=tableData:remove['colData']=tableData;
		remove.col=tempKey;
		onChangeColumns(remove);
	}

	// 获取列表首列数据的col值
	function getFirstCol(data) {
		const key = data[0].col;
		return key;
	}

	const tableData = [{
		  title: '名字',
		  dataIndex: 'name',
		  key: 'name',
		  col:0,
		}, {
		  title: '年龄',
		  dataIndex: 'age',
		  key: 'age',
		  col:1,
		}, {
		  title: initHtml.html,
		  key: 'col',
		  dataIndex: 'col',
		  col:2,
		}, {
		  title: '地址',
		  dataIndex: 'address',
		  key: 'address',
		  col:3,
		}];
	/***************** 
	 *多列移动测试方法 
	 *****************/

	const title = columnsText;
	const moreHtml = setInitHtml(title);
	// console.log('columnsText---->',columnsText)
	function setInitHtml(title) {
		// console.log('title---->',title)
		var arr=[];
		var length = title.length;
		for(let i=0;i<length;i++) {
			const obj={};
			const key = 'html';
			const htmlObj = <span><a onClick={()=>{let index= {i}; index.toString(); onMoreLeft(index.i)}} ><Icon style={{fontSize:20}} type="arrow-left" /></a>{title[i]}<a onClick={()=>{let index= {i}; index.toString(); onMoreRight(index.i)}}><Icon style={{fontSize:20}} type="arrow-right" /></a></span>;
			obj[key] = htmlObj;
			arr.push(obj);
		}
		return arr;
	}
	function onMoreLeft(key) {
		const colKey = move.state?getColsKey(cols,key):key;
		// console.log('onMoreLeft--->',colKey)
		move['left']=true;
		move['right']=false;
		move['colData']=tableDataTwo;
		move['columnsText']=columnsText;
		move['cols'] = cols;
		move.col=colKey;
		move.state=true;
		// console.log('col---组件---onMoreLeft--->',colKey)
		onMoreChangeColumns(move);
	}
	function onMoreRight(key) {
		// 其实这里点击了，我们根据用户点击的key，去查找这个key当前所在的位置，
		/*
			1.我们的方法位置始终不改变，传进来的参数是一个固定的值，这个时候我们如何知道到底这一列跑哪里去了，
			解决：如果我们给这个值变成一个不变的key值，每一次点击都知道点击的是什么方法，以及移动的位置，
			每一次移动我们都以这个不变的key值作为一个存所有需要移动的列的固有id，每一个id下记录的都是现在的位置和上一步的位置
			那么再一次点击，我们可以通过点击传回来的id值去查找现在的位置，这个位置也就是我们想要的key值
		*/
		const colKey = move.state?getColsKey(cols,key):key;
		// console.log('onMoreRight--->',colKey)
		move['right']=true;
		move['left']=false;
		move['colData']=tableDataTwo;
		move['columnsText']=columnsText;
		move['cols'] = cols;
		move.col=colKey;
		move.state=true;
		// console.log('col---组件---onMoreRight--->',colKey)
		onMoreChangeColumns(move);
	}
	// 查找cols中变动的col值即 now的值
	function getColsKey(cols,key) {
		var col=0;
		for(let i=0;i<cols.length;i++) {
			if(cols[i].col==key) {
				col = cols[i].now;
			}
		}
		return col;
	}

	// 多列移动
	const tableDataTwo = move.state?null:[{
		  title: moreHtml[0].html,
		  dataIndex: 'name',
		  key: 'name',
		  col:0,
		}, {
		  title: moreHtml[1].html,
		  dataIndex: 'age',
		  key: 'age',
		  col:1,
		}, {
		  title: moreHtml[2].html,
		  key: 'col',
		  dataIndex: 'col',
		  col:2,
		}, {
		  title: moreHtml[3].html,
		  dataIndex: 'address',
		  key: 'address',
		  col:3,
		}];
		// console.log(move.state)
	const columns= remove.state?newTableData:tableData;
	const columnsTwo= move.state?newMoreCol:tableDataTwo;
	return (
		<div>
			<h2>测试可移动表格</h2>
			<Table columns={columns} dataSource={data} />
			<h2>测试可移动多列表格</h2>
			<Table columns={columnsTwo} dataSource={moreData} />
		</div>
	)
}

export default tableDemo;