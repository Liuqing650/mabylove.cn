import { request,config} from '../../utils';
import qs from 'qs';


// 1.查询博客列表
export async function cronTabAnalyze(params) {
  return request(config.host+'/showProjectOne/analyzeCron', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}