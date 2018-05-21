/**
 * Created by ZZl.
 * DateTime: 2018/5/15 17:26
 * Description：
 */
import Fly from 'flyio/dist/npm/wx'

const fly=new Fly;
fly.config={
  baseURL:' https://cnodejs.org/api/v1',
  timeout:5000
};

fly.interceptors.response.use(
  (response)=>{
    return response.data;
},(error)=>{
    return Promise.resolve(error)
  });

function xhr(url,method,params) {
  return new Promise((resolve,reject)=>{
    fly[method](url,params)
      .then(resp=>{
        if(resp.success){
          if(method==='get'){
            resolve({
              success:true,
              message:'获取数据成功',
              content:resp.data||resp
            });
          }else if(method==='post'){
            resolve({
              success:true,
              message:'获取数据成功',
              content:resp
            });
          }
        }else {
          resolve({
            success:false,
            message:resp.response.data||'获取数据失败',
            content:[]
          });
        }
      }).catch(error=>{
      resolve({
        success:false,
        message:'获取数据失败'+error,
        content:[]
      });
    })
  })
}

//主题首页
async function getTopic(params) {
  //job接口返回数据太多会报错？？
  let data=await xhr('/topics','get',params);
  if(data.success){
    let result=data.content.map((val,key,array)=>{
      let newVal=val;
      newVal.content=val.content.slice(0,60);
      return newVal;
    });
    return{
      success:true,
      message:'获取数据成功',
      content:result
    }
  }else {
    return{
      success:false,
      message:'获取数据失败',
      content:[]
    }
  }
}

//获取主题详细内容
function getTopicDetail(id) {
  return xhr(`/topic/${id}`,'get')
}

//用户登录
async function login(token) {
  let resp={
    success:false,
    content:{},
    message:''
  };
  try{
    let tokenInfo=await xhr('/accesstoken','post',{accesstoken:token});
    if(tokenInfo.success){
      return await xhr(`/user/${tokenInfo.content.loginname}`,'get');
    }else {
      return resp;
    }
  }catch (err){
    resp.message=err;
    return resp
  }
}

//获取用户详细情况
function getUserDetail(userName){
  return xhr(`/user/${userName}`,'get');
}

//获取用户收藏
function getUserCollect(userName){
  return xhr(`/topic_collect/${userName}`,'get');
}

//发表新帖
function postNewTopics(params) {
  return xhr('/topics','post',params);
}

//全部已读
function markAll(token) {
  return xhr('/message/mark_all','post',{accesstoken:token});
}


//获取已读和未读消息
function getMsg(token) {
  return xhr('/messages','get',{accesstoken:token});
}
export default {
  getTopic,
  getTopicDetail,
  login,
  getUserDetail,
  getUserCollect,
  postNewTopics,
  markAll,
  getMsg
}



