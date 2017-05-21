import { request,config} from '../utils';
import qs from 'qs';

export async function query(params) {
  return request(config.host+'/updateLog/getUpdateLog', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

export async function add(params) {
  return request(config.host+'/updateLog/addUpdateLog', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
