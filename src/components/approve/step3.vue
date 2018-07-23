<template>
    <div class="step3">
        <div class="step3_background" v-show="!isSuccess">
            <p class="step3_result">
                认证不成功
            </p>
            <p class="step3_hint">
                请注意您的环境光线是否良好
            </p>
        </div>
        <div class="step3_btn_box" v-show="!isSuccess">
            <button class="step3_fail" @click="complete">暂不认证</button>
            <button class="step3_fail" @click="reApprove">重新认证</button>
        </div>
        <div :class="{step3_background:true,step3_background_success:isSuccess}" v-show="isSuccess">
            <p class="step3_result">
                认证成功
            </p>
            <p class="step3_hint">
                公安信息比对成功
            </p>
        </div>
        <div class="step3_btn_box" v-show="isSuccess">
            <button class="step3_success" @click="complete">完成认证</button>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isSuccess: false
            }
        },
        methods:{
            reApprove(){
                this.$store.commit('SET_STEP',1)
                this.$router.push({path:'/step2'})
            },
            complete(){
              if(this.$store.callbackUrl == undefined){
                //关闭当前浏览器页面
                wx.closeWindow();
              }else{
                //若没有验证成功
                if(isSuccess == false){
                  //关闭当前浏览器页面
                  wx.closeWindow();
                }
              }
            }
        },
        mounted(){
            this.isSuccess=this.$route.query.isSuccess

        }
    }
</script>

<style scoped lang="less">
.step3{
    .step3_background{
        position: relative;
        height:320/2px;
        background-color:#fff;
        background-image: url('../../../static/images/approve/icon_buchenggong@2x.png');
        background-repeat: no-repeat;
        background-size:116/2px 118/2px;
        background-position: center 40/2px;
        .step3_result{
            width:100%;
            height:36/2px;
            line-height: 36/2px;
            color:#338CFD;
            text-align: center;
            font-size: 36/2px;
            position: absolute;
            bottom:80/2px;
            font-weight: 550;
        }
        .step3_hint{
            width:100%;
            height:14/2px;
            line-height: 28/2px;
            color:#9a9a9a;
            text-align: center;
            font-size: 14/2px;
            position: absolute;
            bottom:40/2px;
        }
    }
    .step3_background_success{
         background-image: url('../../../static/images/approve/icon_chenggong@2x.png');
    }
    .step3_btn_box{
        position: absolute;
        bottom:40/2px;
        left:30/2px;
        width:690/2px;
        height:88/2px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .step3_fail{
            width:322/2px;
            height:88/2px;
            border:none;
            background: #338cfd;
            border-radius: 44/2px;
            font-size: 36/2px;
            color:#fff;

        }
        .step3_success{
            width:690/2px;
            height:88/2px;
            border:none;
            background: #338cfd;
            border-radius: 44/2px;
            font-size: 36/2px;
            color:#fff;
        }
        .step3_fail:nth-child(1){
            background: #e4e4e4;
        }
    }

}
</style>
