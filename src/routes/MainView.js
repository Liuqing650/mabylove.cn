import React from 'react';
import { connect } from 'dva';
import Main from '../components/main';

function MainView(state) {

  return (
    <div>
    	<Main {...state}></Main>
    </div>
  );
}

export default connect(({mainView}) => ({mainView}))(MainView);
