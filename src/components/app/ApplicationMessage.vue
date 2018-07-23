<template lang="html">
  <div style="display:flex;flex-direction:column">
    <page-head title="预约申请"></page-head>
    <div class="box-content">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>预约事项及预约时间</span>
        </div>
        <div class="content">
          <p class="text">办理网点：{{ item.szwd }}</p>
          <p class="text">预约事项：{{ item.yysx }}</p>
          <p class="text">预约日期：{{ item.yyrq }}</p>
          <p class="text">预约时段：{{ item.yysd }}</p>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>预约人信息</span>
        </div>
        <div class="content">
          <p class="text">预约人：{{ item.yyr }}</p>
          <p class="text">证件号码：{{ item.zjhm }}</p>
          <p class="text">手机号码：{{ item.sjhm }}</p>
        </div>
      </el-card>
      <el-button class="nextbut" @click="submit()" type="primary">提交</el-button>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="70%">
      <span>确定提交？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"  @click="submitSure()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="css" scoped>

@import "../../css/elem UI.css";

.el-button {
  font-size: 0.345rem;
}

.nextbut {
  width: 90%;
}

.box-content {
  padding: 0 0 0.3rem;
  text-align: center;
}

.clearfix {
  font-size: 0.45rem;
  color: #90CC4B;
}

.box-card {
  text-align: start;
  margin: 0 auto;
  width: 90%;
  margin-top: 0.45rem;
}

.box-card .contentTip {
  font-size: 0.375rem;
  line-height: 0.645rem;
}

.box-card .content .text {
  margin-bottom: 0.075rem;
  font-size: 0.375rem;
}

.box-card .contentTip span {
  color: red;
}
</style>

<script>
import Head from './head.vue';

import { request } from '../../utils/http';
import { isWx } from '../../utils/ua';

import Cookies from 'js-cookie';

export default {
	components: {
		'page-head': Head,
	},
	data() {
		return {
			item: {},
			dialogVisible: false,
		};
	},
	mounted() {
		console.log(this.$route.query.response);
		this.item = JSON.parse(this.$route.query.response);
	},
	methods: {
		submit() {
			const that = this;
			that.dialogVisible = true;
		},
		submitSure() {
			const that = this;
			let i;
			let value;
			const openid = isWx() ? Cookies.get('openid') : '';
			if (isWx()) {
				i = '2';
				value = Object.assign(that.item, { yyfs: i, openid });
			} else {
				i = '1';
				value = Object.assign(that.item, { yyfs: i, openid });
			}
			request({
				url: '/SubmitYYInfo',
				data: { strJson: JSON.stringify(value) },
				success(response) {
					console.log(value);
					console.log(response);
					if (response.resultcode == 1 || response.resultcode == "1") {
						that.$router.push({
							path: '/appr',
							query: { response: JSON.stringify(response.yyinfo), key: 1 },
						});
					} else {
						alert(response.resultmsg);
					}
				},
				fail(error) {},
			});
			that.dialogVisible = false;
		},
	},
};
</script>
