import React from 'react';
import { connect } from 'dva';
import { withRouter, Route, Redirect, Switch } from 'dva/router';
import Main from 'components/main';
import childeRouters from './childRouter';

function App(props) {
  const bashRedirect = '/home';
  return (
    <div>
      <Main {...props}>
        <Switch>
            {childeRouters.map((item, index) => (
              <Route
                key={`${item.path}-${index}`}
                path={item.path}
                component={item.component || null}
              />
            ))}
            <Redirect to={bashRedirect} />
        </Switch>
      </Main>
    </div>
  );
}
export default withRouter(connect(({mainView}) => ({mainView}))(App));
