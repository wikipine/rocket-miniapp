/**
 * 分享的方法整合
 */

// 开启微信分享功能
export const openWxShareFun = () => {
    wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
    })
}

/**
 * 隐藏分享按钮，但不影响按钮的分享
 */
export const hideWxShareFun = () => {
    wx.hideShareMenu();
}