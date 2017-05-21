import React from 'react';
import styles from './progressTaskStyle.less';
import ReactEcharts from 'echarts-for-react';
import { Spin, Row, Col,Table } from 'antd';

const progressTaskContent = ({
	taskLoading,
	countData,
	reportData,
}) => {

	const echartsTitle = countData&&countData.length>0?countData[0].task_name:'请选择已分配的任务';
	// console.log('countData------------->',countData);
	// console.log('reportData------------->',reportData);

	const countUser = countData&&countData.length>0?countData[0].count_user:0;
	const countSubmit = countData&&countData.length>0?countData[0].count_submit:0;
	const countRead = countData&&countData.length>0?countData[0].count_read:0;
	const subCountUser = parseInt(countUser-countSubmit);

	const option = {
	    title: {
	        text: echartsTitle,
	    },
	    color: ['#3398DB'],
	    tooltip : {
	        trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
	        }
	    },
	    grid: {
	        left: '3%',
	        right: '4%',
	        bottom: '3%',
	        containLabel: true
	    },
	    xAxis : [
	        {
	            type : 'category',
	            data : ['参与人数', '查看人数', '提交人数'],
	            axisTick: {
	                alignWithLabel: true
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value'
	        }
	    ],
	    series : [
	        {
	            name:'直接访问',
	            type:'bar',
	            barWidth: '30%',
	            data:[countUser,countRead, countSubmit]
	        }
	    ]
	};

	const pieOption = {
	    title : {
	        text: '任务完成情况占比',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
	    legend: {
	        orient: 'vertical',
	        left: 'left',
	        data: ['未完成','已完成']
	    },
	    series : [
	        {
	            name: '完成情况',
	            type: 'pie',
	            radius : '55%',
	            center: ['50%', '60%'],
	            data:[
	                {value:subCountUser, name:'未完成'},
	                {value:countSubmit, name:'已完成'}
	            ],
	            color: ['#ffbf00','#108ee9'],
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
	                }
	            }
	        }
	    ]
	};

	const columns = [{
		  title: '姓名',
		  dataIndex: 'nick_name',
		  key: 'nick_name',
		}, {
		  title: '任务',
		  dataIndex: 'task_name',
		  key: 'task_name',
		}, {
		  title: '是否阅读',
		  dataIndex: 'is_read',
		  key: 'is_read',
	      render: (text, record, index) => {
	        return (
	              <span>{text==1?'已读':'未读'}</span>
	        );
	      },
		}, {
		  title: '是否提交',
		  dataIndex: 'is_submit',
		  key: 'is_submit',
	      render: (text, record, index) => {
	        return (
	              <span>{text==1?'已提交':'未提交'}</span>
	        );
	      },
		}, {
		  title: '分数',
		  dataIndex: 'score',
		  key: 'score',
	      render: (text, record, index) => {
	        return (
	              <span>{text}分</span>
	        );
	      },
		}
	];


	return (
		<div>
			<div className={styles.titleWrapper}>
				<h2 className={styles.titleTopStyle}>图型化数据</h2>
			</div>
			<Spin spinning={taskLoading}>
				<Row>
					<Col span={16}>
						<ReactEcharts
							option={option} 
							style={{height: '350px', width: '100%'}} 
							className='react_for_echarts' /> 
					</Col>
					<Col span={8}>
						<ReactEcharts
							option={pieOption} 
							style={{height: '350px', width: '100%'}} 
							className='react_for_echarts' /> 
					</Col>
				</Row>
		    </Spin>
			<div className={styles.titleWrapper}>
				<h2 className={styles.titleTopStyle}>任务详情表</h2>
			</div>
			<div style={{marginTop:20}}>
				<Spin spinning={taskLoading}>
					<Row>
						<Col span={24}>
							<Table rowKey={record => record.id} dataSource={reportData} columns={columns} />
						</Col>
					</Row>
			    </Spin>
			</div>
		</div>
	)
}

export default progressTaskContent;