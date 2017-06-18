import React from 'react';
import { Spin,Row,Col,Icon,Button } from 'antd';
import QueueAnim from 'rc-queue-anim';
import styles from '../BlogInfo/blogStyle.less';
import webUrl from '../../../utils/webResUrl';

const blogComment = ({
	commentList,
	onShowCommentModal,
}) => {

	const loopComment =  data => data.map((item,index) => {
		return (
			<div key={item.comment_id} className={styles.commentStyle}>
				<Row>
					<Col span={4}>
						<div className={styles.leftUpStyle}>
							<img className={styles.commentUserImg} src={item.avatar?item.avatar:webUrl.default.headPic}/>
						</div>
						<div className={styles.userNameStyle}>{item.nick_name}</div>
					</Col>
					<Col span={20}>
						<div className={styles.rightWrapper}>
							<div className={styles.commentContentStyle}>{item.comment}</div>
							<div className={styles.commentBottomStyle}>
								<div className={styles.commentBottomRight}>
									{item.comment_time}
								</div>
							</div>
						</div>
					</Col>
				</Row>
				
			</div>
		)
	})

	const nothingComment = (
		<div className={styles.nothingCommentStyle}>
			<p  onClick={onShowCommentModal} className={styles.nothingCommentText}>没有任何评论</p>
		</div>
	)

	const commentNode = commentList.length>0?loopComment(commentList):nothingComment;

	return (
		<div className={styles.detailWrapper}>
			<div className={styles.commentDetaiStyle}>
				<div className={styles.commentTitle}>
					<h2>最新评论</h2>
				</div>
				<Row style={{height:30}}>
					<Col span={8}>
						共计评论{commentList.length}条
					</Col>
					<Col span={16}>
						<div className={styles.operateStyle}>
							<div className="my-button-style">
								<Button.Group>
									<Button size="large" onClick={onShowCommentModal} className={styles.operateText}>
										<Icon type="edit" />评论
									</Button>
									<Button size="large" className={styles.operateText}>
										收藏<Icon type="star-o" />
									</Button>
								</Button.Group>
							</div>
						</div>
					</Col>
				</Row>
				<div className={styles.commentWrapper}>
				 	{commentNode}
				</div>
			</div>
		</div>
	)
}

export default blogComment;