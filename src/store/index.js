import Vue from 'vue'
import Vuex from 'vuex'
// import * as api from '../constants/index.js'
import * as types from './type'
// import * as http from '../utils/http.js'

Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    step:0,//认证步骤
    callbackUrl:'',
    cardCode:'',
    cardName:''
  },
  mutations: {
    [types.SET_STEP] (state,res) {

    	state.step =res
        // let tempJson = JSON.stringify(res);
        // window.sessionStorage.setItem('step', tempJson);

    },
    [types.CALLBACK_URL] (state,res) {
      state.callbackUrl =res
    },
    [types.CARD_CODE] (state,res) {
      state.cardCode =res
    },
    [types.CARD_NAME] (state,res) {
      state.cardName =res
    }

  }
})
