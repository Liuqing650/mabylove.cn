import { request,config} from '../utils';
import qs from 'qs';


// 1.查询博客列表
export async function getBlogList(params) {
  return request(config.host+'/blog/getBlogList', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

// 查询博文内容
export async function getBlogDeatil(params) {
  return request(config.host+'/blog/getBlogDeatil', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
// 添加博客内容
export async function addBlog(params) {
  return request(config.host+'/blog/addBlog', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
// 修改博客内容
export async function updateBlog(params) {
  return request(config.host+'/blog/updateBlog', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
// 评论博文
export async function addComment(params) {
  return request(config.host+'/blog/addComment', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
// 收藏博文
export async function collectionBlog(params) {
  return request(config.host+'/blog/collectionBlog', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
// 删除博文
export async function deletBlog(params) {
  return request(config.host+'/blog/deletBlog', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
// 隐藏博文
export async function hideBlog(params) {
  return request(config.host+'/blog/hideBlog', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
// 1.获取个人发布的博文列表
export async function getMyBlogList(params) {
  return request(config.host+'/blog/getMyBlogList', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
// 2.获取收藏的博文列表
export async function getCollectionBlog(params) {
  return request(config.host+'/blog/getCollectionBlog', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
// 3.获取评论列表
export async function getBlogComment(params) {
  return request(config.host+'/blog/getBlogComment', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
// 4.搜索博客列表
export async function seachBlog(params) {
  return request(config.host+'/blog/seachBlog', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
// 1.新增类型
export async function addBlogType(params) {
  return request(config.host+'/blog/addBlogType', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}
// 2.类型查询
export async function getBlogType(params) {
  return request(config.host+'/blog/getBlogType', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}

/**
   * 功能性处理
   * */
// 1.添加星
export async function updateStar(params) {
  return request(config.host+'/blog/updateStar', {
    method: 'post',
    body: qs.stringify(params),
    data:params,
  })
}