import request from '@/utils/request'


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
export function changeStatus(statusForm) {//启用停用
    return request({
        url: '/system/user/changeStatus',
        headers: {
            isToken: true
        },
        method: 'put',
        data: statusForm
    })
}
export function search(pageNum,pageSize,userName,nickName) {//查询
    return request({
        url: '/system/user/list',
        headers: {
            isToken: true
        },
        method: 'get',
        params: {
            pageNum,pageSize,userName,nickName
        }
    })
}
export function addUser(userForm) {//添加用户
    return request({
        url: '/system/user',
        headers: {
            isToken: true
        },
        method: 'post',
        data: userForm
    })
}
export function updateUser(userForm) {//编辑用户
    return request({
        url: '/system/user/',
        headers: {
            isToken: true
        },
        method: 'put',
        data: userForm
        // params:{
        //     userId
        // }
    })
}
export function deleteUser(userId) {//删除用户
    return request({
        url: '/system/user/' + userId,
        headers: {
            isToken: true
        },
        method: 'delete',
        // params:{
        //     userId
        // }
    })
}

export function getRoleList(pageNum,pageSize) {//获取角色列表
    return request({
        url: '/system/role/list',
        headers: {
            isToken: true
        },
        method: 'get',
        params: {
            pageNum,pageSize
        }
    })
}
export function addRole(rolEForm) {//新增角色
    return request({
        url: '/system/role',
        headers: {
            isToken: true
        },
        method: 'post',
        data: rolEForm
    })
}
export function deleteRole(roleId) {//删除角色
    return request({
        url: '/system/role/' + roleId,
        headers: {
            isToken: true
        },
        method: 'delete',
        // params:{
        //     userId
        // }
    })
}

export function getTenantList(pageNum,pageSize) {//获取租户列表
    return request({
        url: '/system/tenant/list',
        headers: {
            isToken: true
        },
        method: 'get',
        params: {
            pageNum,pageSize
        }
    })
}
export function addTenant(tenantForm) {//新增租户
    return request({
        url: '/system/tenant',
        headers: {
            isToken: true
        },
        method: 'post',
        data: tenantForm
    })
}
export function updateTenant(tenantForm) {//编辑租户
    return request({
        url: '/system/tenant/',
        headers: {
            isToken: true
        },
        method: 'put',
        data: tenantForm
    })
}
export function deleteTenant(tenantId) {//删除租户
    return request({
        url: '/system/tenant/' + tenantId,
        headers: {
            isToken: true
        },
        method: 'delete',
    })
}