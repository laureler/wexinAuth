<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="办事指南"></page-head>
		<div class="cctext">
			<!--<li>一、预约人可以预约申请办理坐落于清远市。</li>-->
			<!--<li>二、预约前，预约人可登陆“广州市国土资源和规划委员会”网站，进入“国土资源业务导航”→“网上办事”→“不动产登记网办分窗”了解预约申请的登记业务应提交的申请资料和办理流程。 </li>-->
			<p class="rli">1、网上预约申请采用实名制。预约申请人为不动产产权人</p>
			<p class="rli">2、原则上河西业务预约在河西政务中心办理，河东业务预约在晚报点或德政园点办理。</p>
			<p class="rli">3、每个预约号只能申请办理一笔不动产登记业务，目前只接受个人预约。</p>
			<p class="rli">4、预约申请人须持本人有效证件，按照约定的日期时间段提前15分钟到达受理网点，凭现场叫号到指定窗口办理业务。</p>
			<p class="rli">5、预约成功后无法在预约时间前来办理的，请务必于预约前一天16:00前取消预约，取消的预约号源于每天17:00点再次放出。</p>
			<p class="rli">6、预约成功后未取消或超过预约办理时间未到场办理的，一个月内爽约两次的申请人自第二次爽约之日起一个月内将无法再申请网上预约。</p>
			<p class="rli">7、预约申请人须认真阅读网上预约的操作说明，准备好预约办理业务的要件材料，具体业务办理详情请查看办事指南，具体业务是否可以办理以受理窗口意见为准。</p>
			<p class="red rli">注：在填写预约信息时需要您填写产权证证号，证号一般在证书左上方，常见证号格式有：</p>
			<ul>
				<li class="red rli">湘（2017）清远市不动产权第0123456号 您只需要填写20170123456即可；</li>
				<li class="red rli">长房权证第708050000号 您只需要输入708050000即可；</li>
				<li class="red rli">长房权证暮字第710000000号 您需在产权证号前加入"C"，即输入C710000000即可；</li>
				<li class="red rli">望房权证雷字第70800000号 您需在产权证号前加入"W"，即输入W708000000即可；</li>
				<li class="red rli">如未能正常预约,请到不动产登记中心咨询台咨询或拨打咨询电话0731-84529100.</li>
			</ul>
		</div>
		<el-checkbox v-model="checked" @change="click" class="echeckbox">接受</el-checkbox>
		<el-button class="nextbut" @click="open" type="primary" :disabled="display">下一步</el-button>
		<div style="height: 0.3rem"></div>
	</div>
</template>

<style lang="css" scoped>

	@import "../../css/elem UI.css";

	.echeckbox {
		margin: 0;
		padding: 0.3rem 0.225rem;
		width: 100%;
		box-sizing: border-box;
	}

	.cctext {
		font-size: 0.375rem;
		border: 1px solid rgba(0, 0, 0, 0.2);
		margin-top: 0.3rem;
		margin-left: 0.225rem;
		margin-right: 0.225rem;
	}

	ul {
		margin: 0;
		padding: 0 0 0 0.6rem;
	}

	.nextbut {
		margin: 0 0.225rem;
	}

	.rli {
		padding: 0.15rem;
		line-height: 0.48rem;
	}

	.red {
		color: red;
	}
</style>

<script>
	import Head from './head.vue'

	export default {
		components: {
			'page-head': Head,
		},
		data() {
			return {
				checked: false,
				display: true,
			}
		},
		methods: {
			click() {
				if (this.checked) {
					this.display = false
				} else {
					this.display = true
				}
			},
			open() {
				this.$router.push('/appl')
			},
		},
	}
</script>
