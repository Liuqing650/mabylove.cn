import React from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import loadable from 'utils/loadable';

// 按需加载
const HomePage = loadable(() =>
  import('routes/HomePage' /* webpackChunkName: 'HomePage' */));

const SecondPage = loadable(() =>
  import('routes/SecondPage' /* webpackChunkName: 'SecondPage' */));

function ChildrenRouter() {
  return (
    <main>
      <Switch>
        <Route path="/home" exact component={HomePage} />
        <Route path="/list" exact component={SecondPage} />
        <Redirect to="/home" />
      </Switch>
    </main>
  );
}

export default ChildrenRouter;
