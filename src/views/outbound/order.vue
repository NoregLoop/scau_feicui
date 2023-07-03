<template>
    <div class="front">
        <el-collapse v-model="activeNames"
            @change="activeNames = !activeNames; collapseName == '收起' ? collapseName = '展开' : collapseName = '收起'">
            <el-collapse-item :title="collapseName" name="1">
                <el-form class="left" :model="searchForm" label-width="120px">
                    <el-form-item class="left-input" label="货品条码">
                        <el-input v-model="searchForm.region" />
                    </el-form-item>
                    <el-form-item class="left-input" label="出库单号">
                        <el-input v-model="searchForm.region" />
                    </el-form-item>
                    <el-form-item class="left-input" label="出借客户">
                        <el-select v-model="searchForm.region" placeholder="请选择">
                            <el-option label="启用" value="shanghai" />
                            <el-option label="停用" value="beijing" />
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-button type="primary" round>查询</el-button>
            </el-collapse-item>
        </el-collapse>
    </div>


    <div class="tail">
        <div class="tail-action">
        <el-button type="primary">导出明细</el-button>
        <el-button type="primary">打印</el-button>
    </div>
        <el-table :data="tableData()" border style="width: 100%">
            <el-table-column type="selection" min-width="40" />
            <el-table-column type="index" label="序号" min-width="40" />
            <el-table-column prop="date" label="图片" min-width="60" />
            <el-table-column prop="outboundNo" label="出库单单号" min-width="80" />
            <el-table-column prop="lendCustom" label="出借客户" min-width="60" />
            <el-table-column prop="supplier" label="供应商" min-width="60" />
            <el-table-column prop="outboundType" label="出库类型" min-width="60" />
            <el-table-column prop="outboundPeople" label="出库人员" min-width="60" />
            <el-table-column prop="outboundTime" label="出库时间" min-width="60" />
            <el-table-column prop="address" label="地址" min-width="60" />
        </el-table>
        <div class="pagination">
            <el-pagination v-model:current-page="page" v-model:page-size="limit" layout="prev, pager, next ,total,sizes"
                :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
        </div>
    </div>
</template>
 
<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import '@/mock/outbound.js'
import outbound from '@/api/outbound.js'

export default defineComponent({
    name: "HomeView",
    components: {},
    setup() {
        //表格的全数据（这里是自定义的列表，要看分页效果自行往此数组内加数据）
        const outboundOrderData = reactive([

        ]);
        const searchForm = reactive({
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',

        });
        const collapseName = ref('展开');
        const activeNames = ref(false)
        //表格用到的参数
        const state = reactive({
            page: 1,
            limit: 10,
            total: outboundOrderData.length,
        });
        //前端限制分页（tableData为当前展示页表格）
        const tableData = () => {
            return outboundOrderData.filter(
                (item, index) =>
                    index < state.page * state.limit &&
                    index >= state.limit * (state.page - 1)
            );
        };
        //改变页码
        const handleCurrentChange = (e) => {
            state.page = e;
        };
        //改变页数限制
        const handleSizeChange = (e) => {
            state.limit = e;
        };
        const getList = () => {
            outbound.getOutboundOrder().then((res) => {
                console.log(res.data)
                if (res.code == "0") {
                    outboundOrderData.push.apply(outboundOrderData, res.data);
                    state.total=res.data.length
                }
            })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getList();

        return {
            outboundOrderData,
            searchForm,
            collapseName,
            activeNames,
            tableData,
            handleCurrentChange,
            handleSizeChange,
            ...toRefs(state),
        };
    },
});
</script>

<style rel="stylesheet/scss" lang="scss">
.front {
  background-color: #fff;
  padding: 10px;
}

.center {
  margin: 10px;
}

.tail {
  background-color: #fff;
  margin-top: 40px;
  padding: 10px;
  .tail-action {
        margin-bottom: 10px;
        display: flex;
    }
}

.el-collapse {
    border-top: 0px;
    border-bottom: 0px;
}

.el-collapse-item__header {
    border-bottom: 0px;
}

.el-collapse-item__content {
    border-bottom: 0px;
}
</style>