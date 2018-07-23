<template lang="html">
	<div style="display:flex;flex-direction:column">
		<page-head title="我的预约"></page-head>
		<div v-if="inited && items.length > 0" class="oppt-list">
			<el-row v-for="(item,index) in items" :key="item.id" class="oppt-item">
				<el-col :col="24">
					<el-card>
						<p slot="header" class="title">
							预约状态：
							<span class="bold">{{item.zt}}</span>
						</p>
						<div class="content">
							<!-- <div class="serType">
							  <p>业务类型：</p>
							  <el-select @change="type()" v-model="cerType" placeholder="点击选择..." class="sel">
								<el-option
								  v-for="item in options"
								  :key="item.value"
								  :label="item.label"
								  :value="item.label"
								  :disabled="item.disabled">
								</el-option>
							  </el-select>
							</div> -->
							<!-- <p class="text">预约ID：{{ item.id }}</p> -->
							<p class="text">业务类型：{{ item.cerType }}</p>
							<p class="text">预约人：{{ item.yyr }}</p>
							<p v-show="item.yyh" class="text">预约号：{{ item.yyh }}</p>
							<!-- <p v-show="item.zmh" class="text">证明(书)号：{{ item.zmh }}</p> -->
							<p class="text">证件号码：{{ item.zjhm }}</p>
							<p class="text">预约日期：{{ item.yyrq }}</p>
							<p class="text">预约时段：{{ item.yysd }}</p>
							<p class="text">预约事项：{{ item.yysx }}</p>
							<p class="text">所在网点：{{ item.szwd }}</p>
						</div>
						<div v-if=" item.zt == '未受理' ">
							<el-button :id="item.id" @click="cancel(index)"
							           style="float: right; padding: 0.225rem 0.3rem; margin : 0.3rem 0; font-size:0.3rem"
							           type="primary">取消预约
							</el-button>
						</div>
					</el-card>
				</el-col>
			</el-row>
			<el-card style="padding: 0.3rem" class="empty-box">
				<p class="content">
					提示：<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					{{text}}
					（
					<span class="bold">{{textTip}}</span>
					<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					{{text2}}
				</p>
			</el-card>
		</div>
		<div v-if="inited && items.length === 0" class="empty-box">
			<p class="title">未查到预约记录</p>
			<el-card>
				<p class="content">
					提示：<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					{{text}}
					（
					<span class="bold">{{textTip}}</span>
					<br>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					{{text2}}
				</p>
			</el-card>
		</div>
		<el-dialog
				title="提示"
				:visible.sync="dialogVisible"
				width="70%">
			<span>确定取消本次预约吗？</span>
			<span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="cancelSure()">确 定</el-button>
    </span>
		</el-dialog>
	</div>
</template>

<style lang="css" scoped>

	@import "../../css/elem UI.css";

	.serType {
		display: flex;
		align-items: center;
		font-size: 0.42rem;
	}

	.sel {
		width: 60%;
	}

	.el-button {
		font-size: 0.345rem;
	}

	.oppt-list {
		padding: 0 0.6rem 0.6rem;
	}

	.oppt-item {
		margin: 0.6rem 0;
	}

	.oppt-item .title {
		line-height: 1;
		font-size: 0.45rem;
	}

	.oppt-item .title .bold {
		color: #FA5555;
	}

	.oppt-item .content .text {
		margin-bottom: 0.075rem;
		font-size: 0.42rem;
	}

	.oppt-item .content .text:last-child {
		margin-bottom: 0;
	}

	.empty-box {
		padding: 0.6rem;
	}

	.empty-box .title {
		margin-bottom: 0.6rem;
		font-size: 0.54rem;
		text-align: center;
	}

	.empty-box .content {
		line-height: 1.6;
		font-size: 0.42rem;
	}

	.empty-box .content .bold {
		color: #FA5555;
	}

</style>

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
				inited: false,
				items: [],
				dialogVisible: false,
				value: '',
				personalSer: [],
				developerSer: [],
				cerType: '',
				options: [],
				text: '个人业务，请申请人在预约时段内，凭手机取号信息到办事大厅扫描预约二维码进行确认，并等待叫号',
				textTip: '扫码确认必须到现场，请勿提前扫码，过号不办理。必须前一天下午五点前才能取消第二天的预约，累计失约三次，将限制一个月内不能预约。',
				text2: '开发商业务，请代理人凭借预约信息直接到窗口办理。开发商业务15天之内限制同一家单位同一业务只能预约一次，请谨慎预约，如不能到达现场办理，请提前取消。',
			}
		},
		mounted() {
			this.requestQuery()
		},
		methods: {
			cancel(index) {
				const that = this
				that.dialogVisible = true
				that.value = index
			},
			cancelSure() {
				const that = this
        const openid = isWx() ? Cookies.get('openid') : ''
				const form = {
					yyr: that.items[that.value].yyr,
					yyh: that.items[that.value].yyh,
					/* qzhm : that.items[that.value].qzhm, */
					zjhm: that.items[that.value].zjhm,
					id: that.items[that.value].id,
          openid:openid
				}
				request({
					url: '/CancelYYInfoByID',
					data: { strJson: JSON.stringify(form) },
					success(response) {
						console.log(response)
						if (response.resultcode == 1 || response.resultcode == "1") {
							alert(response.resultmsg)
							that.requestQuery()
						} else {
							alert(response.resultmsg)
						}
					},
					fail(error) {
					},
				})
				that.dialogVisible = false
			},
			requestQuery() {
				const that = this
				const openid = isWx() ? Cookies.get('openid') : ''
				request({
					url: '/SearchYYInfoListByOpenId',
					data: { strJson: JSON.stringify({ openid }) },
					success(response) {
						console.log(response)
						if (response.resultcode == 1 || response.resultcode == "1") {
							that.items = []
							that.personalSer = []
							that.developerSer = []
							for (let i = 0; i < response.yyinfo.length; i++) {
								if (response.yyinfo[i].yyh) {
									that.personalSer.push({ ...response.yyinfo[i], cerType: '个人业务' })
								} else {
									that.developerSer.push({ ...response.yyinfo[i], cerType: '开发商业务' })
								}
							}
							that.items.push(...that.personalSer)
							that.items.push(...that.developerSer)
							console.log(that.items)
						}
						that.inited = true
					},
					fail(error) {
					},
				})
			},
			/* changeType() {
			  let that = this
			  if (that.personalSer.length > 0 && that.developerSer.length > 0) {
				that.items = that.personalSer
				that.cerType = "个人业务"
				that.options = [
				  { label: "个人业务" , disabled : false},
				  { label: "开发商业务", disabled : false }
				]
			  } else if(that.personalSer.length > 0 && that.developerSer.length == 0) {
				that.items = that.personalSer
				that.cerType = "个人业务"
				that.options = [
				  { label: "个人业务" , disabled : false},
				  { label: "开发商业务(无记录)", disabled : true }
				]
			  } else if(that.personalSer.length == 0 && that.developerSer.length > 0) {
				that.items = that.developerSer
				that.cerType = "开发商业务"
				that.options = [
				  { label: "个人业务(无记录)" , disabled : true},
				  { label: "开发商业务", disabled : false }
				]
			  }
			}, */
			/* type() {
			  let that = this
			  if(that.cerType == "个人业务") {
				that.items = that.personalSer
			  }
			  if(that.cerType == "开发商业务") {
				that.items = that.developerSer
			  }
			} */
		},
	}
</script>
