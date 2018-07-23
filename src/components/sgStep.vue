<template>
    <div class="sg_step">
        <div class="sg_step_num">
            <div :class="{sg_step_num_item:true,sg_step_num_complete:index<active,sg_step_num_now:index==active}" v-for="(i,index) in title" :key="index">
                <span v-if="index<active"></span>
                <span v-else>{{index+1}}</span>
                <p>{{i}}</p>
            </div>
        </div>
        <div class="sg_step_line">
            <div :class="{sg_step_line_item:true,sg_step_line_complete:index<active}" v-for="(i,index) in title.length-1" :key="index"></div>
        </div>

    </div>
</template>

<script>
    export default {
        props:{
            active:{
                type:Number,
                default:0
            },
            title:{
                type:Array

            }
        }
    }
</script>

<style scoped lang="less">
.sg_step{
    width:100%;
    height:100/2px;
    position:relative;
}
.sg_step_num{
    margin:0 auto;
    width:690/2px;
    height:100/2px;

    display:flex;
    flex-direction:row;
    justify-content:space-between;
    position:relative;
    z-index:2;
}
.sg_step_num_item{

    height:100/2px;
    position:relative;

}
.sg_step_num_item span{
    display:block;
    width:46/2px;
    height:46/2px;
    border-radius:100%;
    background:#e4e4e4;
    color:#fff;
    font-size:24/2px;
    text-align:center;
    line-height:46/2px;
    margin:0 auto;

}
.sg_step_num_now span{
    background:#338cfd;
}
.sg_step_num_complete span{
    background-image:url('../../static/images/approve/icon_yuan(lv)@2x.png');
    background-size:46/2px;
    background-repeat:no-repeat;
}
.sg_step_num_item p{
    height:24/2px;
    font-size:24/2px;
    line-height:24/2px;
    color:#333;

    margin-top:30/2px;
}
.sg_step_line{

    width:590/2px;
    display:flex;
    flex-direction:row;
    height:1/2px;
    position:absolute;
    left:80/2px;
    top:23/2px;
    z-index:1;
}
.sg_step_line_item{
    flex-grow:1;
    border-bottom:2/2px dashed #e4e4e4;
}
.sg_step_line_complete{
    border-color:#43a72c;
}

</style>
