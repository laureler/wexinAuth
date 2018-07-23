<template lang="html">
	<div style="display:flex; flex-direction:column">
		<page-head title="排队取号"></page-head>
		<div>
			<img src="../../../static/images/wechatstatic/bg_top1.png" style="width:100%"></img>
		</div>
		<div style="margin-top:0.3rem;font-size:0.375rem">
			<div class="take" flex="dir:left box:last">
				<p class="otips">请填写有效身份证点击取号</p>
			</div>
			<div class="take cdiv">
				<label class="olabel">
					<b style="color: #d7342e; font-size:0.3rem">*</b> 身份证号:
				</label>
				<input v-model="form.sfzh" placeholder="身份证号" type="text" class="takeinput"/>
			</div>
		</div>
		<el-button @click="submit" type="primary" class="osubmit" :disabled="success">取号</el-button>
		<p v-show="showTip == 2" class="take-tip">您可以输入身份证进行普通取号!</p>
		<div v-show="success" class="result">
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
				showTip: 1,
				result: '',
				form: {
					sfzh: '',
				},
			}
		},
		methods: {
			submit() {
				const that = this
				const openid = isWx() ? Cookies.get('openid') : ''
				if (that.form.sfzh !== '') {
					if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(that.form.sfzh))) {
						this.$message('身份证格式不正确！')
					} else {
						that.form = { ...that.form, wxh: openid }
						that.$nextTick(() => {
							that.pushForm(that.form)
						})
					}
				} else {
					this.$message('请输入身份证号码')
				}
			},
			pushForm(params) {
				const that = this
				request({
					url: '/SubmitQHInfo',
					data: { strJson: JSON.stringify(params) },
					success(data) {
						console.log(data)
						if (data.resultcode == 1 || data.resultcode == "1") {
							that.showTip = 1
							that.success = true
							that.result = data.noInfo[0].deal_no
						} else {
							if (data.resultmsg == '身份证格式不正确!') {
								that.$message(data.resultmsg)
							} else {
								that.showTip = 1
								that.success = true
								that.result = data.resultmsg
							}

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
		mounted() {
			this.showTip = this.$route.query.response
		},
	}
</script>

<style lang="css" scoped>

	@import "../../css/elem UI.css";

	.olabel {
		font-size: 0.375rem;
		width: 30%;
	}

	.take {
		padding: 0 0.3rem;
		height: 1.2rem;
		line-height: 1.2rem;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.cdiv {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.takeinput {
		border: none;
		outline: none;
		font-size: 0.375rem;
		width: 69%;
		margin-left: 0.15rem;
	}

	.otips {
		line-height: 1.2rem;
		font-size: 0.375rem;
		color: red;
	}

	.osubmit {
		margin: 0.3rem 0.3rem 0;
	}

	.schedule {
		width: 100%;
	}

	.result {
		margin: 0.3rem 0.3rem 0;
		font-size: 0.375rem;
		text-align: center;
		line-height: 0.6rem;
	}

	.take-tip {
		margin: 0.45rem 0.45rem 0;
		font-size: 0.375rem;
		text-align: center;
		line-height: 0.6rem;
		font-weight: 600;
	}

	.cresult {
		color: red;
	}

</style>
