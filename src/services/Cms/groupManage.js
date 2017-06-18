import { request,config } from '../../utils';
import qs from 'qs';

export async function getGroupByUserId(params) {
  return request(config.host+'/groupManage/getGroupByUserId', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

export async function add(params) {
	return request(config.host+ '/groupManage/addGroup', {
		method: 'post',
		body: qs.stringify(params),
		data:params,
	})
}


// 获取学生列表
export async function getGroupUserStudent(params) {
  return request(config.host+'/groupManage/getGroupUserStudent', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

export async function updateGroup(params) {
	return request(config.host+'/groupManage/updateGroup', {
		method: 'post',
		body: qs.stringify(params),
		data: params,
	})
}

//条件查询
export async function searchByKeyword(params) {
	return request(config.host + '/groupManage/searchGroupByKeyword',{
		method: 'post',
		body: qs.stringify(params),
		data:params,
	})
}

//删除群组
export async function deleteGroup(params) {
	return request(config.host+'/groupManage/deleteGroup', {
		method: 'post',
		body: qs.stringify(params),
		data:params,
	})
}

// 添加群组成员
export async function addGroupUser(params) {
	return request(config.host+'/groupManage/addGroupUser', {
		method: 'post',
		body: qs.stringify(params),
		data:params,
	})
}

// 成员列表
export async function getList(params) {
	return request(config.host+'/groupManage/getList', {
		method: 'post',
		body: qs.stringify(params),
		data:params,
	})
}