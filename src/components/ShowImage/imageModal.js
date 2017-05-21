import React from 'react';
import { Modal, Button,Row, Col,Input,Tag,Form } from 'antd';
import styles from './showImgStyle.less';
const FormItem = Form.Item;

function imageModal({
	showImgItem,
	commentData,
	clearText,
	visible,
	closeModal,
	onSubmitComment,
	loading,
	form:{
		getFieldDecorator,
	    validateFields,
	    getFieldsValue,
	    resetFields,
	}
}) {
	function editEnter(event) {
		if(event.keyCode===13) {
			event.preventDefault();
			handleOk()
		}
	}

	function handleOk() {
		validateFields((errors) => {
			if(errors) {
				return
			}
			const data = { ...getFieldsValue()}
			console.log('data=============>>',data);
			onSubmitComment(data)
			resetFields()
		})
	}
	function handleCancel() {
		closeModal();
	}

	const loop = data => data.map((item,index)=>{
		return (
			<div className={styles.comment} key={index}>
				<p><Tag color="pink" className={styles.commentUser}>{item.name}</Tag><span>{item.comment}</span></p>
			</div>
		)
	})

	const commentLoop = loop(commentData)

	const modalOpts = {
		visible: visible,
		title: showImgItem.title,
		width:"800px",
		onOk: handleOk,
		onCancel:closeModal,
	}

	// const loopComent = <div className={styles.comment}>
	// 						<div><Tag color="pink" className={styles.commentUser}>路人甲</Tag><span>我觉得楼下说的很有道理，请继续说</span></div>
	// 					</div>
	// 					<div className={styles.comment}>
	// 						<div><Tag color="pink" className={styles.commentUser}>路人甲</Tag><span>我也觉得楼下说的很有道理，请继续说</span></div>
	// 					</div>
	// 					<div className={styles.comment}>
	// 						<div><Tag color="pink" className={styles.commentUser}>路人甲</Tag><span>我也觉得楼下说的很有道理，请继续说</span></div>
	// 					</div>
	// 					<div className={styles.comment}>
	// 						<div><Tag color="pink" className={styles.commentUser}>路人甲</Tag><span>我也觉得楼下说的很有道理，请继续说</span></div>
	// 					</div>
	// 					<div className={styles.comment}>
	// 						<div><Tag color="pink" className={styles.commentUser}>路人甲</Tag><span>我也觉得楼下说的很有道理，请继续说</span></div>
	// 					</div>
	// 					<div className={styles.comment}>
	// 						<div><Tag color="pink" className={styles.commentUser}>路人甲</Tag><span>我也觉得楼下说的很有道理，请继续说</span></div>
	// 					</div>
	// 					<div className={styles.comment}>
	// 						<div><Tag color="pink" className={styles.commentUser}>路人甲</Tag><span>我也觉得楼下说的很有道理，请继续说</span></div>
	// 					</div>
	return (
		<div>
			<Modal {...modalOpts}

				footer={[
				<Button key="back" size="large" onClick={handleCancel}>关闭</Button>,
				<Button key="submit" type="primary" size="large" loading={loading} onClick={handleOk}>
				  评论
				</Button>,
				]}
			>
				<div className={styles.clearfix}>
					<div className={styles.left}>
						<img src={showImgItem.image} />
					</div>
					<div className={styles.right}>
						<div className={styles.comments}>
							{commentLoop}
						</div>
						<div className={styles.inputComment}>
							<Form>
							  	<FormItem
									hasFeedback
							  		>
						            {getFieldDecorator('comment',
						            	{rules: [{ required: true, message: '请填写后提交评论!' }]}
						            	)(
						            	<Input onKeyDown={editEnter} type="textarea" rows={4} />
						            )}
						        </FormItem>
							</Form>
						</div>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default Form.create()(imageModal);
