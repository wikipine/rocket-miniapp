import loginUtil from './login';
import arrayUtil from "./array"

// 检查登录的页面
const checkLoginPage = [
    
];

// 登录页面地址
const LOGIN_PAGE_PATH = '/pages/account/login/index';

// 组装URL
function composeUrl(url, data) {
    let arr = [];
    if (!!data && Object.keys(data).length > 0) {
        for (let key in data) {
            arr.push(key + '=' + data[key])
        }
        url = url + '?' + arr.join('&')
    }
    return url
}

const goto = {
    package: 'pages',
    // 声明本次的跳转package
    setPackage: (name) => {
        goto.package = name ? 'package_' + name + '/pages' : 'pages';
        return goto;
    }
};

/**
 * 跳转页面
 * @param {*} name 
 * @param {*} query 
 */
goto.navigateTo = (name, query = {}) => {
    let url = '/' + goto.package + '/' + name.replaceAll('-', '/') + '/index';
    url = composeUrl(url, query)
    // 是否需要检查登录
    if(arrayUtil.inArray(name, checkLoginPage) && !loginUtil.checkHasRegister()) {
        url = LOGIN_PAGE_PATH;
    }
    uni.navigateTo({url: url});
    // 恢复默认
    goto.setPackage();
}

/**
 * 关闭当前页面跳转
 * @param {*} name 
 * @param {*} query 
 */
goto.redirectTo = (name, query = {}) => {
    let url = '/' + goto.package + '/' + name.replaceAll('-', '/') + '/index';
    url = composeUrl(url, query)
    // 是否需要检查登录
    if(arrayUtil.inArray(name, checkLoginPage) && !loginUtil.checkHasRegister()) {
        url = LOGIN_PAGE_PATH;
    }
    uni.redirectTo({url: url});
    // 恢复默认
    goto.setPackage();
}

/**
 * 关闭所有页面跳转
 * @param {*} name 
 * @param {*} query 
 */
goto.reLaunch = (name, query = {}) => {
    let url = '/' + goto.package + '/' + name.replaceAll('-', '/') + '/index';
    url = composeUrl(url, query)
    // 是否需要检查登录
    if(arrayUtil.inArray(name, checkLoginPage) && !loginUtil.checkHasRegister()) {
        url = LOGIN_PAGE_PATH;
    }
    uni.reLaunch({url: url});
    // 恢复默认
    goto.setPackage();
}

/**
 * 返回上一页
 */
goto.navigateBack = () => {
    const pages = getCurrentPages();
    let currPage = pages[pages.length - 1];   // 当前页面
    let prevPage = pages[pages.length - 2];  // 上一个页面
    // 不存在上一页或者上一页与本页相同，均返回首页
    if(!prevPage || currPage['route'] === prevPage['route']) {
        goto.reLaunch('index');
    } else {
        uni.navigateBack();
    }
}

/**
 *  若上一个页面与传参一致，则返回，否则关闭后跳转
 * @param {*} name 
 * @param {*} query 
 */
goto.redirectBackTo = (name, query = {}) => {
    let url = goto.package + '/' + name.replaceAll('-', '/') + '/index';
    const pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  
    // 一致直接返回
    if(prevPage && prevPage['route'] === url) {
        uni.navigateBack();
    } else {
        goto.redirectTo(name, query);
    }
}

/**
 * 设置路由监听
 */
goto.setupNavigationInterceptors = (callback) => {
    const navigationEvents = [
        'navigateTo',
        'redirectTo',
        'switchTab',
        'navigateBack'
    ];
    const interceptorHandler = (event) => {
        return {
            invoke(e) {
                if (callback && typeof callback === 'function') {
                    callback(event, e);
                }
            }
        };
    };
    navigationEvents.forEach(event => {
        uni.addInterceptor(event, interceptorHandler(event));
    });
}

export default goto;