import request from "@/utils/request";

// 获取协议内容
export const getDocumentByAliasApi = (alias) => {
    return request.get({
        url: '/lit/resource/document/detail/alias',
        params: {
            alias
        }
    });
}