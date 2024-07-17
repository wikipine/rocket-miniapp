import request from "@/utils/request";

// 获取个人主页信息
export const getUserHomepageInfoApi = () => {
    return request.get({
        url: '/aimen/homepage/info'
    });
}

// 保存或修改用户头像
export const saveUserProfileApi = (data) => {
    return request.post({
        url: '/user/profile/edit',
        params: data
    });
}

// 获取用户点赞收藏列表
export const getUserInteractionListApi = (params) => {
    return request.get({
        url: '/aimen/item/interaction/list',
        params
    });
}

// 获取关注者列表
export const getFollowListApi = () => {
    return request.get({
        url: '/aimen/publisher/follow/list'
    });
}
