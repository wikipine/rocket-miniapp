import config from '@/config/index.js';
import login from '@/utils/login.js';

const service = (options) => {
    // 判断请求类型
    let headerData = {
        'Content-Type': 'application/json',
        'wx-miniapp-id': config.getAppId(),
    }
    // 组合Content-Type
    if(options.headers) {
        for(const i in options.headers) {
            headerData[i] = options.headers[i];
        }
    }
    // token获取
    let token = login.getToken();
    if (token) {
        headerData['access-token'] = token;
    }
    // 平台id
    // headerData['saas-app-id'] = config.getSassAppId();

    let dataObj = options.params ? options.params : {};

    return new Promise((resolve, reject) => {
        let url = config.getBaseUrl() + options.url;
        // loading 与 hideloading 会影响 showToast，此处不做全局处理
        // uni.showLoading({title: '加载中', mask: true})
        return uni.request({
            url: url,
            data: dataObj,
            method: options.method,
            header: headerData,
            success: (response) => {
                // 非 200 直接报错处理
                if(response.statusCode != 200) {
                    uni.showToast({
                        title: response.data.path + '[' + response.statusCode + ']',
                        icon: "none"
                    })
                } else {
                    let res = response.data;
                    if (res.errorCode !== 0) {
                        uni.showToast({
                            title: res.remark ? res.remark : res.errorInfo,
                            icon: "none"
                        })
                    }
                    resolve(res);
                    // uni.hideLoading();
                }
            },
            fail: (err) => {
                uni.showToast({
                    title: '[' + err.errno + ']' + err.errMsg,
                    icon: "none"
                })
                return reject(err);
            }
        });
    })
}

export { service }