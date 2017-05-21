import React from 'react';
import {Input,Table} from 'antd'
const Search = Input.Search;
const columns = [{
      title: '日期',
      dataIndex: 'date',
      width: '16.6%',
    }, {
      title: '白天',
      width: '16.6%',
      dataIndex: 'dayPictureUrl',
      render:(text)=>(
      	<img src={text}/>
      )
    }, {
      title: '夜晚',
      width: '16.6%',
      dataIndex: 'nightPictureUrl',
      render:(text)=>(
      	<img src={text}/>
      )
    }, {
      title: '温度',
      width: '16.6%',
      dataIndex: 'temperature',
    }, {
      title: '天气',
      width: '16.6%',
      dataIndex: 'weather',
    }, {
      title: '风速',
      width: '16.6%',
      dataIndex: 'wind',
}]
const pagination={
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      total:null,
};
function weather({
searchWeather,
weatherData
}){
return (<div>
			<Search
			    placeholder="请输入城市名"
			    style={{ width: 200 }}
			    onSearch={searchWeather}
			  />
			  <Table bordered
              columns={columns}
              pagination={pagination}
              dataSource={weatherData}
              style={{marginTop:10}}
              rowKey={record => record.date}
			  />
		</div>)
}
export default weather