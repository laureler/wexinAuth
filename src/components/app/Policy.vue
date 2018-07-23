<template lang="html">
	<div>
		<page-head title="政务资讯"></page-head>
		<ul class="cul">
			<li class="cli" @click="open('gui',666,'通知公告')">
				<div class="ctitle">通知公告</div>
			</li>
			<li class="cli" @click="open('gui',666,'办事指南')">
				<div class="ctitle">办事指南</div>
			</li>
			<li class="cli" @click="open('gui',666,'政策法规')">
				<div class="ctitle">政策法规</div>
			</li>
		</ul>
	</div>
</template>

<style lang="css" scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.ctitle {
		color: #2C7DD0;
	}

	.cul {
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		margin-top: 0.45rem;
		margin-left: 0.3rem;
		margin-right: 0.3rem;
	}

	.cli {
		font-size: 0.375rem;
		border-top: 1px solid rgba(0, 0, 0, 0.2);
		padding: 0.3rem 0;
		list-style: none;
	}

</style>

<script>

	import Head from './head.vue'

	import { request } from '../../utils/http'

	export default {
		components: {
			'page-head': Head,
		},
		data() {
			return {}
		},
		methods: {
			open(path, status, status2) {
				this.$router.push({ name: path, params: { id: status }, query: { response: status2 } })
			},
		},
	}
</script>
