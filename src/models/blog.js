import React from 'react';
import { parse } from 'qs';
import {message} from 'antd';
import {
  getBlogList,getBlogDeatil,addBlog,updateBlog,addComment,
  collectionBlog,deletBlog,hideBlog,getMyBlogList,
  getCollectionBlog,getBlogComment,seachBlog,addBlogType,
  getBlogType,updateStar
} from '../services/blog';
import { convertToRaw,ContentState,EditorState } from 'draft-js';
import {hashHistory} from 'dva/router';
import storage from '../utils/browserData';
// (3,169,244,0.5)
// {rgba:{a:0.5,r:3,g:169,b:244}}
export default {

  namespace: 'blog',

  state: {
    showDetail: false,
    listLoading: false,
    detailLoading: false,
    editLoading: false,
    commentVisible: false,
    showTabs: true,
    contentState: null,
    editorContent: null,
    user_id: '',
    blogList: [],
    blogType: [],
    commentList: [],
    starObj: {star:0,click:false},
    starNumber: 70,
    blogEditData: {blogTitle:null,subContent:null,blogType:null,content:null,userId:null,userName:null,blogState:null},
    background:'rgba(3,169,244,0.5)',
    authorInfo: {},
    blogINfo: {},
    selectColor:{rgb:{a:1,r:3,g:169,b:244}},
    alphaColor: {rgb:{a:0.5,r:3,g:169,b:244}},
  },

  subscriptions: {
    setup({ dispatch, history }) { 
      history.listen( location => {
        if(location.pathname === '/blog') {
          dispatch({
            type:'query',
            payload: location.query,
          })
        }
        if(location.pathname === '/edit') {
          dispatch({
            type:'queryType',
            payload: location.query,
          })
        }
        if(location.pathname === '/detail') {
          dispatch({
            type:'queryDetail',
            payload: location.query,
          })
        }
      });
    },
  },

  effects: {
    *query({ payload }, { call, put }) { 
        yield put({type:'showListLoading'});
        const typeData = yield call(getBlogType);
        var blogData = [];
        if(typeData) {
            const obj = {};
            obj['type_id'] = typeData[0].id;
            blogData = yield call(getBlogList,obj);
        }
        if(blogData && blogData.length>0) {
            yield put({ 
            type: 'querySuccess',
                payload: {
                    blog:blogData,
                    type:typeData,
                }
            });
        } else {
            message.error('没有查询到数据');
        }
        yield put({type:'hideListLoading'});
    },
    *queryDetail({ payload }, { call, put }) {
        yield put({type:'showDetailLoading'});
        const obj = {};
        obj['blog_id']=payload.blogId;
        const data = yield call(getBlogDeatil,obj);
        // 请求评论信息
        const commentData = yield call(getBlogComment,obj); 
        if(data&&commentData&&data.length>0) {
          // 处理数据
          // 1.获取到博客信息
          var blogData = data[0];
          // 2.分开存储对象,定义:作者信息、博客信息、博客内容三部分
          var authorInfo = {};
          var blogINfo = {};
          var blogContent = {};
          // 3.存储作者信息、博客信息
          authorInfo['author_id']=blogData.author_id;
          authorInfo['author_name']=blogData.author_name;

          blogINfo['blog_id']=blogData.blog_id;
          blogINfo['blog_name']=blogData.blog_name;
          blogINfo['star']=blogData.star;
          blogINfo['blog_time']=blogData.blog_time;
          blogINfo['type_id']=blogData.type_id;
          // 4.博客内容转为对象
          blogContent['content']=JSON.parse(blogData.blog_content);
          // 5.查询及处理成功
            yield put({
                type: 'queryDetailSuccess',
                payload: {
                  authorInfo:authorInfo,
                  blogINfo:blogINfo,
                  blogContent:blogContent,
                  commentData:commentData,
                },
            });
        } else {
            message.error('该文章已被销毁，您可以看看别的内容。');
        }
        yield put({type:'hideDetailLoading'});
    },
    *queryType({ payload }, { call, put }) {
        const data = yield call(getBlogType);
        if(data) {
            yield put({
                type: 'queryTypeSuccess',
                payload: data,
            });
        }
    },
    *tabsChange({ payload }, { call, put }) {
        yield put({type:'showListLoading'});
        const obj = {};
        obj['type_id'] = payload;
        const blogData = yield call(getBlogList,obj);
        if(blogData && blogData.length>0) {
            yield put({ 
            type: 'queryBlogList',
                payload: {
                    blog:blogData,
                }
            });
        } else {
            message.error('没有查询到数据');
        }
        yield put({type:'hideListLoading'});
    },
    *editBlog({ payload }, { call, put }) { 
        hashHistory.push('/edit');
    },
    *showDetailPage({ payload }, { call, put }) {
      hashHistory.push('/detail?blogId='+payload);
    },
    *showBlog({ payload }, { call, put }) { 
        hashHistory.push('/blog');
    },
    *addBlog({ payload }, { call, put }) { 
        yield put({type:'showEditLoading'});
        const obj = {};
        obj['blog_content'] = payload.content;
        obj['user_id'] = payload.user_id;
        obj['blog_name'] = payload.blog_title;
        obj['blog_state'] = payload.blog_state;
        obj['type_id'] = payload.blog_type;
        obj['description'] = payload.description;
        const content = payload.content;
        const data = yield call(addBlog,obj);
        yield put({type:'hideEditLoading'});
        if(data.result) {
          message.success("保存成功");
          hashHistory.push('/blog');
        } else {
          message.success("保存失败")
        }
    },
    *addStar({ payload }, { call, put }) {
      // 1.计算星星
      function changeStar(click,star,index) {
        var tempStar = 0;
        var newStar = 0;
        if(click) {
          tempStar = parseInt(star)+index;
        } else if(!click) {
          tempStar = parseInt(star)-index;
        }
        newStar = tempStar>=0?tempStar:0;
        return newStar;
      }
      const obj = {};
      obj['star']=changeStar(payload.click,payload.star,1);
      obj['blog_id']=payload.blog_id;
      obj['user_id']=payload.user_id;
      obj['click']=payload.click;
      const data = yield call(updateStar,obj);
      if(data) {
        yield put({
          type:'onStarChange',
          payload: obj,
        })
      }
    },
    *onAddComment({ payload }, { call, put }) {
      yield put({type:'onHideModal'});
      var obj = {};
      obj['blog_id'] = payload.blog_id;
      const data = yield call(addComment,payload);
      if(data) {
        message.success("评论成功！！");
        const commentData = yield call(getBlogComment,obj);
        if(commentData) {
          yield put({
            type:'queryCommentSuccess',
            payload: commentData,
          })
        } else {
          message.error("没有查询到数据");
        }
      }
    }
  },

  reducers: {
    querySuccess(state, action) {
      const data = action.payload;
      const blogList = data.blog;
      const blogType = data.type;
      // 分类博客
      function groupBlogList(list,type) {
        var arr=[];
        for(let i=0;i<type.length;i++) {
          var obj={};
          var tempArr=[];
          obj['type']=type[i].id;
          for(let j=0;j<list.length;j++) {
            if(list[j].type_id==obj.type) {
              tempArr.push(list[j])
            }
          }
          obj['list']=tempArr;
          arr.push(obj);
        }
        return arr;
      }
      // 赋予index值
      function setTypeIndex(arr) {
        for(let i=0;i<arr.length;i++) {
          const index = i+1;
          arr[i]['index']=index;
        }
        return arr;
      }
      state.blogList = groupBlogList(blogList,blogType);
      state.blogType = setTypeIndex(blogType);
      return { ...state, };
    },
    queryBlogList(state,action) {
        const data = action.payload;
        const blogList = data.blog;
        const blogType = state.blogType;
        // 分类博客
        function groupBlogList(list,type) {
            var arr=[];
            for(let i=0;i<type.length;i++) {
              var obj={};
              var tempArr=[];
              obj['type']=type[i].id;
              for(let j=0;j<list.length;j++) {
                if(list[j].type_id==obj.type) {
                  tempArr.push(list[j])
                }
              }
              obj['list']=tempArr;
              arr.push(obj);
            }
            return arr;
        }
        state.blogEditData.userId = storage.userId;
        state.blogEditData.userName = storage.nickName;
        state.blogEditData.blogState = "1";
        state.blogList = groupBlogList(blogList,blogType);
        return { ...state, };
    },
    queryDetailSuccess(state,action) {
      console.log(action.payload)
        // 1.初始化数据
        state.authorInfo={};
        state.blogINfo={};
        state.contentState=null;
        // 2.获取查询及处理后的数据
        const detaiData = action.payload;
        // 3.分类存储信息
        state.authorInfo=detaiData.authorInfo;
        state.blogINfo=detaiData.blogINfo;
        state.contentState = detaiData.blogContent.content;
        // 4.呈现内容
        state.showDetail = true;
        state.commentList = detaiData.commentData;
        state.starObj={star:detaiData.blogINfo.star,click:false};
        return { ...state};
    },
    queryCommentSuccess(state,action) {
      state.commentList = action.payload;
      return { ...state};
    },
    queryTypeSuccess(state,action) {
        const blogType = action.payload;
         // 赋予index值
        function setTypeIndex(arr) {
            for(let i=0;i<arr.length;i++) {
                const index = i+1;
                arr[i]['index']=index;
            }
            return arr;
        }
        state.blogType = setTypeIndex(blogType);
        // state.blogEditData.blogType = state.blogType[0].id;
        return { ...state, };
    },
    onEditBlog(state,action) {
      state.editorContent = action.payload;
      return { ...state }
    },
    onAutoContent(state,action) {
      if(state.editorContent!==null) {
        var obj = {};
        var editorObj = convertToRaw(state.editorContent.getCurrentContent());
        var editor = editorObj.blocks;
        for(let i=0;i<editor.length;i++) {
          if(editor[i].text!=="") {
            obj["text"]=editor[i].text;
            break;
          }
        }
        if(obj.text&&obj.text!=="") {
          state.blogEditData.subContent = obj.text;
        } else {
          message.error("你还没有在下面写入任何内容");
        }
            
      } else {
        message.error("你还没有在下面写入任何内容");
      }
      return { ...state }
    },
    onStarChange(state,action) {
      const obj = action.payload;
      state.blogINfo.star = obj.star;
      state.starObj.click = obj.click;
      return { ...state };
    },
    selectType(state,action) {
      state.blogEditData.blogType = action.payload;
      return { ...state };
    },
    titleChange(state,action) {
        state.blogEditData.blogTitle = action.payload;
        return { ...state };
    },
    subTitleChange(state,action) {
        state.blogEditData.subContent = action.payload;
        return { ...state };
    },
    onShowModal(state,action) {
      if(storage.isLogin) {
        state.user_id = storage.userId;
        state.commentVisible = true;
      } else {
        message.error("你还没有登录，请登录后评论!");
      }
      return { ...state };
    },
    onHideModal(state,action) {
      state.commentVisible = false;
      return { ...state };
    },
    showListLoading(state,action) {
      state.listLoading = true;
      return { ...state };
    },
    hideListLoading(state,action) {
      state.listLoading = false;
      return { ...state };
    },
    showDetailLoading(state,action) {
      state.detailLoading = true;
      return { ...state };
    },
    hideDetailLoading(state,action) {
      state.detailLoading = false;
      return { ...state };
    },
    showEditLoading(state,action) {
      state.editLoading = true;
      return { ...state };
    },
    hideEditLoading(state,action) {
      state.editLoading = false;
      return { ...state };
    },
    onHideDetail(state,action) {
      state.showDetail = false;
      return { ...state};
    },
    changeColor(state,action) {
      // console.log('action.payload------>',action.payload)
      var data = action.payload;
      var selectColor = state.selectColor;
      var alphaColor = state.alphaColor;
      const rgb = setSelectColor(data,selectColor);
      const alpha = getAlphaColr(data,alphaColor);
      const rgba = 'rgba('+rgb.r+','+rgb.g+','+rgb.b+','+alpha+')';
      // 存下选中的颜色
      function setSelectColor(data,selectColor) {
        var color = {};
        if(data.color) {
          color = data.color;
        } else {
          color = selectColor.rgb;
        }
        return color;
      }
      // 获取Alpha值
      function getAlphaColr(data,alphaColor) {
        var alpha = 1;
        if(data.alpha) {
          alpha = data.alpha
        } else {
          alpha = alphaColor.rgb.a
        }
        return alpha;
      }
      // 存下Alpha颜色
      function setAlphaColor(data,alphaColor) {
        var color = {};
        if(data.alphaColor) {
          color = data.alphaColor;
        } else {
          color = alphaColor.rgb;
        }
        return color;
      }
      state.alphaColor.rgb = setAlphaColor(data,alphaColor);
      state.selectColor.rgb = rgb;
      state.background=rgba;
      return {...state}
    }
  },

};
