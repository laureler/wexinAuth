<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="取消预约"></page-head>
		<div>
			<img src="../../../static/images/wechatstatic/bg_top1.png" style="width:100%"></img>
		</div>
		<div style="margin-top:0.3rem;font-size:0.39rem">
			<div class="odiv">
				<label class="olabel">
					<b>*</b> 预约人:
				</label>
				<input v-model="form.yyr" placeholder="预约人" type="text" class="oinput"/>
			</div>
			<div class="odiv">
				<label class="olabel">
					<b>*</b> 证件号:
				</label>
				<input v-model="form.zjhm" placeholder="证件号" type="text" class="oinput"/>
			</div>
			<div class="odiv">
				<label class="olabel">
					<b>*</b> 预约ID:
				</label>
				<input v-model="form.yyid" placeholder="预约ID" type="text" class="oinput"/>
			</div>
			<div class="odiv" style="border-bottom:1px solid rgba(0,0,0,0.1);">
				<label class="olabel">
					<b>*</b> 预约号:
				</label>
				<input v-model="form.yyh" placeholder="预约号" type="text" class="oinput"/>
			</div>
		</div>
		<el-button @click="yes" style="margin-top:0.3rem;margin-left:0.225rem;margin-right:0.225rem" type="primary">查询
		</el-button>
		<div v-show="show" style="margin-top:0.45rem;font-size:0.375rem">
			<div style="margin-left:0.45rem;margin-top:0.3rem">{{result}}</div>
		</div>
	</div>
</template>

<style lang="css" scoped>

	@import "../../css/elem UI.css";

	.olabel {
		margin-left: 0.3rem;
		width: 21%;
	}

	.olabel b {
		color: #d7342e
	}

	.odiv {
		height: 1.05rem;
		line-height: 1.05rem;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.oinput {
		width: 79%;
		border: none;
		outline: none;
		font-size: 0.39rem
	}
</style>

<script>
	import Head from './head.vue'

	import { request } from '../../utils/http.js'
  import { isWx } from '../../utils/ua'

	export default {
		components: {
			'page-head': Head,
		},
		data() {
			return {
				show: false,
				result: '',
				form: {
					yyr: '',
					zjhm: '',
					qzhm: '',
					yyh: '',
					id: '',
				},
			}
		},
		methods: {
			yes() {
				const that = this
				if (that.form.yyr !== '' && that.form.zjhm !== '' && that.form.yyid !== '' && that.form.yyh !== '') {
          const openid = isWx() ? Cookies.get('openid') : ''
          that.form = { ...that.form, wxh: openid }
					request({
						url: '/CancelYYInfoByID',
						data: { strJson: JSON.stringify(that.form) },
						success(response) {
							console.log(response)
							if (response.resultcode == 1 || response.resultcode == "1") {
								alert(response.resultmsg)
							} else {
								that.result = response.resultmsg
							}
							that.show = true
						},
						fail(error) {
						},
					})
				} else {
					this.$message('请完善所有信息！')
				}
			},
		},
	}
</script>
