<template>
  <div class="front">
    <div class="front-left">
      <el-form :model="form" label-width="120px">
        <el-form-item label="条码查询">
          <el-input v-model="form.date1" placeholder="搜索匹配/扫码" />
        </el-form-item>
        <el-form-item class="front-enter">
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="front-right">
      <img class="" src="@/assets/logo.png" />
    </div>
  </div>

  <div class="tail">
    <el-table :data="tableData()" style="width: 100%">
      <el-table-column type="selection" min-width="40" />
      <el-table-column type="index" label="序号" min-width="40" />
      <el-table-column prop="inboundno" label="图片" min-width="60" />
      <el-table-column prop="name" label="基本信息" min-width="60" />
      <el-table-column prop="name" label="价格信息" min-width="60" />
      <el-table-column prop="name" label="结算金额" min-width="60" />
      <el-table-column prop="name" label="仓库仓位" min-width="60" />
      <el-table-column prop="name" label="货品状态" min-width="60" />
      <el-table-column prop="name" label="入库时间" min-width="60" />
      <el-table-column prop="address" label="地址" min-width="60" />
      <el-table-column fixed="right" label="Operations" width="120PX">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination" v-model:current-page="page" v-model:page-size="limit"
      layout="prev, pager, next ,total,sizes" :total="total" @current-change="handleCurrentChange"
      @size-change="handleSizeChange" />
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, } from "vue";
export default defineComponent({
  name: "HomeView",
  components: {},
  setup() {
    const allTableData = [
      {
        date: "暂无图片",
        name: "Tom",
        inboundno: "scau4042023052612",
        address: "No. 189, Grove St, Los Angeles",
      },
      {
        date: "暂无图片",
        name: "Tom",
        inboundno: "scau4042023052612",
        address: "No. 189, Grove St, Los Angeles",
      },

    ];
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

    const onSubmit = () => {
      console.log('submit!')
    }
    return {
      allTableData,
      form,
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
  display: felx;
  background-color: #fff;
  padding: 10px;

}

.tail {
  background-color: #fff;
  margin-top: 40px;
  padding: 10px;
}
</style>
