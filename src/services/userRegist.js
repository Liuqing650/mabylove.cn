
import { request,config} from '../utils';
import qs from 'qs';

// 验证邀请码
export async function judgeInvite(params) {
  return request(config.host+'/invite/judgeInvite', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
// 使用邀请码
export async function useInvite(params) {
  return request(config.host+'/invite/useInvite', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 再次验证邀请码是否有效
export async function repeatJudgeInvite(params) {
  return request(config.host+'/invite/repeatJudgeInvite', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 注册用户
export async function regist(params) {
  return request(config.host+'/userInfo/regist', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 判断用户名是否已经存在
export async function userExists(params) {
  return request(config.host+'/userInfo/user_exists', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}