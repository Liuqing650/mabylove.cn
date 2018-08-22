import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/mainView').default);
app.model(require('./models/indexModel').default);
app.model(require('./models/loginPage').default);
app.model(require('./models/updateLog').default);
app.model(require('./models/helpDoc').default);
app.model(require('./models/myself').default);
app.model(require('./models/practice').default);
app.model(require('./models/showProject').default);
app.model(require('./models/showImage').default);
app.model(require('./models/ShowProjects/cronTabs').default);
app.model(require('./models/uploadFile').default);
app.model(require('./models/userRegist').default);
app.model(require('./models/blog').default);
app.model(require('./models/Task/taskManage').default);
app.model(require('./models/Task/newTask').default);
app.model(require('./models/Task/allotTask').default);
app.model(require('./models/Task/executeTask').default);
app.model(require('./models/Task/progressTask').default);

//cms
app.model(require('./models/Cms/appModel').default);
app.model(require('./models/Cms/userManage').default);
app.model(require('./models/Cms/menuManage').default);
app.model(require('./models/Cms/roleManage').default);
app.model(require('./models/Cms/groupManage').default);
app.model(require('./models/Cms/picture').default);
app.model(require('./models/Cms/wisedoctor').default);


app.model(require('./models/test').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
