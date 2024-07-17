import request from "@/utils/request";

// 作者作品列表
export const getAuthorWorksListApi = (params) => {
    return request.get({
        url: '/aimen/image/list',
        params
    });
}

// 作品详情
export const getWorksDetailApi = (params) => {
    return request.get({
        url: '/aimen/image/detail',
        params
    });
}

// 修改用户作品交互行为
export const changeUserWorksInteractionApi = ({ status, type, id }) => {
    const typeMap = {'LIKED': 0, 'COLLECTED': 1};
    let url = '/aimen/item/interaction';
    if (status) {
        url = '/aimen/item/interaction/cancel';
    }
    return request.post({
        url,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
            refId: id,
            type: typeMap[type]
        }
    });
}

// 查询用户交互状态
export const getUserWorksInteractionStateApi = (id) => {
    return request.get({
        url: '/aimen/item/interaction/user/state',
        params: {
            refId: id
        }
    });
}

// 获取作品下载凭证
export const getDownloadNonceApi = (id) => {
    return request.get({
        url: '/aimen/download/ads/nonce',
        params: {
            id
        }
    });
}

// 获取作品下载地址
export const getDownloadUrlByNonceApi = (nonce) => {
    return request.get({
        url: '/aimen/download/url/list',
        params: {
            nonce
        }
    });
}

// 获取作品专辑列表
export const getAlbumListByCodeApi = (code) => {
    return request.get({
        url: '/aimen/image/album/list',
        params: {
            code
        }
    });
}

// 获取作品专辑预览图
export const getAlbumPreviewListApi = (params) => {
    return request.get({
        url: '/aimen/image/album/preview/list',
        params
    });
}