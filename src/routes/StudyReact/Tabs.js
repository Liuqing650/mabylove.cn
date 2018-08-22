import React from 'react';
import { connect } from 'dva';
import App from '../../components/StudyReact/no1/app';

function TabsReact(){

	const AppProps = {}

	return (
		<div>
			<App {...AppProps} />
		</div>
	)
}

export default TabsReact;