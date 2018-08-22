import React, {PropTypes} from 'react';
import serverInterface from '../../utils/serverInterface';
import { Modal,Upload,Layout,Row,Col,Icon,Spin,message,Alert,notification } from 'antd';

import styles from './uploadStyle.less';

const uploadContent = ({
	previewVisible,
	loading,
	fileList,
	previewImage,

	onFileChange,
	onUpdateFile,
	onCancel,
	onChangeUploadData,

	uploadInterface,
	uploadMsg,
}) => {
	const { Content} = Layout;

	// const uploadButton = (
 //      <div className={styles.uploadButtonWrapper}>
 //        <Icon className={styles.uploadButtonIcon} type="plus" />
 //        <div className={styles.uploadButton}>Upload</div>
 //      </div>
 //    );

 	// config.host+'/upload/uploadFile'
 	function openNotification(notice) {
 		const noticeContent = <p>亲爱的帷友，您刚刚选择的文件是<a>{notice}</a>吗?<br/>如果判断有误，请不要上传。<br/><b>暂时不支持视频文件。</b></p>
	  const args = {
	    message: <h2>上传文件类型提示</h2>,
	    description: noticeContent,
	    duration: 3,
	  };
	  notification.open(args);
	};
	const props = {
		name:'file',
		action:uploadInterface,
		multiple: true,
		data:uploadMsg,
		listType: 'picture-card',
		beforeUpload(file) {
			changeFileTypeUrl(file.type);
			// message.info("很抱歉,上传通道暂时关闭了",4)
			// return false;
		},
		onChange(info) {
			handleChange(info.fileList)
			if (info.file.status == 'uploading') {
			  message.info("上传中")
			}
			if (info.file.status !== 'uploading') {
			  console.log(info.file);
			  console.log(info.fileList);
			}
			if(info.file.status=='done'){
				if(info.file.response.result ===true) {
			    	message.info("上传成功")
			    	
				} else if (info.file.response.result ===false) {
			    	message.error("上传失败"+info.file.msg)
				}
			}
			
		},
		onPreview:handlePreview,
 		onRemove:handleCancel,
		fileList: [...fileList],
	}

	function handlePreview(file) {
		onUpdateFile(file);
	}
	function handleCancel() {
		onCancel();
	}
	function handleChange(fileList) {
		onFileChange(fileList)
	}
	function changeFileTypeUrl(fileType) {
		var interfaceStr = '';
		if(fileType.indexOf('image')>-1) {
			const notice = '图片';
			openNotification(notice)
			interfaceStr = serverInterface.img;
		} else if(fileType.indexOf('audio')>-1) {
			const notice = '音乐';
			openNotification(notice)
			interfaceStr = serverInterface.voice;
		} else if(fileType.indexOf('video')>-1) {
			const notice = '视频';
			openNotification(notice)
			interfaceStr = serverInterface.video;
		} else {
			const notice = '其他类型文件';
			openNotification(notice)
			interfaceStr = serverInterface.file;
		}
		onChangeUploadData(interfaceStr);
	}
	const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
  return (
    <div className={styles.uploadWrapper}>
    	<Layout>
		    <Content style={{ margin: '20px 50px',}}>
		    	<h2>文件上传</h2>
				<Row>
					<Col span={12}>
						<h4>上传成功</h4>
					</Col>
					<Col span={12}>
						 <div>
					        <Upload {...props}>
					          {uploadButton}
					        </Upload>
					        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
					          <img alt="example" style={{ width: '100%' }} src={previewImage} />
					        </Modal>
					      </div>
					</Col>
			    </Row>
		    </Content>
    	</Layout>
    	
    </div>
  )
}

export default uploadContent;
