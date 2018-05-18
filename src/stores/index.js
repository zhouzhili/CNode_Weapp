/**
 * Created by ZZl.
 * DateTime: 2018/5/18 9:38
 * Description：
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let userInfo=wx.getStorageSync('userInfo')||'';
let token=wx.getStorageSync('accessToken')||'';

const store =new Vuex.Store({
  state:{
    token,
    userInfo
  },
  mutations:{
    setToken(state,payload){
      state.token=payload.token;
    },
    setUserInfo(state,payload){
      state.userInfo=payload.userInfo;
    }
  },
  actions:{
    setTokenAsync({commit},payload){
      commit({
        type:'setToken',
        token:payload.token
      });
      wx.setStorage({key:'accessToken',data:payload.token});
    },
    setUserInfoAsync({commit},payload){
      commit({
        type:'setUserInfo',
        userInfo:payload.userInfo
      });
      wx.setStorage({key:'userInfo',data:payload.userInfo});
    }
  }
});

export default store;
