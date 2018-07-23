<template lang="html">
	<div style="display:flex; flex-direction:column">
		<page-head title="排队状态查询"></page-head>
		<div style="margin-top: 0.3rem">
			<div class="btn-box">
				<el-button type="primary" class="osubmit" @click="getProgressInfo">刷新排队状态</el-button>
			</div>
			<div v-if="wechat === 1" class="takestate">
				<p class="otext">
					我的号码：
					<span class="bold">{{myself}}</span>
					号
				</p>
			</div>
			<div v-if="success === 1" class="takestate">
				<p class="otext">
					正在受理号：
					<span class="bold">{{result}}</span>
					号
				</p>
			</div>
			<div v-if="nowechat === 1" class="takestate">
				<p class="otext">
					排队等候人数：
					<span class="bold">{{number-1}}</span>
					人
				</p>
			</div>
			<div v-if="wechat === 1" class="takestate">
				<p class="otext">
					排队等候人数：
					<span class="bold">{{number-1}}</span>
					人,
					在前面还有
					<span class="bold">{{wait}}</span>
					人,
					预计等待超过{{wait*5}}分钟
				</p>
			</div>
			<div v-if="success === 2" class="odiv-error">
				<p>{{ error }}</p>
			</div>
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
				success: 0,
				error: '',
				result: null,
				number: '',
				wait: '',
				myself: '',
				wechat: 0,
				nowechat: 0,
			}
		},
		beforeMount() {
			this.getProgressInfo()
		},
		methods: {
			getProgressInfo() {
				const that = this
				const openid = isWx() ? Cookies.get('openid') : ''
				request({
					url: '/GetAllNo',
					success(data) {
						console.log(data)
						if (data.resultcode == 1 || response.resultcode == "1") {
							that.success = 1
							that.result = data.noInfo[0].deal_no
							that.number = data.noInfo.length
							if (isWx()) {
								let flag = 0
								for (let i = 0; i < data.noInfo.length; i++) {
									if (openid == data.noInfo[i].openid) {
										flag = 1
										that.wait = i
										that.myself = data.noInfo[i].deal_no
										that.nowechat = 0
										that.wechat = 1
										break
									}
								}
								if (!flag) {
									that.wechat = 0
									that.nowechat = 1
								}
							} else {
								that.wechat = 0
								that.nowechat = 1
							}
						} else {
							that.success = 2
							that.error = data.resultmsg
						}
					},
					fail(error) {
						that.success = 2
						that.error = error.msg
					},
				})
			},
		},
	}
</script>

<style lang="css" scoped>

	@import "../../css/elem UI.css";

	.takestate {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.otext {
		padding: 0.3rem;
		font-size: 0.375rem;
		color: #000;
	}

	.otext .bold {
		color: red;
	}

	.btn-box {
		padding: 0.3rem;
	}

	.btn-box .osubmit {
		display: block;
		width: 100%;
	}

	.odiv-error {
		font-size: 0.375rem;
		padding: 0.3rem 0 0 0.3rem;
	}
</style>
