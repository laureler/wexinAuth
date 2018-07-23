const BASE_URL ='http://120.79.131.45:8080' ;
// export const BASE_URL ='' ;
export const GET_HOUSE_URL=BASE_URL+'/api/House/getFormRoomList?activeId=2';   //获取房源列表
export const GET_HOME_URL = BASE_URL + '/api/House/getProjectInfo';	//获取首页项目信息
export const GET_COLLECT_LIST = BASE_URL + '/api/Collect/getCollectList';//获取收藏列表
export const SET_COLLECT_HOUSE = BASE_URL + '/api/Collect/setCollectHouse';//收藏和取消收藏
export const GET_NOBUY_COLLECT = BASE_URL + '/api/Collect/getNotBuyCollectList';//获取未购买收藏列表
export const GET_HOUSEINFO_URL = BASE_URL + '/api/House/getHouseDetail'; //获取房源详情
export const SET_COLLECT_UP_DOWN = BASE_URL + '/api/Collect/setCollectUpDowm'; //收藏上移下移
export const GET_USER_URL = BASE_URL + '/api/account/UserInfo'; //获取用户信息
export const POST_ORDER_SUBMIT = BASE_URL + '/api/Order/submitOrder'; //提交订单
export const GET_BUY_STATUS = BASE_URL + '/api/Order/QueryBuyStatus'; //是否购买
export const GET_ORDER_LIST = BASE_URL + '/api/Order/getOrderList'; //获取订单列表
export const GET_ORDER_DETAIL = BASE_URL + '/api/Order/getOrderDetail'; //获取订单详情
export const GET_ACTIVE_TIME = BASE_URL + '/api/House/getActiveDateTime'; //获取活动时间
export const GET_ACTIVE_STATS_INFO = BASE_URL + '/api/Stats/getActiveStatsInfo'; //活动分析
export const GET_USER_INFO_LIST = BASE_URL + '/api/Stats/getUserInfoList'; //客户分析列表
export const LOG_OUT = BASE_URL + '/Wechat/LogOut'; //退出

