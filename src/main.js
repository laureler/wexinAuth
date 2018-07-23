// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
// import '@/assets/lib-flexible/flexible.js'   //移动端屏幕适配
import 'lib-flexible/flexible.js'   //移动端屏幕适配
// import Home from './components/HelloWorld'
import router from './router/index.js'
import store from '@/store/index.js';
import axios from 'axios'
import VueAxios from 'vue-axios'
import {post,fetch,patch,put} from './utils/http'
import changeBottom from '@/directive/changeBottom.js'
import keepTowNum from '@/filter/keepTowNum.js'
import {GET_HOME_URL} from '@/constants/index.js'
import '@/assets/js/uiScript.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 原项目重写了elementUI的部分css样式
import '@/css/elem UI.css'

import jsonp from 'jsonp'
//引入 Vant
// import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

Vue.use(ElementUI);
Vue.use(VueAxios, axios,VueRouter)
// Vue.use(VueRouter)
Vue.directive('changeBottom',changeBottom)
Vue.filter('keepTowNum',keepTowNum)

FastClick.attach(document.body)

Vue.config.productionTip = false
new Vue({
  router,
  store,

  render: h => h(App)
}).$mount('#app-box')

Vue.prototype.$jsonp=jsonp;
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
//设置标题
// Vue.prototype.$fetch(GET_HOME_URL)
//   .then(res => {
//     document.title='在线选房('+res.Data.ActiveName+')';
//     sessionStorage.setItem('activeName',res.Data.ActiveName);
//   })
//返回目标元素在数组中的索引值



// tdo 重写array数组应当放在 util数据里面
Array.prototype.indexOf=function(el){
  for (var i=0,n=this.length; i<n; i++){
    if (this[i] === el){
       return i;
     }
  }
    return -1;
}
Array.prototype.swap=function(index1,index2){
  if(index1<index2 && index1 == this.length -1){
    return
  }else if(index1>index2 && index1==0){
    return
  }
  this[index1] = this.splice(index2, 1, this[index1])[0];
  return this;
}
