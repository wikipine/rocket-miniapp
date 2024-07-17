import request from "@/utils/request";

// 获取推荐列表
export const getRecommendListApi = (params) => {
    return request.get({
        url: '/aimen/recommend/list',
        params
    });
}

// 获取推荐创作者列表
export const getRecommendAuthorListApi = () => {
    return request.get({
        url: '/aimen/recommend/author/list'
    });
}