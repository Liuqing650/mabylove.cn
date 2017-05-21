import React,{ PropTypes } from 'react';
import {Form, Input, Button, Select,Popconfirm} from 'antd';
import styles from './groupManageSearch.less';

const Option = Select.Option;

const groupManageSearch = ({
	field,
	keyword,
	onSearch,
	onChange,
	tabPosition,
	handleChange,
	onAdd,
	onGroupUser,
	form: {
		getFieldDecorator,
		validateFields,
		getFieldsValue
	}
}) => {
	function handleSubmit(e) {
	    e.preventDefault()
	    validateFields((errors) => {
	      if (!!errors) {
	        return
	      }
	      onSearch(getFieldsValue())
	    })
	 }
	 function changeTabPosition(tabPosition) {
	 	tabPosition=tabPosition;
	 }


	return (
		<div className={styles.normal}>
			<div className={styles.search} onSubmit={handleSubmit}>
				<Form inline>
					<Form.Item>
			              <Select defaultValue="群组名">
			                <Option value="group_name">群组名</Option>	           
			              </Select>
		          	</Form.Item>
					<Form.Item hasFeedback>
						{getFieldDecorator('keyword')(
						<Input placeholder="请输入想要搜索的值" />)}
					</Form.Item>
			            <Button type="primary" size="large" icon="search" htmlType="submit" style={{
				            marginRight: 4
				        }}>搜索</Button>
				</Form>
			</div>
			<div className={styles.create}>
			    <Button type="ghost" size="large" onClick={onGroupUser}>邀请成员</Button>
		        <Button type="ghost" size="large" onClick={onAdd}>新增群组</Button>
		    </div>
		</div>
	);
}

groupManageSearch.propTypes = {
	form: PropTypes.object.isRequired,
	onSearch: PropTypes.func,
	onAdd: PropTypes.func,
	field: PropTypes.string,
	keyword: PropTypes.string,
	handleChange: PropTypes.func,
}

export default Form.create()(groupManageSearch)