import React,{ PropTypes } from 'react';
import { connect } from 'dva';
import {Form, Button,Radio, Checkbox,message } from 'antd';
import styles from './loginPage.less'
import ReactDOM from 'react-dom';
import LoginForm from '../components/loginPage';
import {hashHistory} from 'react-router';

const LoginPage = ({ location, dispatch, loginPage }) => {
	const {loading} = loginPage;
	const loginForm = {
		loading: loading,
		onLogin(loginDate) {
			dispatch ({
	          type: 'loginPage/login',
	          payload: loginDate,
	        })
		}
	};
	let docH = document.body.clientHeight;
	return (
		<div className={styles.loginStyle} style={{width: '100%',height:`${docH-145}px`}}>
			<div className={styles.signIn}>
	            <div className={styles.logo+" "+styles.mb}>
		            <span>Mabylove</span>
		        </div>
		            <LoginForm {...loginForm} />    
		    </div>
	    </div>
	);
}

export default connect(({loginPage}) => ({loginPage}))(LoginPage);