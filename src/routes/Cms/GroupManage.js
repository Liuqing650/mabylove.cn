import React, { Component,PropTypes } from 'react';
import { connect } from 'dva';
import {message,Row, Col} from 'antd';
import GroupManageSearch from '../../components/Cms/GroupManage/groupManageSearch';
import GroupManageTable from '../../components/Cms/GroupManage/groupManageTable';
import GroupManageUpdateModal from '../../components/Cms/GroupManage/groupManageUpdateModal';

import GroupUserModal from '../../components/Cms/GroupManage/groupUserModal';


function GroupManage({loaction, dispatch, groupManage}) {
	
	const {
		loading,userList,groupList,checkedList,selectRowKeys,currentItem, modalVisible, selectedRowKeys,modalType,
		groupUserModalVisible,listModalVisible,listData
	} = groupManage;

	const groupManageUpdateModalProps = {
		item: modalType === 'add' ? {} : currentItem,
		title: modalType === 'add' ? '新增群组' : '修改群组',
		visible: modalVisible,
		onOk(data) {
			if(modalType=='add'){
			dispatch ({
				type: `groupManage/add`,
				payload: data,
			})	
		}else{
            dispatch ({
				type: `groupManage/update`,
				payload: data,
			})	
		}			
		},
		onCancel() {
			dispatch ({
				type: 'groupManage/hideModal',
			})
		}
	}

	// 角色列表数据
	const groupManageTableProps = {
		loading,
		dataSource:groupList,
		selectedRowKeys:selectedRowKeys,
		listModalVisible:listModalVisible,
		listData:listData,
		onSelectChange(key){
	      dispatch({
		        type: 'groupManage/onSelectChange',
		        payload:key,
	      })
	    },
	    onEditItem(item) {
	    	dispatch({
	    		type: 'groupManage/showModal',
	    		payload: {
	    			modalType: 'update',
	    			currentItem: item,
	    		},
	    	})
	    },
	    onHideItem(key) {
	        dispatch({
			    type: 'groupManage/deleteGroup',
	    		payload: {
			    	group_id: key,
			       }
		    	})	
	    },
	    showList(value){
	    	dispatch({
			    type: 'groupManage/showList',
	    		payload: {
			    	group_id:value,
			       }
		    	})	
	    },
	    handleCancel(){
	    	dispatch({
			    type: 'groupManage/querySuccess',
	    		payload: {
			    	listModalVisible:false,
			       }
		    	})
	    }

	}

	// 角色搜索功能
	const groupManageSearchProps = {
		onSearch(value) {
			dispatch({
				type: 'groupManage/search',
				payload: value,
			})
		},
		onAdd(item) {
			dispatch({
				type: 'groupManage/showModal',
				payload: {
					modalType: 'add',
				}
			})
		},
		onGroupUser(item) {
	        if(!selectedRowKeys || selectedRowKeys.length!=1) {
	          message.error(`请选择一个群组进行邀请`)
	          dispatch({
					type: 'groupManage/clearSelectedRowKeys',
				})
	        } else {
				dispatch({
					type: 'groupManage/queryUser',
					payload: {
		    			group_id:selectedRowKeys[0],
					}
				})
			}
		}
	};

	// 群组用户管理数据
	const groupUserModalProp = {
		title: '邀请成员',
		visible: groupUserModalVisible,
		userList:userList,
		checkedList:checkedList,
		onOk() {
			dispatch ({
				type: `groupManage/addGroupUser`,
				payload: {userIdStr:checkedList.toString(),group_id:selectedRowKeys[0]},
			})
		},
		onCancel() {
			dispatch ({
				type: `groupManage/hideModal`,
			})
		},
		handleChange(value){
			dispatch ({
				type:'groupManage/querySuccess',payload:{checkedList:value}
			})
		}
	}

	const GroupManageUpdateModelGen = () =>
		<GroupManageUpdateModal { ...groupManageUpdateModalProps } />
	return (
		<div>
			<Row>
				<GroupManageSearch {...groupManageSearchProps} />
			</Row>
			<Row>
		      <Col span={24}>
				<GroupManageTable {...groupManageTableProps} />
		      </Col>
		    </Row>
			<GroupManageUpdateModelGen />
			<GroupUserModal { ...groupUserModalProp } />
		</div>
	);
}

GroupManage.propTypes = {
 	groupManage: PropTypes.object,
 	location: PropTypes.object,
  	dispatch: PropTypes.func,
};

function mapStateToProps({ groupManage }) {
  return { groupManage };
}

export default connect(mapStateToProps)(GroupManage);