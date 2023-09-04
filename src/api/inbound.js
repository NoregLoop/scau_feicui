import request from '@/utils/request'

export function inbounding(inboundForm) {//入库操作
    return request({
        url: '/system/inboundOrder',
        headers: {
            isToken: true
        },
        method: 'post',
        data: inboundForm
    });
}
export function getInboundTypeList() {//获取入库类型
    return request({
        url: '/system/inboundType/list',
        headers: {
            isToken: true
        },
        method: 'get',
    });
}
export function getInboundOrderList(pageNum,pageSize,orderCode,supplierId,desWarehouseId) {//获取入库单列表
    return request({
        url: '/system/inboundOrder/list',
        headers: {
            isToken: true
        },
        params: {
            pageNum,pageSize,orderCode,supplierId,desWarehouseId
        },
        method: 'get',
    });
}

export function getOrderCode() {//获取入库单单号
    return request({
        url: '/system/inboundOrder/getInboundOrderCode',
        headers: {
            isToken: true
        },
        method: 'get',
    });
}



export function getJadeCode() {//获取翡翠货品编号
    return request({
        url: '/system/jade/getJadeCode',
        headers: {
            isToken: true
        },
        method: 'get',
    });
}

export function addJade(jadeForm) {//新增货品
    return request({
        url: '/system/jade',
        headers: {
            isToken: true
        },
        data:jadeForm,
        method: 'post',
    });
}

export function getJadeCrop(jadeUrl) {//图像分割
    return request({
        url: '/api/image/crop',
        headers: {
            isToken: true
        },
        data:jadeUrl,
        method: 'post',
    });
}
export function getJadeFeature(jadeList) {//提取特征
    return request({
        url: '/api/image/feature',
        headers: {
            isToken: true
        },
        data:jadeList,
        method: 'post',
    });
}
export function getJadeType() {//获取品类列表
    return request({
        url: '/system/jadeType/simplist',
        headers: {
            isToken: true
        },
        method: 'get',
    });
}