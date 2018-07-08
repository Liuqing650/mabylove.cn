import React from 'react';
import { connect } from 'dva';
import AppCom from 'components/AppCom';
import ChildrenRouter from './childRouter';

function App(props) {
  return (
    <div>
      <AppCom {...props}>
        <ChildrenRouter />
      </AppCom>
    </div>
  );
}
export default connect((state) => (state))(App);
