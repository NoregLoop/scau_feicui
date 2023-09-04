import request from '@/utils/request'



export function getWarehouseList() {//获取仓库列表
    return request({
        url: '/system/warehouse/list',
        headers: {
            isToken: true
        },
        method: 'get',
    })
}
export function addWarehouse(warehouseForm) {//添加仓库
    return request({
        url: '/system/warehouse',
        headers: {
            isToken: true
        },
        method: 'post',
        data: warehouseForm
    })
}
export function updateWarehouse(warehouseForm) {//编辑仓库
    return request({
        url: '/system/warehouse',
        headers: {
            isToken: true
        },
        method: 'put',
        data: warehouseForm
        // params:{
        //     userId
        // }
    })
}
export function deleteWarehouse(warehouseId) {//删除仓库
    return request({
        url: '/system/warehouse/' + warehouseId,
        headers: {
            isToken: true
        },
        method: 'delete',
        // params:{
        //     userId
        // }
    })
}

export function getStorageList() {//获取仓位列表
    return request({
        url: '/system/storage/list',
        headers: {
            isToken: true
        },
        method: 'get',
    })
}
export function addStorage(storageForm) {//添加仓位
    return request({
        url: '/system/storage',
        headers: {
            isToken: true
        },
        method: 'post',
        data: storageForm
    })
}
export function deleteStorage(storageId) {//删除用户
    return request({
        url: '/system/storage/' + storageId,
        headers: {
            isToken: true
        },
        method: 'delete',
        // params:{
        //     userId
        // }
    })
}
export function updateStorage(storageForm) {//编辑仓位
    return request({
        url: '/system/storage',
        headers: {
            isToken: true
        },
        method: 'put',
        data: storageForm
        // params:{
        //     userId
        // }
    })
}