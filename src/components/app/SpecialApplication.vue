<template lang="html">
	<div class="box-body">
		<page-head title="开发商预约申请"></page-head>
		<div id="titleContent" class="boxContent">
			<div class="oborder">
				<div class="otitle"><p class="titlep">预约事项及预约时间</p></div>
				<div class="content">
					<div class="box">
						<div id="select1" class="cinput cinput-color">
							<b>*</b>办理网点
						</div>
						<el-select v-model="sel1" placeholder="点击选择..." @change="select1" class="sel">
							<el-option
									v-for="item in oselect1"
									:key="item.value"
									:label="item.szwdinfo[0].szwd"
									:value="item.szwdinfo[0].szwd">
							</el-option>
						</el-select>
					</div>
					<div class="box" @click="remind(2)">
						<div id="select2" class="cinput cinput-color">
							<b>*</b>预约事项
						</div>
						<el-select v-model="sel2" placeholder="点击选择..." :disabled="selShow1" @change="select2"
						           class="sel">
							<el-option
									v-for="item in oselect2"
									:key="item.value"
									:label="item"
									:value="item">
							</el-option>
						</el-select>
					</div>
					<div class="box" @click="remind(3)">
						<div id="select3" class="cinput cinput-color">
							<b>*</b>预约日期
						</div>
						<el-select v-model="sel3" placeholder="点击选择..." :disabled="selShow2" @change="select3"
						           class="sel">
							<el-option
									v-for="item in oselect3"
									:key="item.value"
									:label="item"
									:value="item">
							</el-option>
						</el-select>
					</div>
					<div class="box" @click="remind(4)">
						<div id="select4" class="cinput cinput-color">
							<b>*</b>预约时段
						</div>
						<el-select v-model="sel4" placeholder="点击选择..." :disabled="selShow3" @change="select4"
						           class="sel">
							<el-option
									v-for="item in oselect4"
									:key="item.value"
									:label="item.YYSD"
									:value="item.YYSD"
									:disabled="item.disabled">
							</el-option>
						</el-select>
					</div>
				</div>
			</div>
			<div class="oborder">
				<div class="otitle"><p class="titlep">预约人信息</p></div>
				<div class="content">
					<div class="box">
						<div class="cinput"><b>*</b>代理人名称</div>
						<input id="name" @blur="changeColor('name')" class="date" v-model="name" type="text"
						       placeholder="代理人名称"/>
					</div>
					<div class="box">
						<div class="cinput"><b>*</b>代理人证件种类</div>
						<el-select v-model="cerType" placeholder="点击选择..." class="sel">
							<el-option
									v-for="item in options"
									:key="item.value"
									:label="item.label"
									:value="item.label"
									:disabled="item.disabled">
							</el-option>
						</el-select>
					</div>
					<div class="box">
						<div class="cinput"><b>*</b>代理人证件号码</div>
						<input id="cerNumber" @blur="changeColor('cerNumber')"
						       oninput="this.value=this.value.replace(/[^0-9a-zA-Z]/g,'');" class="date"
						       v-model="cerNumber" type="tel" placeholder="代理人证件号码"/>
					</div>
					<div class="box">
						<div class="cinput"><b>*</b>手机号码</div>
						<input id="phoNumber" maxlength="11" @blur="changeColor('phoNumber')"
						       oninput="this.value=this.value.replace(/[^\d]/g,'');" class="date" v-model="phoNumber"
						       type="tel" placeholder="手机号码"/>
					</div>
					<div class="cbox">
						<b class="b-color">*</b>
						<div style="width : 33%">组织机构代码或营业执照</div>
						<input id="orginational" @blur="changeColor('orginational')" class="date" v-model="orginational"
						       type="text" placeholder="组织机构代码或营业执照"/>
					</div>
				</div>
			</div>
			<div class="tip">
				<p class="cp">提示：您现在预约的是开发商业务，单个业务15天之内限制只能预约一次，请谨慎操作。</p>
			</div>
			<div class="cbut submit-box">
				<el-button v-on:click="check" class="Cbutton" type="primary">确认</el-button>
			</div>
		</div>
	</div>
</template>

<style lang="css" scoped>

	@import "../../css/elem UI.css";

	.tip {
		border: 1px solid rgba(0, 0, 0, 0.2);
		margin-top: 0.45rem;
		font-weight: normal;
	}

	.cp {
		padding: 0.15rem;
		line-height: 0.6rem;
		color: #FF9041;
	}

	.Cbutton {
		margin: 0.3rem 0px;
	}

	.cbut {
		text-align: center;
	}

	.cinput {
		width: 35%;
	}

	.cinput-color {
		color: #d7342e;
	}

	.cinput b {
		color: #d7342e;
		font-size: 0.3rem
	}

	.b-color {
		color: #d7342e;
		font-size: 0.3rem
	}

	.sel {
		width: 64.5%;
	}

	.box {
		display: flex;
		height: 0.9rem;
		line-height: 0.9rem;
		margin-top: 0.225rem;
	}

	.cbox {
		display: flex;
		height: 0.9rem;
		margin-top: 0.225rem;
		font-size: 0.33rem;
	}

	.content {
		margin-left: 0.15rem;
		margin-top: 0.15rem;
		margin-right: 0.15rem;
		padding: 0.15rem 0.15rem 0.3rem;
	}

	.otitle {
		border-bottom: 1px solid rgba(0, 0, 0, 0.3);
		background-color: #F1F1F1;
		height: 0.975rem;
		line-height: 0.975rem;
		padding-left: 0.225rem;
	}

	.oborder {
		border: 1px solid rgba(0, 0, 0, 0.3);
		margin-top: 0.45rem;
	}

	.date {
		outline: none;
		border: 1px solid rgba(0, 0, 0, 0.2);
		width: 60%;
		padding-left: 0.3rem;
		font-size: 0.375rem;
		border-radius: 0;
		-webkit-appearance: none;
	}

	.boxContent {
		margin-left: 0.3rem;
		margin-right: 0.3rem;
		font-size: 0.375rem;
		font-weight: bold;
	}

	.box-body {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.submit-box {
		padding: 0.3rem 0;
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
				oselect: [],
				oselect1: [],
				oselect2: [],
				oselect3: [],
				oselect4: [],
				cerType: '',
				sel1: '',
				sel2: '',
				sel3: '',
				sel4: '',
				selShow1: true,
				selShow2: true,
				selShow3: true,
				name: '',
				cerNumber: '',
				phoNumber: '',
				orginational: '',
				options: [
					{ label: '身份证' },
					{ label: '港澳台身份证' },
					{ label: '护照' },
					{ label: '户口簿' },
					{ label: '军官证（士兵证）' },
				],
			}
		},
		methods: {
			remind(a) {
				if (this.sel1 == '') {
					this.$message('请先选择办理网点')
				} else if (this.sel2 == '' && a > 2) {
					this.$message('请先选择预约事项')
				} else if (this.sel3 == '' && a > 3) {
					this.$message('请先选择预约日期')
				}
			},
			changeColor(id) {
				const oid = document.getElementById(id)
				const prev = oid.previousElementSibling || oid.previousSibling
				const oprev = oid.parentNode.previousElementSibling || oid.parentNode.previousSibling
				if (id == 'certificate') {
					if (oid.value == '') {
						oprev.style.color = '#d7342e'
					} else {
						oprev.style.color = '#4ECD5D'
					}
				} else {
					if (oid.value == '') {
						prev.style.color = '#d7342e'
					} else {
						prev.style.color = '#4ECD5D'
					}
				}
			},
			select1() {
				document.getElementById('select1').style.color = '#4ECD5D';
				document.getElementById('select2').style.color = '#d7342e';
				document.getElementById('select3').style.color = '#d7342e';
				document.getElementById('select4').style.color = '#d7342e';
				const that = this;
				request({
					url: '/GetTSYYRQSD',
					success(response) {
						console.log(response)
						that.oselect = response.yyxxinfo;
						const arr = [];
						that.oselect2 = [];
						that.sel2 = '';
						that.sel3 = '';
						that.sel4 = '';
						for (let i = 0; i < response.yyxxinfo.length; i++) {
							arr.push(response.yyxxinfo[i].YYSX)
						}
						that.oselect2 = Array.from(new Set(arr))
						that.selShow1 = false;
					},
					fail(error) {
					},
				})
			},
			select2() {
				document.getElementById('select2').style.color = '#4ECD5D';
				document.getElementById('select3').value = '';
				document.getElementById('select3').style.color = '#d7342e';
				document.getElementById('select4').style.color = '#d7342e';
				const that = this;
				const arr = [];
				that.oselect3 = [];
				that.sel3 = '';
				that.sel4 = '';
				for (const value of that.oselect) {
					if (value.YYSX.includes(that.sel2)) {
						arr.push(value.YYRQ)
					}
				}
				that.oselect3 = Array.from(new Set(arr))
				that.selShow2 = false;
			},
			select3() {
				document.getElementById('select3').style.color = '#4ECD5D';
				document.getElementById('select4').style.color = '#d7342e';
				const that = this;
				request({
					url: '/GetTSYYRQSD',
					success(response) {
						that.oselect4 = [];
						that.sel4 = '';
						for (const value of response.yyxxinfo) {
							if (value.YYSX.includes(that.sel2) && value.YYRQ.includes(that.sel3)) {
								console.log(value)
								const remark = value.SFYY == true ? '（已被预约）' : '';
								that.oselect4.push({
									YYSD: `${value.YYSD}${remark}`,
									disabled: value.SFYY,
								})
							}
						}
						/* let result = response.yysdinfo
						for(let i = 0; i < result.length; i++) {
						  let count = result[i].zhs - result[i].yyys;
						  let disableAtrr = count == 0 ? true : false;
						  let remark = count == 0 ? "（已约满）" : "（剩" + count + "个）";
						  that.oselect4.push({
							'yysd': `${result[i].yysd} ${remark}`,
							'value': result[i].yysd,
							'disabled': disableAtrr
						  })
						} */
						that.selShow3 = false;
					},
					fail(error) {
					},
				})
			},
			select4() {
				document.getElementById('select4').style.color = '#4ECD5D';
			},
			resq() {
				const that = this;
				const openid = isWx() ? Cookies.get('openid') : ''
				const param = {
					szwd: that.sel1,
					yysx: that.sel2,
					yyrq: that.sel3,
					yysd: that.sel4,
					yyr: that.name,
					zjlx: that.cerType,
					zjhm: that.cerNumber,
					sjhm: that.phoNumber,
					dwzjjgdm: that.orginational,
					zmh: '',
					yyfs: 2,
					openid,
				}
				request({
					url: '/CheckYYRInfo',
					data: { strJson: JSON.stringify(param) },
					success(response) {
						console.log(response)
						if (response.resultcode == 1 || response.resultcode == "1") {
							that.$router.push({
								path: '/samsg',
								query: { response: JSON.stringify(param) },
							})
						} else {
							alert(response.resultmsg)
						}
					},
					fail(error) {
					},
				})
			},
			check() {
				if (this.name !== '' && this.cerNumber !== '' && this.phoNumber !== '' && this.orginational !== '' && this.sel1 != '' && this.sel2 != '' && this.sel3 != '' && this.sel4 != '') {
					if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.phoNumber))) {
						this.$message('手机号码格式不正确！')
					} else if (this.cerType == '身份证') {
						if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/.test(this.cerNumber))) {
							this.$message('身份证格式不正确！')
						} else {
							this.resq()
						}
					} else if (this.cerType == '护照') {
						if (!(/^[a-zA-Z0-9]{3,21}$/.test(this.cerNumber)) || !(/^(P\d{7})|(G\d{8})$/.test(this.cerNumber))) {
							this.$message('护照号码格式不正确！')
						} else {
							this.resq()
						}
					} else if (this.cerType == '港澳台身份证') {
						const taiwanreg = /^[A-Z][0-9]{9}$/;
						const xianggangreg = /^[A-Z][0-9]{6}\([0-9A]\)$/;
						const aomenreg = /^[157][0-9]{6}\([0-9]\)$/;
						// (/^[a-zA-Z0-9]{5,21}$/.test(this.cerNumber))
						if (!(taiwanreg.test(this.cerNumber))) {
							this.$message('港澳台身份证号码格式不正确！')
						} else if (!(xianggangreg.test(this.cerNumber))) {
							this.$message('港澳台身份证号码格式不正确！')
						} else if (!(aomenreg.test(this.cerNumber))) {
							this.$message('港澳台身份证号码格式不正确！');
						} else {
							this.resq()
						}
					} else if (this.cerType == '户口簿') {
						if (!(/^[a-zA-Z0-9]{3,21}$/.test(this.cerNumber))) {
							this.$message('户口簿号码格式不正确！')
						} else {
							this.resq()
						}
					}
				} else {
					this.$message('请完善个人信息！')
				}
			},
		},
		mounted() {
			const that = this
			request({
				url: '/GetYYBSWD',
				success(response) {
					that.oselect1.push(response)
				},
				fail(error) {
				},
			})
		},
	}
</script>
