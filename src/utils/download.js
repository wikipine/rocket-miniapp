/**
 * 下载网路图片到相册
 * uni showToast 与 hideLoading 会冲突，直接用即可，无需调用 loading
 */
export const downloadImageToPhotosAlbum = (imgUrl) => {
  uni.showLoading({ title: "图片下载中..." });
  uni.downloadFile({
    url: imgUrl,
    success: (res) => {
      if (res.statusCode !== 200 || !res.tempFilePath) {
        uni.showToast({ title: "系统异常，图片下载失败", icon: "none" });
        return;
      }
      // 与toast 冲突，仅成功需要主动隐藏
      uni.hideLoading();
      // 保存到相册
      saveImageToPhotosAlbum(res.tempFilePath);
    },
    fail: (err) => {
      uni.showToast({
        title: "图片下载失败，请检查资源路径是否正确！",
        icon: "none",
      });
    },
  });
};

// 实际保存方法
const saveImageToPhotosAlbum = (filePath) => {
  uni.showLoading({ title: "正在保存..." });
  uni.saveImageToPhotosAlbum({
    filePath: filePath,
    success: () => {
      uni.showToast({ title: "保存至相册成功", icon: "none" });
    },
    fail: (err) => {
      if (err.errNo === 10200) {
        reAuthPhotosAlbum(filePath);
        return;
      }
      if (err.errNo === 10502) {
        uni.showToast({ title: "点击取消，保存失败！", icon: "none" });
        return;
      }
      uni.showToast({
        title: "系统错误[" + err.errNo + "]，保存失败！",
        icon: "none",
      });
    },
  });
};

// 重新授权处理
const reAuthPhotosAlbum = (filePath) => {
  uni.showModal({
    content: "未开启相册权限, 请确认允许授权",
    success: (res) => {
      if (res.confirm) {
        uni.getSetting({
          success: (result) => {
            if (!result.authSetting["scope.album"]) {
              uni.openSetting({
                success: (result) => {
                  if (result.authSetting["scope.album"]) {
                    saveImageToPhotosAlbum(filePath);
                  } else {
                    uni.showToast({
                      title: "请在弹出的权限设置页面打开相册权限！",
                      icon: "none",
                    });
                  }
                },
              });
            }
          },
        });
      } else {
        uni.showToast({ title: "取消授权，保存失败", icon: "none" });
      }
    },
  });
};
