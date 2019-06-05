import request from '@/utils/request1'


//微信扫码登录，返回用户信息（置空密码）和权限
export function wxKeyLogin(data) {
    return request({
        url: `/temp/manage/user/wxKeyLogin`,
        method: 'post',
        data
    })
}