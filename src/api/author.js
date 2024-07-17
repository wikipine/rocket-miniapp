import request from "@/utils/request";

// 口令获取作者信息
export const getAuthorInfoByCodeApi = (code) => {
    return request.get({
        url: '/aimen/publisher/home/info',
        params: { 
            code
        }
    });
}

// 更新关注者状态
export const updatePublisherFollowStatusApi = (code, status) => {
    return request.post({
        url: '/aimen/publisher/follow',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: { 
            code, 
            status
        }
    });
}