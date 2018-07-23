<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head :title="bname"></page-head>
		<ul class="cul">
			<li v-on:click="open(index)" class="cli" v-for="(item,index) in items">
				<div class="ctitle">{{item.title}}</div>
				<div>{{item.date}}</div>
			</li>
		</ul>
		<el-pagination
				v-if="items.length > 0"
				class="paging"
				background
				:current-page.sync="currentPage1"
				@current-change="handleCurrentChange"
				:page-size="pageSize"
				layout="prev, pager, next"
				:total="totalDataNumber">
		</el-pagination>
	</div>
</template>

<style lang="css" scoped>

	@import "../../css/elem UI.css";

	* {
		margin: 0;
		padding: 0;
	}

	.ctitle {
		color: #2C7DD0;
		width: 75%;
	}

	.cul {
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		margin-top: 0.45rem;
		margin-left: 0.3rem;
		margin-right: 0.3rem;
	}

	.cli {
		font-size: 0.375rem;
		display: flex;
		justify-content: space-between;
		border-top: 1px solid rgba(0, 0, 0, 0.2);
		padding: 0.3rem 0;
	}

	.paging {
		padding: 0.15rem;
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
			items: [],
			datas: [],
			bname: '',
			pageSize: 10,
			totalDataNumber: 0,
			currentPage1: 1,
		}
	},
	methods: {
		open(index) {
			this.$router.push({
				path: '/guid',
				query: { response: this.items[index].gid },
			})
		},
		loadData(pageNum, pageSize) {
			const that = this
			that.items = []
			for (let i = 0; i < that.datas.length; i++) {
				if (i >= (parseInt(pageNum) - 1) * pageSize && i < parseInt(pageNum) * parseInt(pageSize)) {
					that.items.push(that.datas[i])
				}
			}
		},
		handleCurrentChange(val) {
			const that = this
			that.currentPage1 = val
			that.loadData(val, that.pageSize)
			that.$store.commit('changeCurrent', {
				currentPage: val,
			})
		},
		record() {
			const that = this
			/* this.$store.commit(mutationTypes.GET_RECORD, {
				  datas : that.datas,
				  bname : that.bname,
				}) */
			that.$store.commit('changeState', {
				bname: that.bname,
				datas: that.datas,
			})
			that.$store.commit('changeCurrent', {
				currentPage: that.currentPage1,
			})
		},
	},
	mounted() {
		const that = this
		if (that.$store.state.bname == that.$route.query.response && that.$store.state.datas.length > 0 && !that.$route.params.id) {
			const num = that.$store.state.currentPage
			that.datas = that.$store.state.datas
			that.totalDataNumber = that.datas.length
			that.bname = that.$store.state.bname
			if (num) {
				that.currentPage1 = num
			}
			for (let i = 0; i < that.datas.length; i++) {
				if (i >= (that.currentPage1 - 1) * that.pageSize && i < that.currentPage1 * that.pageSize) {
					that.items.push(that.datas[i])
				}
			}
		} else {
			request({
				url: '/GetTitleList',
				data: { strJson: JSON.stringify({ bname: decodeURI(that.$route.query.response) }) },
				success(response) {
					console.log(response)
					for (let i = 0; i < response.noInfo.length; i++) {
						that.datas.push({
							title: response.noInfo[i].title,
							date: response.noInfo[i].createtime.slice(0, 10),
							gid: response.noInfo[i].gid,
						})
						if (i < that.pageSize) {
							that.items.push({
								title: response.noInfo[i].title,
								date: response.noInfo[i].createtime.slice(0, 10),
								gid: response.noInfo[i].gid,
							})
						}
					}
					that.bname = response.noInfo[0].bname
					that.totalDataNumber = that.datas.length
					that.record()
				},
				fail(error) {
				},
			})
		}
	},
}
</script>
