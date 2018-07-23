<template lang="html">
	<div v-if="inited" style="display:flex; flex-direction:column; padding: 0 0 0.45rem; align-items: center;">
		<page-head title="排队取号"></page-head>
		<div style="font-size:0.45rem">
			<img src="../../../static/images/wechatstatic/bg_top1.png" style="width:100%"></img>
		</div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>预约人信息</span>
			</div>
			<div class="content">
				<p class="text">预约人：{{ item.yyr }}</p>
				<p class="text">预约号：{{ item.yyh }}</p>
				<!-- <p class="text" v-if="item.zmh">证明(书)号：{{ item.zmh }}</p> -->
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
				<p class="text">办理状态：{{ item.zt }}</p>
			</div>
		</el-card>
		<div class="takeText" v-if="byTouch">
			您必须到现场扫描二维码取号！
		</div>
		<div class="timeoutText" v-if="timeout">
			{{timeout_text}}
		</div>
		<el-button @click="pushForm" type="primary" class="osubmit" v-if="byURL" :disabled="success">取号</el-button>
		<div v-if="success" class="result">
			<p>取号结果</p>
			<p class="cresult">{{ result }}</p>
			<el-button @click="toSche" type="primary" class="schedule">查看进度</el-button>
		</div>
	</div>
</template>

<script>
	import Head from './head.vue'

	import { request } from '../../utils/http'
	import { isWx } from '../../utils/ua'

	import Cookies from 'js-cookie'

	export default {
		components: {
			'page-head': Head,
		},
		data() {
			return {
				success: false,
				inited: false,
				item: '',
				byTouch: false,
				byURL: false,
				timeout: false,
				timeout_text: '',
				openid: '',
				result: '',
			}
		},
		mounted() {
			this.searchAppointment();
		},
		methods: {
			searchAppointment() {
				const that = this
				that.openid = isWx() ? Cookies.get('openid') : ''
				if (isWx()) {
					request({
						url: '/SearchYYInfoByOpenId',
						data: { strJson: JSON.stringify({ openid: that.openid }) },
						success(data) {
							console.log(data)
							if (data.resultcode == 1 || data.resultcode == "1") {
								that.inited = true
								that.item = data.yyinfo[0]
								if (that.$route.query.wechatNumber == '123456789') {
									that.byTouch = false
									that.byURL = true
								} else {
									that.byURL = false
									that.byTouch = true
								}
							} else if (data.resultcode == 2 || data.resultcode == "2") {
								for (let i = 0; i < data.yyinfo.length; i++) {
									if (data.yyinfo[i].yyh) {
										console.log(data.yyinfo[i])
										that.item = data.yyinfo[i]
										that.timeout_text = data.resultmsg
										that.inited = true
										that.timeout = true
									}
								}
								/* that.$alert(data.resultmsg, '提示', {
								  confirmButtonText: '确定',
								});
								that.$router.replace({path : '/tnum', query : {response : 2}}) */
							} else {
								that.$router.replace({ path: '/tnum', query: { response: 1 } })
							}
						},
						fail(error) {
						},
					})
				} else {
					that.$router.replace('/tnum')
				}
			},
			pushForm() {
				const that = this
				request({
					url: '/SubmitQHInfo',
					data: { strJson: JSON.stringify({ wxh: that.openid, sfzh: '' }) },
					success(data) {
						console.log(data)
						if (data.resultcode == 1 || data.resultcode == "1") {
							that.success = true
							that.result = data.noInfo[0].deal_no
						} else {
							that.success = true
							that.result = data.resultmsg
						}
					},
					fail(error) {
					},
				})
			},
			toSche() {
				const that = this
				that.$router.push({
					path: '/qupr',
				})
			},
		},
	}
</script>

<style lang="css" scoped>

	@import "../../css/elem UI.css";

	.box-card {
		width: 90%;
		margin: 0 auto;
		margin-top: 0.15rem;
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

	.timeoutText {
		width: 84%;
		font-size: 0.375rem;
		color: red;
		padding: 0.3rem 0;
		font-weight: bold;
		line-height: 0.525rem;
	}

	.osubmit {
		width: 90%;
		margin: 0.3rem auto 0;
	}

	.result {
		font-size: 0.375rem;
		text-align: center;
		padding-bottom: 1.5rem;
		line-height: 0.75rem;
	}

	.cresult {
		color: red;
	}

	.schedule {
		width: 90%;
	}
</style>
