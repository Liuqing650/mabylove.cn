import { request,config} from '../utils';
import qs from 'qs';

export async function login(params) {
  return request(config.host+'/userInfo/userlogin', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 登出，注销
export async function logout(params) {
  return request(config.host+'/userInfo/logout', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}