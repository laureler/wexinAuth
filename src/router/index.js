import Vue from 'vue'
import Router from 'vue-router'
import approve from '@/components/approve/approve'
import Home from '@/components/app/Home.vue';
import OnlineReservation from '@/components/app/OnlineReservation.vue';
import Application from '@/components/app/Application.vue';
import ApplicationResult from '@/components/app/ApplicationResult.vue';
import ScheduleQuery from '@/components/app/ScheduleQuery.vue';
import ReservationQuery from '@/components/app/ReservationQuery.vue';
import QueryResult from '@/components/app/QueryResult.vue';
import CancelReservation from '@/components/app/CancelReservation.vue';
import TakeNumber from '@/components/app/TakeNumber.vue';
import WechatTakeNumber from '@/components/app/WechatTakeNumber.vue';
import QueuingProgress from '@/components/app/QueuingProgress.vue';
import WechatQuerry from '@/components/app/WechatQuerry.vue';
import Guide from '@/components/app/Guide.vue';
import GuideDetail from '@/components/app/GuideDetail.vue';
import Policy from '@/components/app/Policy.vue';
import ApplicationMessage from '@/components/app/ApplicationMessage.vue';
import SpecialApplication from '@/components/app/SpecialApplication.vue';
import SpeApplMsg from '@/components/app/SpeApplMsg.vue';

Vue.use(Router)

const router = new Router({
  base:'pubWeb/public/weChatPublic',
  mode: 'history',
  routes: [
    /*{
      path: '*',
      redirect: '/'
    },*/
    {
      path: '/',
      component: Home,
    },
    {
      path: '',
      component: Home,
    },
    {
      path: '/index.html',
      component: Home,
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/onlr',
      component: OnlineReservation,
    },
    {
      path: '/appl',
      component: Application,
    },
    {
      path: '/appr',
      component: ApplicationResult,
    },
    {
      path: '/schq',
      component: ScheduleQuery,
    },
    {
      path: '/resq',
      component: ReservationQuery,
    },
    {
      path: '/quer',
      component: QueryResult,
    },
    {
      path: '/canr',
      component: CancelReservation,
    },
    {
      path: '/tnum',
      component: TakeNumber,
    },
    {
      path: '/wtnum',
      component: WechatTakeNumber,
    },
    {
      path: '/qupr',
      component: QueuingProgress,
    },
    {
      path: '/wecq',
      component: WechatQuerry,
    },
    {
      name: 'gui',
      path: '/gui',
      component: Guide,
    },
    {
      path: '/guid',
      name: 'guid',
      component: GuideDetail,
    },
    {
      path: '/poli',
      component: Policy,
    },
    {
      path: '/appm',
      component: ApplicationMessage,
    },
    {
      path: '/spea',
      component: SpecialApplication,
    },
    {
      path: '/samsg',
      component: SpeApplMsg,
    },
    // 准备开启验证
    {
      path: '/preApprove',
      name: '',
      component: resolve => require(['@/pages/home'], resolve)
    },
    // 人脸识别接口 /approve/strp1
    // 人脸识别接口 /approve/strp2
    // 人脸识别接口 /approve/strp3
    {
      path: '/approve',
      name: 'approve',
      component: resolve => require(['@/components/approve/approve'], resolve),
      children: [
        {
          path: '',
          name: 'step1',
          component: resolve => require(['@/components/approve/step1'], resolve)
        },
        {
          path: '/step2',
          name: 'step2',
          component: resolve => require(['@/components/approve/step2'], resolve)
        },
        {
          path: '/step3',
          name: 'step3',
          component: resolve => require(['@/components/approve/step3'], resolve)
        },

      ]
    },
    //个人信息查询
    {
      path: '/personInfo',
      name: 'personInfo',
      component: resolve => require(['@/components/approve/personInfo'], resolve)
    },
  ]
})

// 增加路由导航
router.afterEach(route => {
  Vue.nextTick(() => {
    if (typeof document === 'object') {
      document.documentElement.scrollTop = 10;
      document.body.scrollTop = 10;
      setTimeout(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }, 10);
    }
  });
});
export default router
