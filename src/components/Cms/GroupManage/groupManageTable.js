import React, { PropTypes } from 'react';
import {Checkbox,Table,Tabs,Select,Icon,Popconfirm,Modal} from 'antd';
const CheckboxGroup = Checkbox.Group;
const TabPane = Tabs.TabPane;
const roleManageTable= ({
	loading,
	dataSource,
	listData,
	selectedRowKeys,
	onEditItem,
	onHideItem,
	onSelectChange,
	showList,
	listModalVisible,
	handleCancel,
}) => {
    const pagination={
	  pageSize:10,
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      total:null,
    };
	const rowSelection = {
		selectedRowKeys,
	  	onChange:onSelectChange,
	};
    const list=[{
      title: '成员名',
	  width: '33%',
	  dataIndex: 'user_name',
    },{
      title: '成员邮箱',
	  width: '33%',
	  dataIndex: 'email',
    },{
      title: '在线状态',
	  width: '33%',
	  dataIndex: 'login_status',
    }]
	const columns = [{
	  title: '群组名称',
	  width: '16%',
	  dataIndex: 'group_name',
	  render: (text, record) => (<a onClick={()=> onEditItem(record)}>{text}</a>),
	}, {
	  title: '群组描述',
	  width: '40%',
	  dataIndex: 'remark',
	}, {
	  title: '创建人',
	  width: '12%',
	  dataIndex: 'creator',
	}, {
	  title: '创建时间',
	  width: '16%',
	  dataIndex: 'create_time',
	}, {
	  title: '操作',
	  width: '16%',
	  render: (text, record) => (
	  			<div>
			      <span>
			        <a onClick={()=> onEditItem(record)}>编辑</a>
			        <span className="ant-divider" />
			        <a onClick={()=>showList(record.group_id)}>成员</a>
					<span className="ant-divider" />
			        <Popconfirm title="确定要删除该群组吗？" onConfirm={()=>onHideItem(record.group_id)}>
						<a>删除群组</a>
					</Popconfirm>
			      </span>
		      	</div>
		    ),
	}];

	return (
		<div>
			<Table bordered
				loading = {loading} 
				rowSelection={rowSelection}
				columns={columns} 
				dataSource={dataSource} 
				pagination={pagination} 
				rowKey={record => record.group_id}
			/>
	    <Modal title="成员列表" visible={listModalVisible} footer={null} onCancel={handleCancel}
        >
         <Table bordered
				columns={list} 
				dataSource={listData} 
				pagination={pagination} 
				rowKey={record => record.id}
			/>
        </Modal>
		</div>
	);
};

	

roleManageTable.propTypes = {
	onSelectChange: PropTypes.func,
	tabList: PropTypes.array,
	onPageChange: PropTypes.func,
	dataSource: PropTypes.array,
	loading: PropTypes.any,
	onEditItem: PropTypes.func,
	pagination: PropTypes.any
};

export default roleManageTable;