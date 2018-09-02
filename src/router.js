import React from 'react';
import { Router, Route, Switch, IndexRedirect } from 'dva/router';
import MainView from './routes/MainView';
import IndexPage from './routes/IndexPage';
import LoginPage from './routes/LoginPage';
import UserRegist from './routes/UserRegist';
import UpdateLog from './routes/UpdateLog';
import HelpDoc from './routes/HelpDoc';
import Myself from './routes/Myself';
import Practice from './routes/Practice';
import ShowProject from './routes/ShowProject';
import CronTabs from './routes/ShowProjects/CronTabs';
import ShowImage from './routes/ShowImage';
import UploadFile from './routes/UploadFile';
import BlogInfo from './routes/Blog/BlogInfo';
import BlogEdit from './routes/Blog/BlogEdit';
import BlogDetail from './routes/Blog/BlogDetail';
import TaskManage from './routes/Task/TaskManage';
import NewTask from './routes/Task/NewTask';
import AllotTask from './routes/Task/AllotTask';
import ExecuteTask from './routes/Task/ExecuteTask';
import ProgressTask from './routes/Task/ProgressTask';

import Test from './routes/Test';

import TabsReact from './routes/StudyReact/Tabs';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={MainView} >
          <IndexRedirect to="/home" />
          <Route path="/home" component={IndexPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/regist" component={UserRegist} />
          <Route path="/updatelog" component={UpdateLog} />
          <Route path="/helpdoc" component={HelpDoc} />
          <Route path="/myself" component={Myself} />
          <Route path="/practice" component={Practice} />
          <Route path="/showProject" component={ShowProject} />
          <Route path="/cron" component={CronTabs} />
          <Route path="/showImage" component={ShowImage} />
          <Route path="/uploadFile" component={UploadFile} />
          <Route path="/blog" component={BlogInfo} />
          <Route path="/edit" component={BlogEdit} />
          <Route path="/detail" component={BlogDetail} />
          <Route path="/task" component={TaskManage} />
          <Route path="/task/newtask" component={NewTask} />
          <Route path="/task/allot" component={AllotTask} />
          <Route path="/task/execute" component={ExecuteTask} />
          <Route path="/task/progress" component={ProgressTask} />

          <Route path="/test" component={Test} />
          <Route path="/react" component={TabsReact} />
        </Route>
    </Router>
  );
}

export default RouterConfig;
