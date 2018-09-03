import loadable from 'utils/loadable';


const IndexPage = loadable(() =>
  import('routes/IndexPage' /* webpackChunkName: 'IndexPage' */));

const LoginPage = loadable(() =>
  import('routes/LoginPage' /* webpackChunkName: 'LoginPage' */));

const UserRegist = loadable(() =>
  import('routes/UserRegist' /* webpackChunkName: 'UserRegist' */));

const UpdateLog = loadable(() =>
  import('routes/UpdateLog' /* webpackChunkName: 'UpdateLog' */));

const HelpDoc = loadable(() =>
  import('routes/HelpDoc' /* webpackChunkName: 'HelpDoc' */));

const Myself = loadable(() =>
  import('routes/Myself' /* webpackChunkName: 'Myself' */));

const Practice = loadable(() =>
  import('routes/Practice' /* webpackChunkName: 'Practice' */));

const ShowProject = loadable(() =>
  import('routes/ShowProject' /* webpackChunkName: 'ShowProject' */));

const CronTabs = loadable(() =>
  import('routes/ShowProjects/CronTabs' /* webpackChunkName: 'CronTabs' */));


const ShowImage = loadable(() =>
  import('routes/ShowImage' /* webpackChunkName: 'ShowImage' */));

const UploadFile = loadable(() =>
  import('routes/UploadFile' /* webpackChunkName: 'UploadFile' */));


const BlogInfo = loadable(() =>
  import('routes/Blog/BlogInfo' /* webpackChunkName: 'BlogInfo' */));

const BlogEdit = loadable(() =>
  import('routes/Blog/BlogEdit' /* webpackChunkName: 'BlogEdit' */));


const BlogDetail = loadable(() =>
  import('routes/Blog/BlogDetail' /* webpackChunkName: 'BlogDetail' */));

const TaskManage = loadable(() =>
  import('routes/Task/TaskManage' /* webpackChunkName: 'TaskManage' */));


const NewTask = loadable(() =>
  import('routes/Task/NewTask' /* webpackChunkName: 'NewTask' */));

const AllotTask = loadable(() =>
  import('routes/Task/AllotTask' /* webpackChunkName: 'AllotTask' */));


const ExecuteTask = loadable(() =>
  import('routes/Task/ExecuteTask' /* webpackChunkName: 'ExecuteTask' */));

const ProgressTask = loadable(() =>
  import('routes/Task/ProgressTask' /* webpackChunkName: 'ProgressTask' */));


const Test = loadable(() =>
  import('routes/Test' /* webpackChunkName: 'Test' */));

  const childeRouters = [
    {
      path: '/home',
      component: IndexPage,
    },
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/regist',
      component: UserRegist,
    },
    {
      path: '/updatelog',
      component: UpdateLog,
    },
    {
      path: '/helpdoc',
      component: HelpDoc,
    },
    {
      path: '/myself',
      component: Myself,
    },
    {
      path: '/practice',
      component: Practice,
    },
    {
      path: '/showProject',
      component: ShowProject,
    },
    {
      path: '/cron',
      component: CronTabs,
    },
    {
      path: '/showImage',
      component: ShowImage,
    },
    {
      path: '/uploadFile',
      component: UploadFile,
    },
    {
      path: '/blog',
      component: BlogInfo,
    },
    {
      path: '/edit',
      component: BlogEdit,
    },
    {
      path: '/detail',
      component: BlogDetail,
    },
    {
      path: '/task',
      component: TaskManage,
    },
    {
      path: '/task/newtask',
      component: NewTask,
    },
    {
      path: '/task/allot',
      component: AllotTask,
    },
    {
      path: '/task/execute',
      component: ExecuteTask,
    },
    {
      path: '/task/progress',
      component: ProgressTask,
    },
    {
      path: '/test',
      component: Test,
    },
  ];

export default childeRouters;
