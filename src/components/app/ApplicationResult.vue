<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="预约成功"></page-head>
		<div class="box-content">
			<el-card class="box-card">
				<div v-if="key == 1" class="contentTip">
					您已预约成功！<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请于
					<span>{{ item.YYRQ  }}</span>
					在
					<span>{{ item.YYSD }}</span>
					到达
					<span>{{ item.WDDZ }}</span>
					办理&nbsp;&nbsp;<span>{{ item.YYSX }}</span>&nbsp;&nbsp;业务,过期作废。
					请申请人在预约时段内，凭手机取号信息到办事大厅扫描预约二维码进行确认，并等待叫号（
					<span>扫码确认必须到现场，请勿提前扫码，过号不办理</span>
					）
				</div>
				<div v-if="key == 2" class="contentTip">
					您已预约成功！<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请于
					<span>{{ item.YYRQ  }}</span>
					在
					<span>{{ item.YYSD }}</span>
					到达
					<span>{{ item.WDDZ }}</span>
					办理&nbsp;&nbsp;<span>{{ item.YYSX }}</span>&nbsp;&nbsp;业务,过期作废。
					请申请人在预约时段内，凭手机预约信息或者预约纪录直接去窗口办理。
				</div>
			</el-card>
		</div>
	</div>
</template>

<style lang="css" scoped>

	@import "../../css/elem UI.css";

	.box-content {
		padding: 0 0 0.3rem;
	}

	.box-card {
		width: 90%;
		margin: 0 auto;
		margin-top: 0.45rem;
	}

	.box-card .contentTip {
		font-size: 0.375rem;
		line-height: 0.645rem;
	}

	.box-card .contentTip span {
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
				key: '',
			}
		},
		mounted() {
			this.item = JSON.parse(this.$route.query.response)[0];
			this.key = this.$route.query.key;
		},
	}
</script>
