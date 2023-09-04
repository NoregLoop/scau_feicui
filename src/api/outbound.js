import request from '@/utils/request'


export function outbound(outboundForm) {//出库操作
    return request({
        url: '/system/outboundOrder',
        // url: '/login',
        headers: {
            isToken: true
        },
        method: 'post',
        data: outboundForm
    });
}
export function altJadeStatus(data) {//搜索货品
    return request({
        url: '/system/jade',
        headers: {
            isToken: true
        },
        data:data,
        method: 'put',
    });
}
export function getOutboundOrderCode() {//获取出库单编码
    return request({
        url: '/system/outboundOrder/getOutboundOrderCode',
        headers: {
            isToken: true
        },
        method: 'get',
    });
}

export function getOutboundOrderList(pageNum, pageSize,orderCode,supplierId,desWarehouseId) {//获取出库单列表
    return request({
        url: '/system/outboundOrder/list',
        headers: {
            isToken: true
        },
        params: {
            pageNum, pageSize,orderCode,supplierId,desWarehouseId
        },
        method: 'get',
    });
}
export function getOutboundJadeList(pageNum, pageSize) {//获取出库单列表
    return request({
        url: '/system/jade/list',
        headers: {
            isToken: true
        },
        params: {
            pageNum, pageSize
        },
        method: 'get',
    });
}

export function getJadeCrop(jadeUrl) {//图像分割
    return request({
        url: '/api/image/crop',
        headers: {
            isToken: true
        },
        data: jadeUrl,
        method: 'post',
    });
}
export function jadeMatch(imageIds) {//图像匹配
    return request({
        url: '/system/jadeFeature/match',
        headers: {
            isToken: true
        },
        data: imageIds,
        method: 'post',
    });
}
export function getJadeFeature(jadeList) {//提取特征
    return request({
        url: '/api/image/feature',
        headers: {
            isToken: true
        },
        data: jadeList,
        method: 'post',
    });
}
export function getJadeInfo(imageId) {//搜索货品
    return request({
        url: '/system/jade/list',
        headers: {
            isToken: true
        },
        params: { imageId },
        method: 'get',
    });
}


export function getUserList(pageNum,pageSize) {//获取用户列表
    return request({
        url: '/system/user/list',
        headers: {
            isToken: true
        },
        method: 'get',
        params: {
            pageNum,pageSize
        }
    })
}
