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
              content:resp.data
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
            message:'获取数据失败',
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
function getTopic(params) {
  return xhr('/topics','get',params);
}

//获取主题详细内容
function getTopicDetail(id) {
  return xhr(`/topic/${id}`,'get')
}

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

export default {
  getTopic,
  getTopicDetail,
  login
}



