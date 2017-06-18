import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import CarGameComponent from '../../../components/Game/CarGame/carGameComponent';

function CarGame({dispatch,location}) {
	const CarGameComponentProps = {
	}

	return (
		 <div>
		 	<CarGameComponent {...CarGameComponentProps} />
		 </div>
	)
}

export default CarGame;