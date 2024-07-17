import request from "@/utils/request";
import config from "@/config";

// 静默授权登录
export const loginApi = (data) => {
    const { isWeixin } = config.getPlatformEnv();
    // 默认走抖音登录
    if(isWeixin) {
        return request.post({
            url: '/wechat/miniapp/login/normal',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            params: {
                wxCode: data.code
            }
        });
    } else {
        return request.get({
            url: '/user/miniapp/login/douyin',
            params: {
                code: data.code,
                anonymous: data.anonymousCode
            }
        });
    }
}

// 绑定手机号
export const loginByMobileApi = (data) => {
    return request.post({
        url: '/wechat/miniapp/user/mobile/bind',
        params: data
    });
}