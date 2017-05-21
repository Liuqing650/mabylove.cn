import React, { PropTypes } from 'react'
import { Link } from 'dva/router'
import { Row, Col } from 'antd';
import { connect } from 'dva';
// import Table from '../../components/Cms/Handsontable/handsontable'

function Handsontable({location,dispatch,picture}) {
	const {htData}=picture
	const handsontableProps={
		htData
	}
  return (
    <div>
    {/*<Table {...handsontableProps}/>*/}
    </div>
   
  
     

  )
}

Handsontable.propTypes = {
  location: PropTypes.object,
}

export default connect(({picture})=>({picture}))(Handsontable)
