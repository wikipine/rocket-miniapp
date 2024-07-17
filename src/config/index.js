/**
 * 配置内容获取函数
 */
const config = {}

// 微信第三方extJson获取使用
function getExtConfigSync(type) {
    const config = uni.getExtConfigSync();
    return typeof config[type] !== 'undefined' ? config[type] : '';
}

// 获取Base_URL
config.getBaseUrl = () => {
    return import.meta.env.VITE_BASE_URL;
}

// 获取sass_app_id 即 店铺ShopId
config.getSassAppId = () => {
    return getExtConfigSync('saasAppId')
}

// 图库上传接口
config.getImageUploadUrl = () => {
    return config.getBaseUrl() + '/resource/image/upload'
}

// 获取AppId
config.getAppId = () => {
    // #ifdef MP-WEIXIN
    return uni.getAccountInfoSync().miniProgram.appId;
    // #endif
    // #ifdef MP-TOUTIAO
    return uni.getEnvInfoSync().microapp.appId;
    // #endif
}

// 通过编译判断环境
config.getPlatformEnv = () => {
    const envArr = {
        isWeixin: false,
        isDouyin: false,
    }
    // #ifdef MP-WEIXIN
    envArr.isWeixin = true;
    // #endif
    // #ifdef MP-TOUTIAO
    envArr.isDouyin = true;
    // #endif
    return envArr;
}

export default config;