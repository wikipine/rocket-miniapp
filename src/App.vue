<script>
import loginUtil from "./utils/login";
import { showInterstitialAd } from "@/utils/ad";
import goto from './utils/goto';

// 广告, 35s 展示一次, 每个页面仅展示一次
let cachePage = {};
let timeoutId = null;
const showPageAd = (url) => {
  // 清除之前的 timeout
  if (timeoutId !== null) {
    clearTimeout(timeoutId);
  }
  // 如果该URL已经展示过广告，则不再展示
  if (cachePage[url]) return;
  // 35s 后展示
  timeoutId = setTimeout(() => {
    showInterstitialAd().then(() => {
      console.log('广告展示成功');
      cachePage[url] = true;
    });
  }, 35000);
}

export default {
  onLaunch: function (options) {
    console.log('App Launch');
    // 获取并缓存的设备的信息，后面不再获取
    this.$device.setSystemInfo();
    // 静默授权登录
    // loginUtil.silentAuthLogin();
    // // 监听页面的跳转 - 插屏广告全局取消
    // goto.setupNavigationInterceptors((event, e) => {
    //   showPageAd(e.url);
    // });
    // console.log('start time:', new Date());
    // showPageAd(options.path);
  },
  onShow: function () {
    console.log('App Show');
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
/*每个页面公共css */

/** other style */
@import "assets/css/common.css";
@import "assets/css/theme.css";
</style>
