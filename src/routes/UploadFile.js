import React from 'react';
import {connect} from 'dva';
import UploadContent from '../components/UploadFile/uploadContent';

function UploadFile({dispatch,location,uploadFile}) {

	const {
		loading,previewVisible,previewImage,fileList,uploadInterface,uploadMsg,
	} = uploadFile;

	const UploadContentProps = {
		fileList:fileList,
		loading: loading,
		previewVisible:previewVisible,
		previewImage:previewImage,
		uploadInterface: uploadInterface,
		uploadMsg: uploadMsg,
		onUpdateFile(file) {
			dispatch({
				type: 'uploadFile/updateFile',
				payload: file,
			})
		},
		onFileChange(value) {
			dispatch({
				type: 'uploadFile/fileChange',
				payload: {fileList:value}
			})
		},
		onCancel() {
			dispatch({
				type: 'uploadFile/hidePreviewVisible',
			})
		},
		onChangeUploadData(interfaceStr) {
			dispatch({
				type: 'uploadFile/changeUploadData',
				payload: interfaceStr,
			})
		}
	}

	return (
		<div>
			<UploadContent {...UploadContentProps} />
		</div>
	);
}

export default  connect(({uploadFile}) => ({uploadFile}))(UploadFile);