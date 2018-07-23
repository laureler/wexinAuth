<template>
    <div class="approve">
        <sg-step :title="title" :active="active" class="approve_step"></sg-step>
        <router-view></router-view>
        <!-- <button @click="next">下一步</button> -->



    </div>

</template>

<script>
import sgStep from '../sgStep'

    export default {
        components:{
            sgStep
        },
        data() {
            return {
                title:['上传身份证','实人检测','认证结果']
            }
        },
        computed:{
            active(){
                return this.$store.state.step;
            }
        }
    }


</script>

<style scoped lang="less">
.approve{
    width:100%;
    height:  calc(~'100% - 20px');

    padding-top:20px;
    background:#f3f3f3;
    .approve_step{
        margin-bottom:20px;
    }

}
</style>
