
import request from '@/utils/request'

// 入库
export default{
    inbound(inboundForm) {//入库操作
        return request({
            url: '/inbound',
            // url: '/login',
            headers: {
                isToken: true
            },
            method: 'post',
            data: inboundForm
        });
    },

    getWarehouseList() {//获取仓库列表
        return request({
            url: '/system/warehouse/list',
            headers: {
                isToken: true
            },
            method: 'get',
        });
    },
    
}
