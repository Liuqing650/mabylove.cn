import React from 'react';
import {connect} from 'dva';
import ReactDOM from 'react-dom';
import RegistContent from '../components/UserRegist/registContent';
import RegistModal from '../components/UserRegist/registModal';
import styles from './UserRegist.less';

function UserRegist({location,dispatch,userRegist}) {
	const {
		visible,loading,
		agreement,judgePwd,invite,inviteCode,isExisits,startState
	} = userRegist;

	const RegistModalProps = {
		visible:visible,
		agreement: agreement,
		onCloseModal() {
			dispatch({
				type:'userRegist/hideModal',
			})
		},
		agreementChange(agreement) {
			dispatch({
				type:'userRegist/agreementChange',
				payload: agreement,
			})
		}
	}

	const RegistContentProps = {
		loading:loading,
		agreement: agreement,
		judgePwd:judgePwd,
		isExisits:isExisits,
		invite:invite,
		startState: startState,
		inviteCode: inviteCode,
		onShowModal() {
			dispatch({
				type:'userRegist/showModal',
			})
		},
		onCheckbox(agreement) {
			dispatch({
				type:'userRegist/onCheckbox',
				payload: agreement,
			})
		},
		onUseInvite(code) {
			dispatch({
				type:'userRegist/useInvite',
				payload:code,
			})
		},
		onJudgePwd(value) {
			dispatch({
				type:'userRegist/onJudgePwd',
				payload: value,
			})
		},
		onJudgeUser(value) {
			if(value) {
				dispatch({
					type:'userRegist/judgeUser',
					payload: value,
				})
			}
		},
		judgeInvite(value) {
			dispatch({
				type:'userRegist/judgeInvite',
				payload: value
			})
		},
		onSubmit(data) {
			dispatch({
				type: 'userRegist/addUser',
				payload: data,
			})
		}
	}
	const docH = document.body.clientHeight-144;
	return (
		<div className={styles.registWrapper} style={{height:`${docH}px`}}>
			<div className={styles.contentWrapper} style={{height:`${docH}px`}}>
				<img className={styles.logoStyle} src="http://img.mabylove.cn/rootImg/logo/logoP100.png"/>
				<div className={styles.contentStyle}>
					<RegistContent {...RegistContentProps} />
				</div>
			</div>
			<RegistModal { ...RegistModalProps }/>
		</div>
	)
}

export default connect(({userRegist})=>({userRegist}))(UserRegist);