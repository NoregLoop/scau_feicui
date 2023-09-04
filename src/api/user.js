import request from '@/utils/request'


export function getClientList(pageNum,pageSize) {//获取客户列表
    return request({
        url: '/system/basicClient/list',
        headers: {
            isToken: true
        },
        method: 'get',
        params: {
            pageNum,pageSize
        }
    })
}
export function addClient(clientForm) {//添加客户
    return request({
        url: '/system/basicClient',
        headers: {
            isToken: true
        },
        method: 'post',
        data: clientForm
    })
}
export function updateClient(clientForm) {//编辑客户
    return request({
        url: '/system/basicClient',
        headers: {
            isToken: true
        },
        method: 'put',
        data: clientForm
        // params:{
        //     userId
        // }
    })
}
export function deleteClient(clientId) {//删除客户
    return request({
        url: '/system/basicClient/' + clientId,
        headers: {
            isToken: true
        },
        method: 'delete',
        // params:{
        //     userId
        // }
    })
}







export function getSupplierList(pageNum,pageSize) {//获取供应商列表
    return request({
        url: '/system/supplier/list',
        headers: {
            isToken: true
        },
        method: 'get',
        params: {
            pageNum,pageSize
        }
    })
}
export function addSupplier(supplierForm) {//添加客户
    return request({
        url: '/system/supplier',
        headers: {
            isToken: true
        },
        method: 'post',
        data: supplierForm
    })
}
export function updateSupplier(supplierForm) {//编辑客户
    return request({
        url: '/system/supplier',
        headers: {
            isToken: true
        },
        method: 'put',
        data: supplierForm
        // params:{
        //     userId
        // }
    })
}
export function deleteSupplier(supplierId) {//删除客户
    return request({
        url: '/system/supplier/' + supplierId,
        headers: {
            isToken: true
        },
        method: 'delete',
        // params:{
        //     userId
        // }
    })
}

