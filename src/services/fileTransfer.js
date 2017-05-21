// fileTransfer.js
import { request,config} from '../utils';
import qs from 'qs';

export async function setHtmlFile(params) {
  return request(config.host+'/file/setHtmlFile', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}