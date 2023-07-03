<template>
    <div class="front">
        <el-form class="front-form" :model="form" label-width="120px">
            <el-form-item label="出借客户">
                <el-select v-model="form.region" placeholder="出借客户">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="货品条码">
                <el-input v-model="form.name" style="width: 215px;" />
            </el-form-item>
            <el-form-item label="所属仓库">
                <el-select v-model="form.region" placeholder="所属仓库">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item label="供应商">
                <el-select v-model="form.region" placeholder="供应商">
                    <el-option label="Zone one" value="shanghai" />
                    <el-option label="Zone two" value="beijing" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">确认入库</el-button>
                <el-button>重置</el-button>

            </el-form-item>
        </el-form>
    </div>

    <!-- <div class="center">
        <el-col>
            <el-text class="center-data">入库总数量</el-text>
            <el-text class="center-data">入库总成本价</el-text>
        </el-col>
    </div> -->

    <div class="tail">
        <div class="tail-action">
            <el-button type="primary">操作入库</el-button>
            <el-button type="primary">添加分组</el-button>
            <el-button type="primary">显示设置</el-button>
        </div>
        <el-table :data="tableData()" border style="width: 100%">
            <el-table-column type="selection" min-width="40" />
            <el-table-column type="index" label="序号" min-width="40" />
            <el-table-column prop="date" label="图片" min-width="60" />
            <el-table-column prop="name" label="货品条码" min-width="100" />
            <el-table-column prop="name" label="价格信息" min-width="60" />
            <el-table-column prop="inboundno" label="入库单单号" min-width="120" />
            <el-table-column prop="name" label="数量" min-width="60" />
            <el-table-column prop="name" label="市场还货" min-width="60" />
            <el-table-column prop="name" label="供应商" min-width="100" />
            <el-table-column prop="name" label="入库类型" min-width="60" />
            <el-table-column prop="name" label="入库人员" min-width="60" />
            <el-table-column prop="name" label="入库时间" min-width="60" />
            <el-table-column prop="address" label="地址" min-width="100" />
        </el-table>
        <el-pagination class="pagination" layout="prev, pager, next ,total,sizes" :total="total"
            @current-change="handleCurrentChange" @size-change="handleSizeChange" />
    </div>
</template>
  
<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import '@/mock/inbound.js'
import inbound from '@/api/inbound.js'
export default defineComponent({
    name: "HomeView",
    components: {},
    setup() {
        const inboundOrderData = reactive([
        ]);

        // do not use same name with ref
        const form = reactive({
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: '',
        })

        //表格用到的参数
        const state = reactive({
            page: 1,
            limit: 10,
            total: inboundOrderData.length,
        });
        //前端限制分页（tableData为当前展示页表格）
        const tableData = () => {
            return inboundOrderData.filter(
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
            inbound.getInboundOrder().then((res) => {
                console.log(res.data)
                if (res.code == "0") {
                    inboundOrderData.push.apply(inboundOrderData, res.data);
                }
            })
                .catch(function (error) {
                    console.log(error);
                });
        };
        getList();

        const onSubmit = () => {
            console.log('submit!')
        }
        return {
            inboundOrderData,
            form,
            tableData,
            handleCurrentChange,
            handleSizeChange,
            ...toRefs(state),
        };
    },
});

</script>
  #F8F8F8

<style rel="stylesheet/scss" lang="scss">
.front {
    background-color: #FFF;
    padding: 10px;
}

.center {
    // border-top: 1px solid var(--el-border-color);
    // border-bottom: 1px solid var(--el-border-color);
    margin-top: 10px;

    .center-data {
        height: 30px;
        width: 150px;
        border: 1px solid;
        border-radius: 10px;
        text-align: center;
        font-size: 20px;
        float: left;
        background-color: #72f6ff;
    }
}

.tail {
    background-color: #FFF;
    margin-top: 40px;
    padding: 10px;

    .tail-action {
        margin-bottom: 10px;
        display: flex;
    }
}
</style>
  