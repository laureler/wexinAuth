<template>
    <div class="step1" v-show="!isCheckBefore">
        <van-uploader :after-read="onReadFront" accept="image/*" class="approve_card_front" v-show="frontShow">
            <div class="card_front_content">
                <p>身份证正面（人像面）照片</p>
            </div>
        </van-uploader>
        <div id="frontShow" v-show="!frontShow">
            <span class="deleteImg" @click="deleteFront"></span>
            <!-- <img  :src="frontSrc" alt=""> -->
            <div class="show_img" :style="{backgroundImage:'url(\''+frontSrc+'\')'}"></div>
        </div>

        <van-uploader :after-read="onReadEnd" accept="image/*" class="approve_card_backend" v-show="backEndShow">
            <div class="card_backend_content">
                <p>身份证背面（国徽面）照片</p>
            </div>
        </van-uploader>
        <div id="backEndShow" v-show="!backEndShow">
            <span class="deleteImg" @click="deleteBackEnd"></span>
            <!-- <img  :src="backEndSrc" alt=""> -->
            <div class="show_img" :style="{backgroundImage:'url(\''+backEndSrc+'\')'}"></div>
        </div>
        <p class="step1_notice" v-show="isShow">
            请确认您的身份信息，如有误请重新上传
        </p>
        <van-cell-group v-show="isShow">
            <van-field
                v-model="username"
                label="姓名"
                disabled
            />
            <van-field
                v-model="cardCode"
                disabled
                label="证件号"
            />
        </van-cell-group>
        <button :class="{approve_next:true,approve_isNext:isShow}" :disabled="!isShow" @click="next">下一步</button>

        <div class="wait_tips" v-show="isRead">识别中，请稍后</div>
    </div>
</template>

<script>
import { Uploader ,Field  ,CellGroup } from 'vant';
import Vue from 'vue';
import Cookies from 'js-cookie'

Vue.use(Uploader).use(Field).use(CellGroup );
    export default {
        data() {
            return {
                frontShow: true,
                backEndShow: true,
                frontSrc:'',
                backEndSrc:'',
                username:'张三',
                cardCode:'422222123123122212',
                isRead:false,
                isShow:false,
                token:'',
                isCheckBefore:true
            }
        },
        methods:{
            onReadFront(file) {
                console.log(file)
                this.frontShow=false;
                this.isRead=true;
                this.frontSrc=file.content;
                // console.log(uiScript.compress(file.file))
                var _this=this;

                 // this.ImgToBase64(file.file, function (base64) {
                 //     var data= base64.split(',')[1];
                      let config = {headers: {'Content-Type': 'multipart/form-data'}};
                      let formData = new FormData();
                      formData.append('token', _this.token);
                      formData.append('idCardImg', file.file);
                      formData.append('idCardSide', 'front');

                     _this.$post('/pubWeb/public/faceRecognition/recognitionIdCard',formData, config).then(res=>{
                     // _this.$post('http://172.16.42.85:8080/pubWeb/public/faceRecognition/recognitionIdCard',formData, config).then(res=>{
                         console.log(res);
                         _this.isRead=false;
                         if(res.err_no == 0){
                           _this.username=res.cardName;
                           _this.cardCode=res.cardNo;
                         }else{

                         }
                     }).catch(err =>{
                         console.log(err)
                     })
                // })


            },
            onReadEnd(file) {
                  this.backEndShow=false;
                  this.backEndSrc=file.content;
                  var _this=this;
                  this.isRead=true;
                 // this.ImgToBase64(file.file, function (base64) {
                 //     var data= base64.split(',')[1];
                      let config = {headers: {'Content-Type': 'multipart/form-data'}};
                      let formData = new FormData();
                      formData.append('token', _this.token);
                      formData.append('idCardImg', file.file);
                      formData.append('idCardSide', 'back');

                     _this.$post('/pubWeb/public/faceRecognition/recognitionIdCard',formData, config).then(res=>{
                     // _this.$post('http://172.16.42.85:8080/pubWeb/public/faceRecognition/recognitionIdCard',formData, config).then(res=>{
                         console.log(res);
                         _this.isRead=false;
                         if(res.err_no == 0){
                           _this.isShow=true;
                         }else{
                         }
                     }).catch(err =>{
                         _this.isRead=false;
                         console.log(err)
                     })
                // })
            },
            deleteFront(){
                this.frontShow=true;
                this.frontSrc='';
                this.isShow = false;
                this.username='';
                this.cardCode='';
            },
            deleteBackEnd(){
                this.backEndShow=true;
                this.backEndSrc='';
                this.isShow = false;
            },
            next(){
                this.$store.commit('SET_STEP',1)
                this.$store.commit('CARD_CODE',this.cardCode);
                this.$store.commit('CARD_NAME',this.username);
                this.$router.push({path:'/step2'})
            },
            ImgToBase64(file,  callBack){
                  var img = new Image();
                    var reader = new FileReader();//读取客户端上的文件
                    reader.onload = function () {
                        var url = reader.result;//读取到的文件内容.这个属性只在读取操作完成之后才有效,并且数据的格式取决于读取操作是由哪个方法发起的.所以必须使用reader.onload，
                        img.src = url;//reader读取的文件内容是base64,利用这个url就能实现上传前预览图片
                    };
                    img.onload = function () {
                        //生成比例
                        var width = img.width, height = img.height;
                        //计算缩放比例

                        //生成canvas
                        var canvas = document.createElement("canvas");
                        var ctx = canvas.getContext("2d");
                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0,width, height);
                        var base64 = canvas.toDataURL('image/jpeg', 0.5);
                        callBack(base64);
                    };
                    reader.readAsDataURL(file);
            }


        },
        mounted(){
            this.token=sessionStorage.getItem('token');
          // 获取微信openId
          let openId = Cookies.get('openid');
          if(openId){ // 判断微信用户是否已认证，如果已认证直接进入到人脸识别过程
            this.$fetch('/pubWeb/public/faceRecognition/isUserHaveAuthenticated?openId='+openId).then(rs=>{
            // this.$fetch('http://172.16.55.136:8080/pubWeb/public/faceRecognition/isUserHaveAuthenticated?openId='+openId).then(rs=>{
              if(rs){
                this.next();
              }else{
                this.isCheckBefore = false;
              }
            })
          }
        }
    }
</script>

<style lang="less">
.step1{
     background:#f3f3f3;

 .approve_card_front{
        width:690/2px;
        height:340/2px;
        margin-left:30/2px;
        background: #fff;
        border-radius: 10/2px;
        .card_front_content{
            width:100%;
            height:100%;
            position: relative;
            background-image: url('../../../static/images/approve/icon_shangchuang@2x.png');
            background-repeat: no-repeat;
            background-size:106/2px;
            background-position: center 68/2px;
            p{
                height:26/2px;
                line-height: 26/2px;
                text-align: center;
                width:100%;
                position: absolute;
                bottom:60/2px;
            }
        }
    }
    .approve_card_backend{
        width:690/2px;
        height:340/2px;
        margin-top:20/2px;
        margin-left:30/2px;
        background: #fff;
        border-radius: 10/2px;
        .card_backend_content{
            width:100%;
            height:100%;
            background-image: url('../../../static/images/approve/icon_shangchuang@2x.png');
            background-repeat: no-repeat;
            background-size:106/2px;
            background-position: center 68/2px;
              p{
                height:26/2px;
                line-height: 26/2px;
                text-align: center;
                width:100%;
                position: absolute;
                bottom:60/2px;
            }
        }
    }
    #frontShow{
        width:690/2px;
        height:340/2px;
        margin-left:30/2px;
        background: #fff;
        border-radius: 10/2px;
        overflow: hidden;
        position: relative;


    }
    #backEndShow{
        width:690/2px;
        height:340/2px;
        margin-top:30/2px;
        margin-left:30/2px;
        background: #fff;
        border-radius: 10/2px;
        overflow: hidden;
        position: relative;

    }
    .show_img{
        width:100%;
        height:100%;
        background-size:cover;
        background-repeat: no-repeat;
    }
      .deleteImg{
            padding:24/2px;
            border-radius: 100%;
            position: absolute;
            background-image: url('../../../static/images/approve/icon_shandiao@2x.png');
            background-repeat: no-repeat;
            background-size:48/2px;
            right:18/2px;
            top:18/2px;
        }
    .approve_next{

        width:690/2px;
        height:88/2px;
        margin:40/2px 30/2px;
        border:none;
        background: #8bbeff;
        border-radius: 44/2px;
        font-size: 36/2px;
        color:#fff;
        font-weight: 550;
    }
    .approve_isNext{
        background: #338cfd;
    }
    .step1_notice{
        padding:0 30/2px;
        height:98/2px;
        line-height: 98/2px;
        font-size: 26/2px;
        text-indent:46/2px;
        background-image: url('../../../static/images/approve/icon_tisi@2x.png');
        background-repeat: no-repeat;
        background-size: 28/2px;
        background-position: 30/2px center;
        color:#9a9a9a;
    }
    .van-field{
        height:100/2px;
        padding:0 30/2px;
        .van-cell__title{
            width:92/2px;
            height:100/2px;
            line-height: 100/2px;
            span{
                display: block;
                text-align-last: justify;
                font-size: 30/2px;
                color:#333333;
            }
        }
        .van-cell__value{
            .van-field__control{
                height:100/2px;
                text-indent:30/2px;
                font-size: 30/2px;
                color:#565555;
            }

        }
    }
    .wait_tips{
        width:200/2px;
        height:200/2px;
        background: rgba(0,0,0,0.5);
        line-height: 200/2px;
        text-align: center;
        color:#fff;
        border-radius: 10/2px;
        position: fixed;
        top:50%;
        left:50%;
        transform: translate3d(-50%,-50%,0);
    }


}
</style>
