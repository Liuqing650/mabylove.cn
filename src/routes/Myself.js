import React from 'react';
import { connect } from 'dva';
import MyselfHeader from '../components/Myself/myselfHeader';
import MyselfPage from '../components/Myself/myselfPage';

function Myself({dispatch,location,myself}) {
	const { } = myself;

	const myselfHeaderProps = { };
	const myselfPageProps = { };

	return (
		<div>
			<MyselfHeader {...myselfHeaderProps}/>
			<MyselfPage {...myselfPageProps}/>
		</div>
	)
}

export default connect(({myself}) => ({myself}))(Myself);