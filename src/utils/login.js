import { loginApi } from "@/api/login";
import useUserStore from "@/store/user";

// 缓存的常量
const CACHE_TOKEN = 'token';
const CACHE_USER_INFO = 'userInfo';

/**
 * 获取token值
 * @returns
 */
function getToken() {
    let token = uni.getStorageSync(CACHE_TOKEN);
    return token ? token : '';
}

/**
 * 设置token缓存
 * @param {*} token 
 */
function setLoginToken(token) {
    uni.setStorageSync(CACHE_TOKEN, token);
}

/**
 * 设置用户信息
 * @param {*} data 
 */
function setUserInfo(data) {
    const userStore = useUserStore();
    let userInfo = uni.getStorageSync(CACHE_USER_INFO);
    if (!!userInfo) {
        for (let i in data) {
            userInfo[i] = data[i];
        }
    } else {
        userInfo = data;
    }
    // 同步记录更新时间
    userInfo['updateTime'] = new Date().getTime();
    // 同步更新store
    userStore.setUserInfo(userInfo);
    uni.setStorageSync(CACHE_USER_INFO, userInfo);
}

/**
 * 获取用户信息
 * @returns 
 */
function getUserInfo() {
    let userInfo = uni.getStorageSync(CACHE_USER_INFO);
    // 处理默认的头像
    if (!userInfo['avatar']) {
        userInfo['avatar'] = '/static/avatar.png';
    }
    return userInfo;
}

/**
 * 检查是否注册过
 * @returns
 */
function checkHasRegister() {
    let token = this.getToken();
    if (!token) {
        return false;
    } else {
        // 判断用户是否真实注册
        const userInfo = this.getUserInfo();
        if (userInfo['status'] === 0) {
            return true;
        } else {
            return false;
        }
    }
}

/**
 * 静默授权登录
 */
function silentAuthLogin() {
    uni.login({
        success: loginRes => {
            // 拼接登录授权参数
            let loginParam = loginRes;
            loginApi(loginParam).then(res => {
                if(!res || !res.success) {
                    return;
                }
                // 设置登录的token
                setLoginToken(res.data.token);
                // 设置用户信息
                setUserInfo({
                    username: res.data.username,
                    avatar: res.data.avatar,
                    uid: res.data.uid,
                    extendMap: res.data.extendMap
                })
            })
        },
        fail: errRes => {
            console.log('LoginErr', errRes);
            // 暂时关闭提示 - 朋友圈会报此错误 - 其他情况会有？
            // uni.showToast({ title: '静默授权失败', icon: 'none' });
        }
    })
}

export default {
    getToken,
    setLoginToken,
    setUserInfo,
    getUserInfo,
    checkHasRegister,
    silentAuthLogin
}