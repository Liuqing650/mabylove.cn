import React from 'react';
import {connect} from 'dva';
import ShowProjectContent from '../components/ShowProject/showProjectContent';

function ShowProjectPage({dispatch,location,showProject}) {

	const {
		projectList,popoverVisible,
	} = showProject;

	const ShowProjectContentProps = {
		projectList:projectList,
		popoverVisible: popoverVisible,
		onPoverClick() {
			dispatch({
				type:'showProject/onPopoverChange',
			})
		}
	};

	return(
		<div>
			<ShowProjectContent {...ShowProjectContentProps} />
		</div>
	);
}

export default connect(({showProject}) => ({showProject}))(ShowProjectPage);