<template>
  <div class="front">
    <el-collapse v-model="activeNames" class="front-collapse"
      @change="activeNames = !activeNames; collapseName == '收起' ? collapseName = '展开' : collapseName = '收起'">
      <el-collapse-item :title="collapseName" class="collapse-1" name="1">
        <el-form :model="searchForm" label-width="120px">
          <el-form-item label="入库单号">
            <el-select v-model="searchForm.lendCustom" placeholder="出借客户">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="货品条码">
            <el-input v-model="searchForm.jadeCode" />
          </el-form-item>
          <el-form-item label="所属仓库">
            <el-select v-model="searchForm.storeNo" placeholder="所属仓库">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商">
            <el-select v-model="searchForm.supplier" placeholder="供应商">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>

  <!-- <div class="center">
    <el-col>
      <el-text class="center-data">入库总数量</el-text>
      <el-text class="center-data">入库总成本价</el-text>
    </el-col>
  </div> -->

  <div class="tail">
    <div class="tail-action">
      <el-button type="primary">导出明细</el-button>
      <el-button type="primary">打印入库单</el-button>
      <el-button type="primary">打印明细</el-button>
      <el-button type="primary">显示设置</el-button>
    </div>
    <el-table :data="tableData()" border style="width: 100%">
      <el-table-column type="selection" min-width="40" />
      <el-table-column type="index" label="序号" min-width="40" />
      <el-table-column prop="inboundno" label="入库单单号" min-width="60" />
      <el-table-column prop="inboundNumber" label="数量" min-width="60" />
      <el-table-column prop="name" label="市场还货" min-width="60" />
      <el-table-column prop="name" label="供应商" min-width="60" />
      <el-table-column prop="inboundType" label="入库类型" min-width="60" />
      <el-table-column prop="inboundPeople" label="入库人员" min-width="60" />
      <el-table-column prop="inboundTime" label="入库时间" min-width="60" />
      <el-table-column prop="address" label="地址" min-width="60" />
      <el-table-column fixed="right" label="Operations" min-width="80PX">
        <template #default>
          <el-button link type="primary" size="small">打印标签</el-button>
          <el-button link type="primary" size="small">查看明细</el-button>
          <el-button link type="primary" size="small">编辑备注</el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination v-model:current-page="page" v-model:page-size="limit" layout="prev, pager, next ,total,sizes"
        :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
    </div>
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
    const searchForm = reactive({  //入库表单数据
      jadeCode: '',
      lendCustom: '',
      storeNo: '',
      supplier: '',

    })
    const inboundOrderData =reactive ([
    ]);
    const collapseName = ref('展开');
    const activeNames = ref(false)

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
          state.total=res.data.length
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
      searchForm,
      collapseName,
      activeNames,
      tableData,
      getList,
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
  margin-top: 10px;
  // border-top: 1px solid var(--el-border-color);
  // border-bottom: 1px solid var(--el-border-color);
}
.tail {
  background-color: #FFF;
  margin-top: 40px;
  padding: 10px;
}

.tail-action {
  display: flex;
  margin-bottom: 10px;
}


.center .center-data {
  height: 30px;
  width: 150px;
  border: 1px solid;
  border-radius: 10px;
  margin: 10px;
  text-align: center;
  font-size: 20px;
  background-color: #72f6ff;
}
</style>
