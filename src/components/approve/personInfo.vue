<template>
  <div>
    <page-head :title="title"></page-head>
    <div class="title">您的个人不动产信息查询结果如下</div>
    <div v-if="!isSuccess" class="title">{{resultmsg}}</div>
    <div v-else class="content">
      <table class="info" v-for="info in infos">
        <tbody>
        <tr>
          <td>权利人名称:</td>
          <td>{{info.qlrmc}}</td>
        </tr>
        <tr>
          <td>证件号码:</td>
          <td>{{info.zjhm}}</td>
        </tr>
        <tr>
          <td>坐落:</td>
          <td>{{info.zl}}</td>
        </tr>
        <tr>
          <td>不动产单元号:</td>
          <td>{{info.bdcdyh}}</td>
        </tr>
        <tr>
          <td>不动产权证号:</td>
          <td>{{info.cqzh}}</td>
        </tr>
        <tr>
          <td>面积:</td>
          <td>{{info.mj}}</td>
        </tr>
        <tr>
          <td>登记状态:</td>
          <td>{{info.fwzt}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import header from './../app/head'
  import { request } from '../../utils/http'
    export default {
      name: "person-info",
      data(){
        return{
          resultmsg:'',
          // 默认没有成功获取数据
          isSuccess:false,
          //存储返回 查询信息 数组
          infos:[],
          title:'查询信息'
        }
      },
      components:{'page-head':header},
      mounted(){
        console.log('enter personInfo:'+this.$store.state.cardCode+":"+this.$store.state.cardName)
        /*let param = {
          'qlr': this.$store.state.cardCode,
          'zjhm': this.$store.state.cardName
        };*/
        // todo 若store没有经过 commit cardCode 也就不会有这个属性值 在逻辑不确定的情况下，可能会出现空值的问题。
        // todo 在此改为参数了 但是name放在最后面 需要修改。
        let _this = this;
        let param = {
          'qlr': decodeURI(window.location.href.split('name=')[1]) || '',
          'zjhm': uiScript.getParam('id') || ''
        };
        request({
          url: '/GetPersonDataInfo',
          data: { strJson: JSON.stringify(param) },
          success(res) {
            if(res && res.cqxx){
              // cqxx 查询信息存在的时候
              if(res.cqxx.length > 0){
                _this.isSuccess = true;
                _this.infos = res.cqxx;
              }else{
                _this.isSuccess = false;
                _this.resultmsg = res.resultmsg;
              }
            }
          },
          fail(err) {
            console.log(err)
          },
        })
      }
    }
</script>

<style scoped>
  .title {
    text-align: center;
    font-size: 15px;
    padding: 2.5px;
    margin: 10px 0 15px 0;
  }

  .content {
    padding: 10px;
  }

  .info {
    font-size: 13px;
    margin-bottom: 15px;
    padding: 10px;
    display: block;
    border: 0.5px solid #dad7d7;
    border-radius: 2.5px;
    box-shadow: 0px 0px 5px #9e9d9d;
  }

  .info td {
    padding: 5px 0;
  }

  .info td:nth-child(1) {
    text-align: right;
    width: 90px;
  }

  .info td:nth-child(2) {
    padding-left: 10px
  }
</style>
