import '@babel/polyfill';
import dva from 'dva';
import createHistory from 'history/lib/createHashHistory';
// 引入路由
import router from './router';
// 引入model
import appModel from './models/app';
import mainView from './models/mainView';
import indexModel from './models/indexModel';
import loginPage from './models/loginPage';
import updateLog from './models/updateLog';
import helpDoc from './models/helpDoc';
import myself from './models/myself';
import practice from './models/practice';
import showImage from './models/showImage';
import showProject from './models/showProject';
import uploadFile from './models/uploadFile';
import userRegist from './models/userRegist';
import blog from './models/blog';
import taskManage from './models/Task/taskManage';
import newTask from './models/Task/newTask';
import allotTask from './models/Task/allotTask';
import executeTask from './models/Task/executeTask';
import progressTask from './models/Task/progressTask';
// 引入全局样式
import './index.less';
// 引入mock
import './mock';

const history = createHistory();
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// bug: 不用require()导入
// https://github.com/dvajs/dva/issues/261
app.model(appModel);
app.model(mainView);
app.model(indexModel);
app.model(loginPage);
app.model(updateLog);
app.model(helpDoc);
app.model(myself);
app.model(practice);
app.model(showImage);
app.model(showProject);
app.model(uploadFile);
app.model(userRegist);
app.model(blog);
app.model(taskManage);
app.model(newTask);
app.model(allotTask);
app.model(executeTask);
app.model(progressTask);

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
