/**
 * 缓存使用
 */
const cache = {
    // 获取缓存后清除
    getCacheClear: (key) => {
        let data = uni.getStorageSync(key);
        // 移除缓存，走异步处理即可
        uni.removeStorage({key: key, success: function (res) {}});
        return data;
    },
    // 设置缓存
    setCache: (key, data) => {
        uni.setStorageSync(key, data);
    },
    // 获取缓存
    getCache: (key) => {
        return uni.getStorageSync(key);
    },
    // 移除缓存
    removeCache: (key) => {
        uni.removeStorage({key: key, success: function (res) {}});
    }
}

export default cache;