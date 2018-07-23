<template lang="html">
	<div class="head-box" :class="{ sticky: checkIOS }">
		<header class="head-box-inner" :class="{ sticky: checkIOS }">
			<div class="back-btn">
				<i class="el-icon-arrow-left" @click="goBack()"></i>
			</div>
			<div class="title">{{ title }}</div>
		</header>
		<div v-if="!checkIOS" class="empty-block"></div>
	</div>
</template>

<script>
	import { isIOS } from '../../utils/ua'

	export default {
		props: {
			title: {
				type: String,
				default: '',
			},
		},
		data() {
			return {
				checkIOS: false,
			}
		},
		mounted() {
			this.checkIOS = isIOS()
		},
		methods: {
			goBack() {
				this.$router.back()
			},
		},
	}
</script>

<style lang="css" scoped>
	.head-box {
		position: static;
		top: 0;
		left: 0;
		width: 100%;
		height: 1.2rem;
		z-index: 2001;
	}

	.head-box.sticky {
		position: -webkit-sticky;
		position: sticky;
	}

	.head-box-inner {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 1.2rem;
		background-color: #40BDFB;
		line-height: 1.2rem;
		font-size: 0.405rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.5);
		z-index: 2001;
	}

	.head-box-inner.sticky {
		position: relative;
	}

	.head-box-inner .back-btn {
		position: absolute;
		top: 0;
		left: 0;
		padding-left: 0.225rem;
		width: 0.3rem;
		height: 0.9rem;
		font-size: 0.6rem;
		z-index: 1;
	}

	.head-box-inner .back-btn .el-icon-arrow-left {
		color: #fff;
	}

	.head-box-inner .title {
		text-align: center;
		font-size: 0.54rem;
		color: #fff;
	}

	.empty-block {
		height: 1.2rem;
	}

</style>
