import { request,config} from '../utils';
import qs from 'qs';


// 1.查询所有任务列表
export async function getTaskList(params) {
  return request(config.host+'/task/getTaskList', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 2.查询用户任务列表
export async function getTaskListByUser(params) {
  return request(config.host+'/task/getTaskListByUser', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 3.查询任务详细情况
export async function getTaskDetail(params) {
  return request(config.host+'/task/getTaskDetail', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 4.新增任务
export async function addTask(params) {
  return request(config.host+'/task/addTask', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 5.插入列表详情
export async function addTaskDetail(params) {
  return request(config.host+'/task/addTaskDetail', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 6.修改任务
export async function updateTask(params) {
  return request(config.host+'/task/updateTask', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 7.隐藏任务
export async function hideTask(params) {
  return request(config.host+'/task/hideTask', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 8.修改任务项(0:隐藏任务项，1显示任务项)
export async function updateTaskDetail(params) {
  return request(config.host+'/task/updateTaskDetail', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}


/********************
 ***
 *** 任务管理界面接口
 ***
 ********************/
// 1.获取任务列表目录(含状态值)
export async function getTaskListName(params) {
  return request(config.host+'/task/getTaskListName', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 2.根据任务id获取任务详细情况
export async function getTaskInfo(params) {
  return request(config.host+'/task/getTaskInfo', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 3.获取任务项信息
export async function getTaskItemInfo(params) {
  return request(config.host+'/task/getTaskItemInfo', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 4.获取已分组任务信息
export async function getGroupInfo(params) {
  return request(config.host+'/task/getGroupInfo', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 5.获取任务关系表中的成员
export async function getUserForTask(params) {
  return request(config.host+'/task/getUserForTask', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 6.将成员纳入到任务表中
export async function addUserToTask(params) {
  return request(config.host+'/task/addUserToTask', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 7.修改任务组成员信息
export async function updateUserForTask(params) {
  return request(config.host+'/task/updateUserForTask', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 8.批量导入成员(会先初始化数据，即删除原来的数据)
export async function addUsersToTask(params) {
  return request(config.host+'/task/addUsersToTask', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}


/********************
 ***
 *** 任务执行界面接口
 ***
 ********************/


// 1.获取分配给接收人的任务项列表
export async function getTaskListToUser(params) {
  return request(config.host+'/task/getTaskListToUser', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 2.获取任务项详情
export async function getTaskDetailToUser(params) {
  return request(config.host+'/task/getTaskDetailToUser', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 3.修改已读状态
export async function updateIsRead(params) {
  return request(config.host+'/task/updateIsRead', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 4.修改提交信息(任务页面)
export async function updateIsSubmit(params) {
  return request(config.host+'/task/updateIsSubmit', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}


// 5.修改提交信息(任务详情页面)
export async function updateUserIsSubmit(params) {
  return request(config.host+'/task/updateUserIsSubmit', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 6.修改完成状态
export async function updateIsComplete(params) {
  return request(config.host+'/task/updateIsComplete', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 7.提交任务描述
export async function updateDescription(params) {
  return request(config.host+'/task/updateDescription', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}



/********************
 ***
 *** 任务进度报表
 ***
 ********************/

 // 1.获取所有任务项进度
export async function getAllTaskCount(params) {
  return request(config.host+'/task/getAllTaskCount', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
 
 // 2.获取单独某项任务进度
export async function getTaskCountByTaskId(params) {
  return request(config.host+'/task/getTaskCountByTaskId', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
 
 // 3.获取学生任务状态信息
export async function getTaskReport(params) {
  return request(config.host+'/task/getTaskReport', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
 