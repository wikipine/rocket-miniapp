/**
 * 抖音小程序的广告位的管理
 */
import config from "@/config";
// 激励广告位ID
const TT_AD_REWARD_VIDEO_ID = "0dl1o6hj3kbon7z2gw";
const WX_AD_REWARD_VIDEO_ID = "adunit-4c55090c883eb778";
// 插屏广告位ID
const TT_AD_INTERSTITIAL_ID = "mwe7l75mmulowi33ec";
const WX_AD_INTERSTITIAL_ID = "adunit-a6b627767fb2cd1c";

/**
 * 显示激励奖励广告
 */
export const showRewardVideoAd = () => {
  return new Promise((resolve, reject) => {
    const { isWeixin } = config.getPlatformEnv();
    try {
      // 实例处理
      let adInstance = null;
      if(isWeixin) {
        adInstance = wx.createRewardedVideoAd({
          adUnitId: WX_AD_REWARD_VIDEO_ID,
        });
      } else {
        adInstance = tt.createRewardedVideoAd({
          adUnitId: TT_AD_REWARD_VIDEO_ID,
        });
      }
      // 关闭后判断类型
      adInstance.onError((err) => {
        // 1005 和 1004 说明组件在审核中，直接返回
        if(err.errCode == 1005 || err.errCode == 1004) {
          resolve(1);
        } else {
          // 广告加载异常, 返回失败
          uni.showToast({
            title: "广告加载失败[" + err.errCode + "]",
            icon: "none",
            duration: 2000,
          });
          resolve(-1);
        }
      });
      // 关闭后判断类型
      adInstance.onClose(({ isEnded }) => {
        // 给予奖励 true or false
        resolve(isEnded ? 1 : 0);
      });
      uni.showLoading({ title: "请求中", mask: true });
      adInstance
        .load()
        .then(() => {
          adInstance
            .show()
            .then(() => {
              uni.hideLoading();
            })
            .catch(() => {
              // 统一在 onError 中处理
            });
        })
        .catch((err) => {
          // 统一在 onError 中处理
        });
    } catch (err) {
      console.log("激励广告函数异常: ", err.message);
      // 针对无法显示的情况，跳过处理
      resolve(-2);
    }
  });
};

/**
 * 显示插屏广告
 */
export const showInterstitialAd = () => {
  return new Promise((resolve, reject) => {
    const { isWeixin } = config.getPlatformEnv();
    try {
      // 实例处理
      let adInstance = null;
      if(isWeixin) {
        adInstance = wx.createInterstitialAd({
          adUnitId: WX_AD_INTERSTITIAL_ID,
        });
      } else {
        adInstance = tt.createInterstitialAd({
          adUnitId: TT_AD_INTERSTITIAL_ID,
        });
      }
      // 关闭后判断类型
      adInstance.onError((err) => {
        // 广告加载异常，就当跳过广告正常处理
        // uni.showToast({
        //   title: "广告加载失败[" + err.errCode + "]",
        //   icon: "none",
        //   duration: 2000,
        // });
        console.log('error time:', new Date());
        console.log("插屏广告加载失败[" + err.errCode + "]");
        resolve(true);
      });
      // 关闭后判断类型
      adInstance.onClose(() => {
        // 插屏广告关闭无类型判断
        resolve(true);
      });
      adInstance
        .load()
        .then(() => {
          adInstance.show();
        })
        .catch((err) => {
          // 统一在 onError 中处理
        });
    } catch (err) {
      console.log("插屏广告函数异常: ", err.message);
      // 针对无法显示的情况，跳过处理
      resolve(true);
    }
  });
};
