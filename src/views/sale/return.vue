<template>
    <div class="front">
        <el-collapse v-model="activeNames" class="front-collapse"
            @change="activeNames = !activeNames; collapseName == '收起' ? collapseName = '展开' : collapseName = '收起'">
            <el-collapse-item :title="collapseName" name="1">
                <el-form class="left" :model="returnForm" label-width="120px">
                    <el-form-item class="left-input" label="仓库">
                        <el-select v-model="returnForm.region" placeholder="请选择">
                            <el-option label="启用" value="shanghai" />
                            <el-option label="停用" value="beijing" />
                        </el-select>
                    </el-form-item>
                    <el-form-item class="left-input" label="出库人员">
                        <el-input v-model="returnForm.region" />
                    </el-form-item>
                    <el-form-item class="left-input" label="货品条码">
                        <el-input v-model="returnForm.region" />
                    </el-form-item>
                    <el-form-item class="left-input" label="手机号">
                        <el-input v-model="returnForm.region" />
                    </el-form-item>
                </el-form>
                <el-button type="primary" round>查询</el-button>
            </el-collapse-item>
        </el-collapse>
    </div>

    <div class="center">
        <el-button type="primary">导出列表</el-button>
    </div>
    <div class="end">
        <el-table :data="tableData()" border style="width: 100%">
            <el-table-column type="selection" min-width="60" />
            <el-table-column type="index" label="序号" min-width="60" />
            <el-table-column prop="date" label="图片" min-width="60" />
            <el-table-column prop="outboundno" label="出库单单号" min-width="80" />
            <el-table-column prop="name" label="出借客户" min-width="60" />
            <el-table-column prop="name" label="供应商" min-width="60" />
            <el-table-column prop="name" label="出库类型" min-width="60" />
            <el-table-column prop="name" label="出库人员" min-width="60" />
            <el-table-column prop="name" label="出库时间" min-width="60" />
            <el-table-column prop="address" label="地址" min-width="60" />
        </el-table>
        <div class="pagination">
            <el-pagination v-model:current-page="page" v-model:page-size="limit" 
                layout="prev, pager, next ,total,sizes" :total="total" @current-change="handleCurrentChange"
                @size-change="handleSizeChange" />
        </div>
    </div>
</template>
 
<script>
import { defineComponent, reactive, toRefs, ref } from "vue";

export default defineComponent({
    name: "HomeView",
    components: {},
    setup() {
        //表格的全数据（这里是自定义的列表，要看分页效果自行往此数组内加数据）
        const allTableData = [
            {
                date: "暂无图片",
                name: "Tom",
                outboundno: "scau4042023052616",
                address: "No. 189, Grove St, Los Angeles",
            },
            {
                date: "暂无图片",
                name: "Tom",
                outboundno: "scau4042023052616",
                address: "No. 189, Grove St, Los Angeles",
            },
            {
                date: "暂无图片",
                name: "Tom",
                outboundno: "scau4042023052616",
                address: "No. 189, Grove St, Los Angeles",
            },
            {
                date: "暂无图片",
                name: "Tom",
                outboundno: "scau4042023052616",
                address: "No. 189, Grove St, Los Angeles",
            },

        ];
        const returnForm = reactive({
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
        });
        const collapseName = ref('展开');
        const activeNames = ref(false)
        //表格用到的参数
        const state = reactive({
            page: 1,
            limit: 10,
            total: allTableData.length,
        });
        //前端限制分页（tableData为当前展示页表格）
        const tableData = () => {
            return allTableData.filter(
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
        return {
            allTableData,
            returnForm,
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
    margin: 10px;
    padding: 10px;
}

.end {
    background-color: #fff;
    margin-top: 20px;
}
.el-collapse{
  border-top: 0px;
  border-bottom: 0px;
}
.el-collapse-item__header{
  border-bottom: 0px;
}
.el-collapse-item__content{
  border-bottom: 0px;
}
</style>