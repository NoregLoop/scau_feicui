import request from '@/utils/request'

export function addSchedule(inboundForm) {//增加排班
    return request({
        url: '/system/streamSchedule',
        headers: {
            isToken: true
        },
        method: 'post',
        data: inboundForm
    });
}

export function getScheduleList(pageNum,pageSize) {//获取排班列表
    return request({
        url: '/system/streamSchedule/list',
        headers: {
            isToken: true
        },
        method: 'get',
        params: {
            pageNum,pageSize
        }
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



export function addStreamShop(inboundForm) {//增加店铺
    return request({
        url: '/system/streamShop',
        headers: {
            isToken: true
        },
        method: 'post',
        data: inboundForm
    });
}

export function getStreamShopList(pageNum,pageSize) {//获取店铺列表
    return request({
        url: '/system/streamShop/list',
        headers: {
            isToken: true
        },
        method: 'get',
        params: {
            pageNum,pageSize
        }
    });
}
export function addStreamHost(inboundForm) {//增加主播
    return request({
        url: '/system/streamHost',
        headers: {
            isToken: true
        },
        method: 'post',
        data: inboundForm
    });
}

export function getStreamHostList(pageNum,pageSize) {//获取主播列表
    return request({
        url: '/system/streamHost/list',
        headers: {
            isToken: true
        },
        method: 'get',
        params: {
            pageNum,pageSize
        }
    });
}

