import React from 'react';
import { Layout,Breadcrumb,Card,Icon,Carousel,Menu,Input,Row, Col,Button,Modal } from 'antd';
import styles from './showImgStyle.less';
import {hashHistory} from 'react-router';


const imageContent = ({
	imgList,
	showDetail,
}) => {
	const { Header, Footer, Sider, Content } = Layout;
	const Search = Input.Search;

	const Cards =  imgList.map((item,index) => {
		return (
			<Card
				title={item.title}
				key={index}
				className={styles.cardStyle}>
				<p>{item.content}</p>
			    <a onClick={()=>{showDetail(item)}}><img alt="example" width="100%" src={item.image} /></a>
			</Card>
		);
	});

	function goBack() {
		hashHistory.push('/showProject');
	}
	function onUploadImg() {
		hashHistory.push('/uploadFile');
	}

	return (
		<div>
			<Layout>
				<Header className="transparentBackgrond">
				 <div
			        style={{ lineHeight: '64px',width:'100%',background:'#fff' }}
			      >
			      	<Row gutter={16}>
				      <Col span={2} offset={1}>
				         <Button type="primary" onClick={goBack}>
					        <Icon type="left" />Go back
					      </Button>
				      </Col>
				      <Col span={6}>
					    <Search
						    placeholder="搜索您想要的图片"
						    style={{ width: 200 }}
						    onSearch={value => console.log(value)}
						  />
				      </Col>
				      <Col span={6}>
				        <span className={styles.imageNumStyle}>100000000</span>份
				      </Col>
				      <Col span={6} offset={3}>
				        <Button type="primary" size="large" shape="circle" onClick={onUploadImg}>
					        <Icon type="cloud-upload" style={{fontSize:'28px'}} /><span style={{color:'#108ee9'}}>我们需要您的提供</span>
					      </Button>
				      </Col>
				    </Row>
			      </div>
		    	</Header>
				<Content style={{ padding: '0 50px' }}>
				  <Breadcrumb style={{ margin: '12px 0' }}>
				    <Breadcrumb.Item>Image</Breadcrumb.Item>
				  </Breadcrumb>
				  <div className={styles.contentStyle}>
				  		<div className={styles.clearfix}>{Cards}</div>
				  </div>
				</Content>
			    <Footer style={{ textAlign: 'center' }}>
			      帷中暮色 &copy; 2016-12 <a href="#">Maby love</a> 人生纵此一别,天涯共此明月
			    </Footer>
			</Layout>
		</div>
	);
}

export default imageContent;
