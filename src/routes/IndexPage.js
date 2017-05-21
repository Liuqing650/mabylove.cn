import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import {BackTop,Icon} from 'antd';
import Index from '../components/Index/index';
import './../components/Index/less/antMotion_style.less';

const backTopStyle = {
	color: '#57c5f7',
	display: 'block',
	width: '50px',
	height: '50px',
	lineHeight: '50px',
    textAlign: 'center',
    borderRadius: '5px',
	background: 'rgba(204, 204, 204,0.2)',

}

function IndexPage({dispatch, location, indexModel}) {
	const { navMenu } = indexModel;

  return (
    <div>
        <Index />
        <BackTop>
	      <strong style={backTopStyle}> <Icon type="arrow-up" />Top </strong>
	    </BackTop>
    </div>
  );
}

export default connect(({indexModel}) => ({indexModel}))(IndexPage);
