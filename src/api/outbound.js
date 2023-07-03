import request from '@/utils/request'

// 出库
export default{
    inbound(outboundForm) {//出库操作
        return request({
            url: '/mock/outbound',
            // url: '/login',
            headers: {
                isToken: false
            },
            method: 'post',
            data: outboundForm
        });
    },

    getOutboundOrder() {//获取出库单列表
        return request({
            url: '/mock/getOutboundOrder',
            headers: {
                isToken: false
            },
            method: 'get',
        });
    },
}
