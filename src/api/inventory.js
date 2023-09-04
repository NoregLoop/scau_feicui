import request from '@/utils/request'


export function getJadeList(pageNum, pageSize,status,supplierId,desWarehouseId) {//查询货品列表
    return request({
        url: '/system/jade/list',
        headers: {
            isToken: true
        },
        params: {
            pageNum, pageSize,status,supplierId,desWarehouseId
        },
        method: 'get',
    });
}

export function getJadeStatusList() {//查询货品状态列表
    return request({
        url: '/system/jade/getInventoryStatus',
        headers: {
            isToken: true
        },

        method: 'get',
    });
}