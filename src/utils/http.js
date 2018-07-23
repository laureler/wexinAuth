// var url='https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=3Q0dARwnDHr3PlsgBie7oIaY&client_secret=4p5UrwCncRlsDED6B9QK0iZN4tN7AxET&';
import axios from 'axios'
import moment from 'moment';
// cookie解析模块
import Cookies from 'js-cookie';
// todo useless
import VueAxios from 'vue-axios'
import {LOG_OUT} from '../constants/index.js'
// todo activeId做什么用？
let activeId = sessionStorage.getItem('activeId');
// todo base_URL 需要全部起作用
// 新增request请求
const REQUEST_TIMEOUT = 300000;
// const BASE_URL = 'http://192.168.10.91:8070/WSYY';
// const BASE_URL = 'http://192.168.10.29:8080/pubWeb/public/doIntranetRequest';
// const BASE_URL = 'http://172.16.42.85:8080/pubWeb/public/doIntranetRequest/';
// const BASE_URL = '/api/WSYY';
const BASE_URL = '/pubWeb/public/doIntranetRequest';
const HEADERS = {
  'X-Requested-With': 'XMLHttpRequest',
  'x-csrf-token': Cookies.get('csrfToken') || undefined,
};

export const request = (
  {
    method = 'post',
    baseURL = BASE_URL,
    timeout = REQUEST_TIMEOUT,
    headers,
    url,
    data,
    success,
    fail,
  }) => {
  const defaultParams = {
    _: moment().valueOf(),
  };
  const params = data ? {
    ...defaultParams,
    ...data,
  } : defaultParams;
  axios({
    method,
    url,
    params: method === 'get' ? params : undefined,
    data: method !== 'get' ? params : undefined,
    timeout,
    baseURL,
    headers: {
      ...HEADERS,
      ...headers,
    },
  })
    .then(response => {
      success && success(response.data);
    })
    .catch(error => {
      if (error.response) {
        if (error.response.data) {
          fail && fail({
            msg: error.response.data.msg,
            status: error.response.status,
            data: error.response.data,
          });
        } else {
          fail && fail({
            msg: error.message,
            status: error.response.status,
          });
        }
      } else {
        fail && fail({ msg: error.message });
      }
    });
};




















/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
        resolve(response.data);
     
    })
    .catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
          
              resolve(response.data);
            
          },err => {
            reject(err)
          })
   })
 }

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
          if(response.data.Status==-2){
            window.location.href = LOG_OUT + "?activeId=" + activeId;
          }else{
            resolve(response.data);
          }
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
          if(response.data.Status==-2){
            window.location.href = LOG_OUT + "?activeId=" + activeId;
          }else{
            resolve(response.data);
          }
         },err => {
           reject(err)
         })
  })
}

