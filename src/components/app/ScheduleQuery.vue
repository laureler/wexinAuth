<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="进度查询"></page-head>
		<div>
			<img src="../../../static/images/wechatstatic/bg_top1.png" style="width:100%"></img>
		</div>
		<el-checkbox class="Ocheckbox" v-model="checked" label="通过登记号" disabled></el-checkbox>
		<div class="Cdiv">
			<div class="reg">业务登记号：</div>
			<input placeholder="业务登记号" v-model="djbh" type="text" class="Cinput"/>
		</div>
		<el-button v-on:click="query" class="schequery" type="primary">查询</el-button>
		<div v-show="show" class="cContent">
			<div style="text-align:center;font-size:0.42rem;">查询结果</div>
			<div v-show="fail">{{resultmsg}}</div>
			<div v-show="success" class="container" v-for="result in results" :key="result.id">
				<div>收件编号：{{result.jid}}</div>
				<div>业务类型：{{result.jtitle}}</div>
				<div>房地坐落：{{result.ffdzl}}</div>
				<div class="redColor">业务状态：{{result.ywjd}}</div>
			</div>
		</div>
	</div>
</template>

<style lang="css" scoped>


	.schequery {
		margin: 0.3rem;
	}

	.reg {
		width: 30%
	}

	.Ocheckbox {
		padding: 0.3rem;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.cContent {
		font-size: 0.375rem;
		padding: 0.3rem;
	}

	.container {
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		margin-top: 0.15rem;
		font-size: 0.375rem;
		padding-top: 0.15rem;
		padding-left: 0.45rem;
		padding-bottom: 0.3rem;
	}

	.redColor {
		color: red
	}

	.Cdiv {
		padding: 0.3rem;
		display: flex;
		font-size: 0.375rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.Cinput {
		width: 65%;
		border: none;
		font-size: 0.375rem;
		outline: none;
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
				show: false,
				success: false,
				fail: false,
				results: [],
				djbh: '',
				checked: true,
				resultmsg: '',
			}
		},
		methods: {
			query() {
				const that = this
				request({
					url: '/GetYWJD',
					data: { strJson: JSON.stringify({ djbh: that.djbh }) },
					success(response) {
						console.log(response)
						if (response.resultcode == 1 || response.resultcode == "1") {
							that.show = true;
							that.success = true;
							that.results = response.ywjd
						} else {
							that.show = true;
							that.fail = true;
							that.resultmsg = '获取失败！'
						}
					},
					fail(error) {
					},
				})
			},
		},
	}
</script>
