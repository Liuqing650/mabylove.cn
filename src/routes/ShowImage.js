import React from 'react';
import {connect} from 'dva';
import ImageContent from '../components/ShowImage/imageContent';
import ShowImageContent from '../components/ShowImage/showImageContent';
import ImageModal from '../components/ShowImage/imageModal';

function ShowImage({dispatch,location,showImage}) {

	const {
		imgList,showImgItem,visible,loading,commentData,clearText,
		picOpen,imageData,
	} = showImage;

	const ImageModalProps = {
		showImgItem: showImgItem,
		visible:visible,
		loading: loading,
		commentData: commentData,
		clearText:clearText,
		onSubmitComment(obj) {
			dispatch({
				type: 'showImage/newComment',
				payload: obj,
			})
		},
		closeModal() {
			dispatch({
				type: 'showImage/hideModal'
			})
		}
	}

	const ImageContentProps = {
		imgList:imgList,
		showDetail(obj) {
			dispatch({
				type:'showImage/showDetail',
				payload: obj,
			})
		},
		showUpdateModal() {
			dispatch({
				type:'showImage/showUpdateModal',
			})
		}
	};

	const ShowImageContentProps = {
		picOpen: picOpen,
		imageData: imageData,
		storePicOpen(obj) {
			dispatch({
				type:'showImage/storePicOpen',
				payload: obj,
			})
		}
	};

			// <ImageContent {...ImageContentProps} />
	return(
		<div>
			<ImageContent {...ImageContentProps} />
			<ImageModal {...ImageModalProps} />
		</div>
	);
}

export default connect(({showImage}) => ({showImage}))(ShowImage);
