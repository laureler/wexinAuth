<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="详情"></page-head>
		<h1 class="detail-title">{{title}}</h1>
		<p class="detail-time">{{time}}</p>
		<div class="detail-content" v-html="html"></div>
	</div>
</template>

<style lang="css">
	.detail-title {
		font-size: 0.6rem;
		text-align: center;
		margin-top: 0.375rem;
	}

	.detail-time {
		font-size: 0.375rem;
		text-align: center;
		margin-top: 0.375rem;
	}

	* {
		margin: 0;
		padding: 0;
	}

	.detail-content p {
		line-height: 1.5;
		font-size: 0.48rem;
		margin: 0.12rem 0px !important;
		word-wrap: break-word;
	}

	.detail-content p span {
		line-height: 1.5;
	}

	.detail-content img {
		font-size: 0.2em;
	}

	.detail-content table {
		table-layout: fixed;
	}

	.detail-content {
		padding: 0.3rem;
		overflow: hidden;
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
			return {
				title: '',
				time: '',
				html: '',
				bname: '',
			}
		},
		methods: {
			transform(html) {
				return html
					.replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
					.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>')
					.replace(/&quot;/g, '"')
					.replace(/&#39;/g, "\'")
					.replace(/&amp;/g, '&')
					.replace(/&nbsp;/g, ' ')
					.replace(/仿宋/g, '宋体')
					.replace(/width="\d+"/g, 'width="100%"')
					.replace(/font-size: \d+px/g, function(word) {
						const num = word.match(/\d+/)
						return `font-size: ${parseInt(num) * 0.32*1.5 / 16 * 0.8}`
					})
			},
		},
		mounted() {
			const that = this
			request({
				url: '/GetRuleDetail',
				data: { strJson: JSON.stringify({ gid: that.$route.query.response }) },
				success(response) {
					console.log(response)
					that.title = response.title
					that.time = response.createtime
					that.html = that.transform(response.content)
					that.bname = response.title
					console.log(that.html)
				},
				fail(error) {
				},
			})
		},
	}
</script>
