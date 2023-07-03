import request from '@/utils/request'

// 入库
export default{
    inbound(inboundForm) {//入库操作
        return request({
            url: '/inbound',
            // url: '/login',
            headers: {
                isToken: false
            },
            method: 'post',
            data: inboundForm
        });
    },

    getInboundOrder() {//获取入库单列表
        return request({
            url: '/getInboundOrder',
            headers: {
                isToken: false
            },
            method: 'get',
        });
    },
}
