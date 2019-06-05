import request from '@/utils/request'
// 添加规则
export function list(data) {
  return request({
    url: '/temp/manage/device/list',
    method: 'post',
    data
  })
}

// 添加规则
export function detail(deviceNo) {
  return request({
    url: `/temp/manage/device/detail/${deviceNo}`,
    method: 'post',
  })
}

// 设备运营信息
export function operationMsg(deviceNo) {
  return request({
    url: `/temp/manage/device/operationMsg/${deviceNo}`,
    method: 'post',
  })
}

// 设备订单列表
export function orderList(deviceNo,data) {
  return request({
    url: `/temp/manage/device/orderList/${deviceNo}`,
    method: 'post',
    data
  })
}

// 设备运行日志
export function runLog(deviceNo,data) {
  return request({
    url: `/temp/manage/device/runLog/${deviceNo}`,
    method: 'post',
    data
  })
}
// 查询运行商列表
export function lists(data) {
  return request({
    url: '/temp/manage/org/list',
    method: 'post',
    data
  })
}

// 查询型号列表
export function deviceModelAbility(data) {
  return request({
    url: '/temp/manage/deviceModelAbility/list',
    method: 'post',
    data
  })
}

// 查询型号列表
export function invest(data) {
  return request({
    url: '/temp/manage/invest/list',
    method: 'post',
    data
  })
}

// 查询场地配置信息列表
export function ground(data) {
  return request({
    url: '/temp/manage/ground/list',
    method: 'post',
    data
  })
}

// 查询场地详细信息
export function getGroundInfoDetail(data) {
  return request({
    url: `/temp/manage/ground/getGroundInfoDetail/${data}`,
    method: 'post',
  })
}

// 批量禁用场地
export function disableGround(data) {
  return request({
    url: `/temp/manage/ground/disableGround`,
    method: 'post',
    data
  })
}

// 批量启用场地
export function enableGround(data) {
  return request({
    url: `/temp/manage/ground/enableGround`,
    method: 'post',
    data
  })
}

// 查询场地内的设备信息
export function queryGroundDeviceList(groundId) {
  return request({
    url: `/temp/manage/ground/queryGroundDeviceList/${groundId}`,
    method: 'post',
  })
}

//查询可分配设备列表
export function queryFreeDevice(groundId) {
  return request({
    url: `/temp/manage/ground/queryFreeDevice/${groundId}`,
    method: 'get',
  })
}

//添加场地配置信息
export function add(data) {
  return request({
    url: '/temp/manage/ground/add',
    method: 'post',
    data
  })
}

//获取用户信息列表
export function getRegisterUserList(data) {
  return request({
    url: '/temp/manage/user/getRegisterUserList',
    method: 'post',
    data
  })
}

//web端增加客户注册账号
export function webAddUser(data) {
  return request({
    url: '/temp/manage/user/webAddUser',
    method: 'post',
    data
  })
}

//删除场地配置信息
export function delet(data) {
  return request({
    url: '/temp/manage/ground/delete',
    method: 'post',
    data
  })
}

//场地增加设备
export function addDevice(data) {
  return request({
    url: '/temp/manage/ground/addDevice',
    method: 'post',
    data
  })
}

//修改场地位置信息
export function updataGroundMaps(data) {
  return request({
    url: '/temp/manage/ground/updataGroundMaps',
    method: 'post',
    data
  })
}

//查询投资项的设备列表
export function queryInvestDeviceList(data) {
  return request({
    url: `/temp/manage/invest/queryInvestDeviceList/${data}`,
    method: 'post',
  })
}

//投资信息移出设备
export function removeDevice(data) {
  return request({
    url: '/temp/manage/invest/removeDevice',
    method: 'post',
    data
  })
}

//投资信息增加设备
export function inAddDevice(data) {
  return request({
    url: '/temp/manage/invest/addDevice',
    method: 'post',
    data
  })
}

//添加投资配置信息
export function invests(data) {
  return request({
    url: '/temp/manage/invest/add',
    method: 'post',
    data
  })
}

//删除投资配置信息

export function indelete(data) {
  return request({
    url: '/temp/manage/invest/delete',
    method: 'post',
    data
  })
}

//查询运营商配置信息列表
export function orgList(data) {
  return request({
    url: '/temp/manage/org/list',
    method: 'post',
    data
  })
}

//查询可分配设备列表 
export function inQueryFreeDevice(investId) {
  return request({
    url: `/temp/manage/invest/queryFreeDevice/${investId}`,
    method: 'get',
  })
}

//修改设备主配置信息 
export function edit(data) {
  return request({
    url: '/temp/manage/invest/edit',
    method: 'post',
    data
  })
}

//查询投资详细信息
export function getInvestInfoDetail(data) {
  return request({
    url: `/temp/manage/invest/getInvestInfoDetail/${data}`,
    method: 'post',
    data
  })
}

//添加运营商配置信息
export function orgadd(data) {
  return request({
    url: '/temp/manage/org/add',
    method: 'post',
    data
  })
}


//删除运营商配置信息
export function orgdeletes(data) {
  return request({
    url: '/temp/manage/org/delete',
    method: 'post',
    data
  })
}

//修改运营商配置信息
export function orgedit(data) {
  return request({
    url: '/temp/manage/org/edit',
    method: 'post',
    data
  })
}


//添加设备配置信息
export function adddeve(data) {
  return request({
    url: '/temp/manage/device/add',
    method: 'post',
    data
  })
}

//上传设备配置信息
export function addList(data) {
  return request({
    url: '/temp/manage/device/addList',
    method: 'post',
    data
  })
}

//删除设备配置信息
export function devicedel(data) {
  return request({
    url: '/temp/manage/device/delete',
    method: 'post',
    data
  })
}

//查询单个设备详细信息
export function details(data) {
  return request({
    url: `/temp/manage/device/detail/${data}`,
    method: 'post',
  })
}

//场地移出设备
export function grRemoveDevice(data) {
  return request({
    url: `/temp/manage/ground/removeDevice`,
    method: 'post',
    data
  })
}

//修改场地配置信息
export function groundEdit(data) {
  return request({
    url: '/temp/manage/ground/edit',
    method: 'post',
    data
  })
}

//修改设备配置信息
export function deviceEdit(data) {
  return request({
    url: `/temp/manage/device/edit`,
    method: 'post',
    data
  })
}

//查询设备型号配置信息列表
export function deviceModelList(data) {
  return request({
    url: `/temp/manage/deviceModel/list`,
    method: 'post',
    data
  })
}

//添加设备型号配置信息
export function deviceModel(data) {
  return request({
    url: `/temp/manage/deviceModel/add`,
    method: 'post',
    data
  })
}

//删除设备型号配置信息
export function deletes(data) {
  return request({
    url: `/temp/manage/deviceModel/delete`,
    method: 'post',
    data
  })
}

//查询产品规则配置信息列表
export function productRule(data) {
  return request({
    url: `/temp/manage/productRule/list`,
    method: 'post',
    data
  })
}

//删除产品规则配置信息
export function prdelete(data) {
  return request({
    url: `/temp/manage/productRule/delete`,
    method: 'post',
    data
  })
}

// //删除产品规则配置信息
// export function forbit(data) {
//   return request({
//     url: `/temp/manage/productRule/forbit`,
//     method: 'post',
//     data
//   })
// }

//批量禁用
export function forbit(data) {
  return request({
    url: `/temp/manage/productRule/forbit`,
    method: 'post',
    data
  })
}

//批量启用
export function restart(data) {
  return request({
    url: `/temp/manage/productRule/restart`,
    method: 'post',
    data
  })
}

//添加产品规则配置信息
export function addProductRule(data) {
  return request({
    url: `/temp/manage/productRule/add`,
    method: 'post',
    data
  })
}

//修改产品规则配置信息
export function editProductRule(data) {
  return request({
    url: `/temp/manage/productRule/edit`,
    method: 'post',
    data
  })
}

//在线购买设备订单列表
export function buyDevice(data) {
  return request({
    url: `/temp/manage/buyDevice/list`,
    method: 'post',
    data
  })
}

//场地主申请列表
export function queryList(data) {
  return request({
    url: `/temp/manage/groundApply/queryList`,
    method: 'post',
    data
  })
}

//场地主申请通过
export function pass(data) {
  return request({
    url: `/temp/manage/groundApply/pass`,
    method: 'post',
    data
  })
}

//场地主申请拒绝
export function refuse(data) {
  return request({
    url: `/temp/manage/groundApply/refuse`,
    method: 'post',
    data
  })
}

//总监申请列表
export function partnerApplyList(data) {
  return request({
    url: `/temp/manage/partnerApply/queryList`,
    method: 'post',
    data
  })
}

//总监申请通过
export function partnerApplyPass(data) {
  return request({
    url: `/temp/manage/partnerApply/pass`,
    method: 'post',
    data
  })
}

//总监申请拒绝
export function partnerApplyRefuse(data) {
  return request({
    url: `/temp/manage/partnerApply/refuse`,
    method: 'post',
    data
  })
}

//设备主申请列表
export function investApplyList(data) {
  return request({
    url: `/temp/manage/investApply/queryList`,
    method: 'post',
    data
  })
}

//批量启用设备主
export function enableInvest(data) {
  return request({
    url: `/temp/manage/invest/enableInvest`,
    method: 'post',
    data
  })
}

//设备主详情
export function getInvestInfoDetails(investId) {
  return request({
    url: `/temp/manage/invest/getInvestInfoDetail/${investId}`,
    method: 'post',
  })
}

//批量禁用设备主
export function disableInvest(data) {
  return request({
    url: `/temp/manage/invest/disableInvest`,
    method: 'post',
    data
  })
}

//设备主申请通过
export function investApplyPass(data) {
  return request({
    url: `/temp/manage/investApply/pass`,
    method: 'post',
    data
  })
}

//设备主申请拒绝
export function investApplyRefuse(data) {
  return request({
    url: `/temp/manage/investApply/refuse`,
    method: 'post',
    data
  })
}

//查询总监列表
export function partnerList(data) {
  return request({
    url: `/temp/manage/partner/list`,
    method: 'post',
    data
  })
}

//添加总监
export function addPartner(data) {
  return request({
    url: `/temp/manage/partner/add`,
    method: 'post',
    data
  })
}

//修改总监
export function editPartner(data) {
  return request({
    url: `/temp/manage/partner/edit`,
    method: 'post',
    data
  })
}


//删除总监
export function removePartner(data) {
  return request({
    url: `/temp/manage/partner/remove`,
    method: 'post',
    data
  })
}

//推荐人列表
export function referrer(data) {
  return request({
    url: `/temp/manage/referrer/list`,
    method: 'post',
    data
  })
}

//推荐人详情
export function referrerDetail(data) {
  return request({
    url: `/temp/manage/referrer/detail`,
    method: 'post',
    data
  })
}


//设备型号修改
export function deviceModelEdit(data) {
  return request({
    url: `/temp/manage/deviceModel/edit`,
    method: 'post',
    data
  })
}



//型号定价
export function setPrice(data) {
  return request({
    url: `/temp/manage/deviceModel/setPrice`,
    method: 'post',
    data
  })
}

//提现申请订单列表
export function withdrawList(data) {
  return request({
    url: `/temp/manage/withdraw/list`,
    method: 'post',
    data
  })
}

//提现申请订单列表
export function withdrawMark(data) {
  return request({
    url: `/temp/manage/withdraw/mark`,
    method: 'post',
    data
  })
}

//分润流水列表
export function profitList(data) {
  return request({
    url: `/temp/manage/txnInfo/profitList`,
    method: 'post',
    data
  })
}

//分润流水列表
export function reSplit(data) {
  return request({
    url: `/temp/manage/order/reSplit/${data}`,
    method: 'post'
  })
}

//查询订单列表
export function orderLists(data) {
  return request({
    url: `/temp/manage/order/list`,
    method: 'post',
    data
  })
}

//获取角色列表
export function getRoleList() {
  return request({
    url: `/temp/manage/role/getRoleList`,
    method: 'get'
  })
}

//获取页面权限列表
export function getWebPermissionList() {
  return request({
    url: `/temp/manage/role/getWebPermissionList`,
    method: 'get'
  })
}

//获取页面功能权限
export function getBackendPermissionList() {
  return request({
    url: `/temp/manage/role/getBackendPermissionList`,
    method: 'get'
  })
}


//获取页面功能权限
export function addRole(data) {
  return request({
    url: `/temp/manage/role/addRole`,
    method: 'post',
    data
  })
}

//获取页面功能权限
export function getRoleInfo(data) {
  return request({
    url: `/temp/manage/role/getRoleInfo/${data}`,
    method: 'post'
  })
}

//更新用户
export function editRole(data) {
  return request({
    url: `/temp/manage/role/editRole`,
    method: 'post',
    data
  })
}

//获取用户所属的角色列表
// export function getUserRoles(registerNo) {
//   return request({
//     url: `/temp/manage/role/getUserRoles/${registerNo}`,
//     method: 'post'
//   })
// }

//获取用户所属的角色列表
export function editUserInfo(data) {
  return request({
    url: `/temp/manage/user/editUserInfo`,
    method: 'post',
    data
  })
}

//获取微信用户列表
export function customeraccount(data) {
  return request({
    url: `/temp/manage/customeraccount/list`,
    method: 'post',
    data
  })
}

//获取用户信息
export function getRegisterUserInfo(data) {
  return request({
    url: `/temp/manage/user/getRegisterUserInfo`,
    method: 'post',
    data
  })
}

//getWxLoginKey
export function getWxLoginKey(data) {
  return request({
    url: `/temp/manage/user/getWxLoginKey`,
    method: 'get'
  })
}


// 用户设备信息统计
export function userDeviceMsg(data) {
  return request({
    url: `/temp/manage/dash/userDeviceMsg`,
    method: 'post',
    data
  })
}


// 应收分润统计
export function cushMsg(data) {
  return request({
    url: `/temp/manage/dash/cushMsg`,
    method: 'post',
    data
  })
}

// 设备分布地图
export function deviceLocationGraph(data) {
  return request({
    url: `/temp/manage/dash/deviceLocationGraph`,
    method: 'post',
    data
  })
}

//营收曲线
export function revenueGraph(data) {
  return request({
    url: `/temp/manage/dash/revenueGraph`,
    method: 'post',
    data
  })
}

//销售曲线
export function sellGraph(data) {
  return request({
    url: `/temp/manage/dash/sellGraph`,
    method: 'post',
    data
  })
}

//用户增加曲线
export function userCountGraph(data) {
  return request({
    url: `/temp/manage/dash/userCountGraph`,
    method: 'post',
    data
  })
}

//查询基础参数配置信息列表
export function baseParam(data) {
  return request({
    url: `/temp/manage/baseParam/list`,
    method: 'post',
    data
  })
}

//修改基础参数配置信息
export function baseParamEdit(data) {
  return request({
    url: `/temp/manage/baseParam/edit`,
    method: 'post',
    data
  })
}

//删除空角色
export function deleteRole(data) {
  return request({
    url: `/temp/manage/role/deleteRole/${data}`,
    method: 'post'
  })
}

//查询加盟商配置信息列表
export function franList(data) {
  return request({
    url: `/temp/manage/fran/list`,
    method: 'post',
    data
  })
}

//添加加盟商配置信息
export function franAdd(data) {
  return request({
    url: `/temp/manage/fran/add`,
    method: 'post',
    data
  })
}

//删除加盟商配置信息
export function franDelete(data) {
  return request({
    url: `/temp/manage/fran/delete`,
    method: 'post',
    data
  })
} 

//修改加盟商配置信息
export function franEdit(data) {
  return request({
    url: `/temp/manage/fran/edit`,
    method: 'post',
    data
  })
}

//查询可分配给加盟商的设备
export function queryToFranFreeDevice(data) {
  return request({
    url: `/temp/manage/device/queryToFranFreeDevice`,
    method: 'post',
    data
  })
}

//批量把设备分配给加盟商
export function patchToFran(data) {
  return request({
    url: `/temp/manage/device/patchToFran`,
    method: 'post',
    data
  })
}

//获取用户的推荐人信息
export function getRegisterReferrerInfo(registerNo) {
  return request({
    url: `/temp/manage/user/getRegisterReferrerInfo/${registerNo}`,
    method: 'post',
  })
}

//加盟商申请列表
export function franApplyList(data) {
  return request({
    url: `/temp/manage/franApply/queryList`,
    method: 'post',
    data
  })
}
//加盟商申请通过
export function franApplyPass(data) {
  return request({
    url: `/temp/manage/franApply/pass`,
    method: 'post',
    data
  })
}

//场地主申请拒绝
export function franApplyRefuse(franApplyId) {
  return request({
    url: `/temp/manage/franApply/refuse/${franApplyId}`,
    method: 'post',
  })
}

//获取参数
export function getBaseParam(data) {
  return request({
    url: `/temp/manage/baseParam/getBaseParam`,
    method: 'post',
    data
  })
}

//设备告警信息列表
export function warnList(data) {
  return request({
    url: `/temp/manage/warn/list`,
    method: 'post',
    data
  })
}


//设备激活
export function patchDeviceActive(data) {
  return request({
    url: `/temp/manage/device/patchDeviceActive`,
    method: 'post',
    data
  })
}

//设备未激活
export function patchDeviceUnActive(data) {
  return request({
    url: `/temp/manage/device/patchDeviceUnActive`,
    method: 'post',
    data
  })
}

//激活投资客设备
export function ableDevice(data) {
  return request({
    url: `/temp/manage/invest/ableDevice`,
    method: 'post',
    data
  })
}

//取消激活投资客设备
export function unAbleDevice(data) {
  return request({
    url: `/temp/manage/invest/unAbleDevice`,
    method: 'post',
    data
  })
}

//线下购买设备订单标记
export function xxOrderMark(data) {
  return request({
    url: `/temp/manage/buyDevice/xxOrderMark`,
    method: 'post',
    data
  })
}

//总监详情
export function getPartnerDetail(partnerId) {
  return request({
    url: `/temp/manage/partner/getPartnerDetail/${partnerId}`,
    method: 'post',
  })
}

//总监详情
export function partnerOrderList(data) {
  return request({
    url: `/temp/manage/order/partnerOrderList`,
    method: 'post',
    data
  })
}

//总监分润流水列表
export function partnerTxnProfitList(data) {
  return request({
    url: `/temp/manage/txnInfo/partnerTxnProfitList`,
    method: 'post',
    data
  })
}

//查询总监内设备购买订单
export function partnerBuyOrderList(data) {
  return request({
    url: `/temp/manage/buyDevice/partnerBuyOrderList`,
    method: 'post',
    data
  })
}

//查询投资内消费订单
export function investOrderList(data) {
  return request({
    url: `/temp/manage/order/investOrderList`,
    method: 'post',
    data
  })
}

//查询场地内消费订单
export function groundOrderList(data) {
  return request({
    url: `/temp/manage/order/groundOrderList`,
    method: 'post',
    data
  })
}

//设备告警记录
export function warnLog(deviceNo,data) {
  return request({
    url: `/temp/manage/device/warnLog/${deviceNo}`,
    method: 'post',
    data
  })
}

//客户反馈
export function feedback(data) {
  return request({
    url: `/temp/manage/feedback/list`,
    method: 'post',
    data
  })
}

//查询推荐人相关设备购买订单
export function referrerBuyOrderList(data) {
  return request({
    url: `/temp/manage/buyDevice/referrerBuyOrderList`,
    method: 'post',
    data
  })
}

//查询推荐人相关消费订单
export function referrerOrderList(data) {
  return request({
    url: `/temp/manage/order/referrerOrderList`,
    method: 'post',
    data
  })
}

//推荐人分润流水列表
export function referrerTxnProfitList(data) {
  return request({
    url: `/temp/manage/txnInfo/referrerTxnProfitList`,
    method: 'post',
    data
  })
}

//发送设备指令
export function sendFunc(data) {
  return request({
    url: `/temp/manage/device/sendFunc`,
    method: 'post',
    data
  })
}



