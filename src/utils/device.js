
let systemInfo = {
    statusBarHeight: 0,
    nav: 0,
    bottom: 0,
    screenWidth: 0,
    screenHeight: 0,
    buttonWidth: 0,
    bottomBarHeight: 0
}

/**
 * 设置设备的信息
 */
function setSystemInfo() {
    let that = this;
    uni.getSystemInfo({
        success: device => {
            const button = uni.getMenuButtonBoundingClientRect();

            that.systemInfo.statusBarHeight = device.statusBarHeight;
            that.systemInfo.buttonWidth = button.width;
            that.systemInfo.nav = button.top + button.bottom - 2 * device.statusBarHeight;
            that.systemInfo.bottom = device.safeArea.bottom;
            that.systemInfo.screenWidth = device.screenWidth;
            that.systemInfo.screenHeight = device.screenHeight;
            that.systemInfo.bottomBarHeight = device.screenHeight - device.safeArea.bottom;

        }
    });
}

const device = {
    systemInfo,
    setSystemInfo
}

export default device;