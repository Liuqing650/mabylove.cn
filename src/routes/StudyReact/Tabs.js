import React from 'react';
import { connect } from 'dva';
import Tabs from '../../components/StudyReact/no1/Tabs';

function TabsReact(){

	const TabsProps = {}

	return (
		<div>
			<Tabs {...TabsProps} />
		</div>
	)
}

export default TabsReact;