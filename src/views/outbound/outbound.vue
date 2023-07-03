<template>
  <div class="front">
    <el-radio-group class="front-select" v-model="radio">
      <el-radio label="1" size="large">客户借货</el-radio>
      <el-radio label="2" size="large">市场还货</el-radio>
      <el-radio label="3" size="large">销售出库</el-radio>
    </el-radio-group>
    <el-form class="front-form" :model="outboundForm" label-width="120px">
      <el-form-item class="left-input" label="货品条码">
        <el-input v-model="outboundForm.jadeCode" />
      </el-form-item>
      <el-form-item class="left-input" label="出库单号">
        <el-input v-model="outboundForm.outboundNo" />
      </el-form-item>
      <el-form-item class="left-input" label="出借客户">
        <el-select v-model="outboundForm.lendCustom" placeholder="请选择">
          <el-option label="启用" value="shanghai" />
          <el-option label="停用" value="beijing" />
        </el-select>
      </el-form-item>
    </el-form>
    <el-button type="primary" round>出库</el-button>
  </div>

  <div class="center">


  </div>

  <div class="tail">
    <div class="tail-action">
      <el-button type="primary">操作出库</el-button>
      <el-button type="primary">清空</el-button>
      <el-button type="primary">显示设置</el-button>
    </div>
    <el-table :data="tableData()" border style="width: 100%">
      <el-table-column type="selection" min-width="40" />
      <el-table-column type="index" label="序号" min-width="40" />
      <el-table-column prop="date" label="图片" min-width="60" />
      <el-table-column prop="outboundno" label="出库单单号" min-width="60" />
      <el-table-column prop="name" label="出借客户" min-width="60" />
      <el-table-column prop="name" label="供应商" min-width="60" />
      <el-table-column prop="name" label="出库类型" min-width="60" />
      <el-table-column prop="name" label="出库人员" min-width="60" />
      <el-table-column prop="name" label="出库时间" min-width="60" />
      <el-table-column prop="address" label="地址" min-width="60" />
    </el-table>
    <div class="example-pagination-block">
      <el-pagination layout="prev, pager, next ,total,sizes" :total="total" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "HomeView",
  components: {},
  setup() {
    //表格的全数据（这里是自定义的列表，要看分页效果自行往此数组内加数据）
    const outboundRecord = [
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
      {
        date: "暂无图片",
        name: "Tom",
        outboundno: "scau4042023052616",
        address: "No. 189, Grove St, Los Angeles",
      },
    ];
    const outboundForm = reactive({
      outboundNo: '',
      jadeCode: '',
      lendCustom: '',
    });
    //表格用到的参数
    const state = reactive({
      page: 1,
      limit: 10,
      total: outboundRecord.length,
    });
    //前端限制分页（tableData为当前展示页表格）
    const tableData = () => {
      return outboundRecord.filter(
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
      outboundRecord,
      outboundForm,
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