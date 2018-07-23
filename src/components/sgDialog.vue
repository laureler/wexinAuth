<template>
    <div class="sg_dialog_shade" v-show="value">
        <div class="sg_dialog">
            <div class="sg_dialog_title">
                <slot name="title">
                    <p>{{title}}</p> 
                </slot>
            </div>
            <div class="sg_dialog_content">
                <slot name="content">
                    
                </slot>
            </div>
            <div class="sg_dialog_btn">
                 <button class="sg_dialog_btn_item" @click.stop="cancel">{{cancelText}}</button>
                 <button :class="{sg_dialog_btn_item:true,sg_dialog_btn_item_check:!isCheck}" @click.stop="confirm" :disabled="!isCheck">{{okeyText}}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // isShow: true
            }
        },
        props:{
            value: Boolean,
            title:String,
            content:String,
            okeyText:{
                type:String,
                default:'确认'
            },
            cancelText:{
                type:String,
                default:'取消'
            },
            isCheck:Boolean
            // isShow:Boolean
           

        },
        value(val) {
            // this[val ? 'open' : 'close']();
            console.log(val)
        },
        methods:{
            
            cancel(){
               
               
                console.log('点击取消');
                this.$emit('cancel');
                this.$emit('close',false);
            },
            confirm(){
                this.$emit('close',false);
                this.$emit('confirm')
                console.log('点击确认')
                
            },
            closeDialog(){
                 this.$emit('close',false);
            }
          
        },
        mounted(){
            
        }
    }
</script>

<style scoped>
.sg_dialog_shade{
    width:100%;
    height:100%;
    position:absolute;
    background:rgba(0,0,0,0.3);
    top:0;
    left:0;
}
.sg_dialog{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate3D(-50%,-50%,0);
    width:470px;
    padding:35px 30px 30px 30px;
    background:#fff;
    border-radius:8px;
}
.sg_dialog_title{
    border-bottom:1px solid #e4e4e4;
    padding-bottom:36px;
}
.sg_dialog_title p{
    height:40px;
    line-height:40px;
    font-size:32px;
    color:#333;
    text-align:center;
}
.sg_dialog_btn{
    height:48px;
    margin-top:30px;
    display:flex;
    flex-direction: row;
}
.sg_dialog_btn_item{
    flex-grow: 1;
    width:0;
    text-align:center;
    line-height:48px;
    color:#3A8BF2;
    font-size:32px;
    box-sizing:border-box;
    border:none;
    background:#fff;
   
}
.sg_dialog_btn_item:nth-child(1){
    border-right:1px solid #e4e4e4;
    color:#9a9a9a;
}
.sg_dialog_btn_item_check{
    color:#8bbeff;
}
</style>