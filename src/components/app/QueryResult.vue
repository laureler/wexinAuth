<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="查询结果"></page-head>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>预约人信息</span>
			</div>
			<div class="content">
				<p class="text">预约ID：{{ item.id }}</p>
				<p class="text">预约人：{{ item.yyr }}</p>
				<p class="text" v-if="item.yyh">预约号：{{ item.yyh }}</p>
				<p class="text">证件号码：{{ item.zjhm }}</p>
			</div>
		</el-card>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>预约事项及预约时间</span>
			</div>
			<div class="content">
				<p class="text">预约日期：{{ item.yyrq }}</p>
				<p class="text">预约时段：{{ item.yysd }}</p>
				<p class="text">预约事项：{{ item.yysx }}</p>
				<p class="text">所在网点：{{ item.szwd }}</p>
				<p class="text">网点地址：{{ item.wddz }}</p>
				<p class="text redColor">办理状态：{{ item.zt }}</p>
			</div>
		</el-card>
	</div>
	<!-- </div> -->
</template>

<style lang="css" scoped>

	@import "../../css/elem UI.css";

	.box-card {
		width: 90%;
		margin: 0 auto;
		margin-top: 0.45rem;
	}

	.box-card .content .text {
		margin-bottom: 0.075rem;
		font-size: 0.375rem;
	}

	.clearfix {
		font-size: 0.45rem;
		color: #90CC4B;
	}

	.takeText {
		text-align: center;
		font-size: 0.375rem;
		color: red;
		padding: 0.3rem 0;
		font-weight: bold;
	}

	.osubmit {
		width: 90%;
		margin: 0.45rem auto;
	}

	.redColor {
		color: red;
	}
</style>

<script>
	import Head from './head.vue'

	import { request } from '../../utils/http.js'

	export default {
		components: {
			'page-head': Head,
		},
		data() {
			return {
				item: {},
			}
		},
		mounted() {
			this.item = JSON.parse(this.$route.query.response)[0]
			console.log(this.$route.query.response)
		},
	}
</script>
