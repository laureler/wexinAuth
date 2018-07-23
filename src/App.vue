<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {

  },
}
</script>

<style lang="less">
html,body,#app{
  width: 100% ;
  height:100%;
  font-family: '微软雅黑';
}
h1,h2,h3,h4,h5,h6,p,input{
    margin: 0;
    padding: 0;
}
body {


}
#app{

}
.van-dialog{
      width:472px;
      height:254px;
      border-radius: 8px;
      padding:0 30px;
      .van-dialog__header{
          height:143px;
          padding:0;
          font-size: 30px;
          color:#333333;
          line-height: 160px;
          border-bottom:1px solid #e4e4e4;
      }
      .van-dialog__footer{
          height:48px;
          margin-top:32px;
          .van-button__text{
              color:#3a8bf2;
              font-size: 32px;
          }
      }

  }
@font-face {
  font-family: "iconfont";
  src: url('./assets/fonts/iconfont/iconfont.eot?t=1512530478410'); /* IE9*/
  src: url('./assets/fonts/iconfont/iconfont.eot?t=1512530478410#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
  url('./assets/fonts/iconfont/iconfont.ttf?t=1512530478410') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('./assets/fonts/iconfont/iconfont.svg?t=1512530478410#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size: 16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-paidui:before { content: "\e625"; }

.icon-zhengce:before { content: "\e633"; }

.icon-gonggao01:before { content: "\e894"; }

.icon-yuyue:before { content: "\e606"; }

.icon-chaxun:before { content: "\e64b"; }

.icon-quxiaoyuyue:before { content: "\e682"; }

.icon-jindu:before { content: "\e60a"; }

.icon-zhinanzhen:before { content: "\e7ea"; }

.icon-wodedangxuan:before { content: "\e72c"; }

.icon-quhao:before { content: "\e6ee"; }

p {
  margin: 0;
}
</style>
