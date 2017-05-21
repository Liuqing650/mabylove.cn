import dva from 'dva';
import './index.html';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/mainView'));
app.model(require('./models/indexModel'));
app.model(require('./models/loginPage'));
app.model(require('./models/updateLog'));
app.model(require('./models/helpDoc'));
app.model(require('./models/myself'));
app.model(require('./models/practice'));
app.model(require('./models/showProject'));
app.model(require('./models/showImage'));
app.model(require('./models/uploadFile'));
app.model(require('./models/userRegist'));
app.model(require('./models/blog'));
app.model(require('./models/Task/taskManage'));
app.model(require('./models/Task/newTask'));
app.model(require('./models/Task/allotTask'));
app.model(require('./models/Task/executeTask'));
app.model(require('./models/Task/progressTask'));

//cms
app.model(require('./models/Cms/appModel'));
app.model(require('./models/Cms/userManage'));
app.model(require('./models/Cms/menuManage'));
app.model(require('./models/Cms/roleManage'));
app.model(require('./models/Cms/groupManage'));
app.model(require('./models/Cms/picture'));
app.model(require('./models/Cms/wisedoctor'));


app.model(require('./models/test'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
