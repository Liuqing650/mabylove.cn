import React,{ Component } from 'react';
import { Modal, Button } from 'antd';
import styles from './registStyle.less';

const registModal = ({
	visible,
	agreementChange,
	agreement,
	onCloseModal,
}) => {

	function onhandleModal() {
		agreement=true;
		agreementChange(agreement);
	}

	function onNotAgreeModal() {
		agreement=false;
		agreementChange(agreement);
	}

	const modalOpts = {
		visible: visible,
		width: 600,
		onOk: onhandleModal,
		onCancel: onCloseModal,
		maskClosable: false,
		wrapClassName:"vertical-center-modal",
		footer:<div className={styles.modalButtonWrapper}>
			    <Button type="dashed" size="large" onClick={onNotAgreeModal}> 
			      拒绝
			    </Button>
			    <Button type="primary" size="large" onClick={onhandleModal}> 
			      同意
			    </Button>
			</div>
	}

	return (
		<div>
			<Modal
			  {...modalOpts}
			>
				<h2 className={styles.centerText}>帷中暮色论坛网站服务协议</h2><br/>
				<p className={styles.contentTextSize}>
					<span className={styles.textFormat}></span>热衷感谢您注册我们的网站。在使用<a href="#">帷中暮色论坛网站</a>之前，
					希望您仔细阅读一下《帷中暮色论坛网站服务协议》，首先它是一个<b>个人网站</b>,本身不具备任何商业性质的交易，不参与
					任何商业交易和经济纠纷，且不承担以上纠纷所产生后的任何责任。<br/><br/>
					<span className={styles.textFormat}></span>网站的主旨是用于所熟悉的朋友一起感受开发所带来的乐趣，分享自己
					的生活点点滴滴，性质本身属于个人网站，且服务器资源等极其有限，传输速度同样非常有限，所以这里注定只属于少
					数人的娱乐朋友圈，所以设定了邀请码验证注册，希望您能理解为何多此一举。<br/>
					
				</p>
				<br/>
				<h4>服务条列</h4>
				<p className={styles.contentTextSize}>
					1.发布内容健康，这里无人审核任何文章，但一经发现，将直接冻结论坛帐号。<br/>
					2.上传文件控制大小和格式，如有需要上传文件的朋友，希望控制文件的大小，目前只支持图片和音乐。<br/>
					3.遵守法律法规，产生任何违法违规的内容或则交易等，论坛将直接关闭。
				</p>
			</Modal>
		</div>
	);
}

export default registModal;