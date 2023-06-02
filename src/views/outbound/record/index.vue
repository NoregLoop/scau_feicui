<template>
  <div class="data">
    <el-table :data="tableData()" style="width: 100%">
      <el-table-column type="index" width="50" />
      <el-table-column prop="date" label="图片" width="180" />
      <el-table-column prop="outboundno" label="出库单单号" width="180" />
      <el-table-column prop="name" label="出借客户"  />
      <el-table-column prop="name" label="供应商" />
      <el-table-column prop="name" label="出库类型" />
      <el-table-column prop="name" label="出库人员" />
      <el-table-column prop="name" label="出库时间" />
      <el-table-column prop="address" label="地址" />
    </el-table>
    <div class="example-pagination-block">
      <!-- <div class="example-demonstration">分页</div> -->
      <el-pagination
        background
        layout="prev, pager, next ,total,sizes"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
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
      tableData,
      handleCurrentChange,
      handleSizeChange,
      ...toRefs(state),
    };
  },
});
</script>

<style rel="stylesheet/scss" lang="scss">
.data{

}

</style>