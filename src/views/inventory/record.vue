<template>
  <div class="front">
    <el-collapse v-model="activeNames"
      @change="activeNames = !activeNames; collapseName == '收起' ? collapseName = '展开' : collapseName = '收起'">
      <el-collapse-item :title="collapseName" name="1">
        <el-form :model="form" label-width="120px">
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
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>

  <div class="tail">
    <div class="tail-action">
      <el-button type="primary">批量改价</el-button>
      <el-button type="primary">导出列表</el-button>
      <el-button type="primary">打印</el-button>
      <el-button type="primary">显示设置</el-button>
    </div>
    <el-table :data="tableData()" border style="width: 100%">
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
    <div class="pagination">
      <el-pagination v-model:current-page="page" v-model:page-size="limit" layout="prev, pager, next ,total,sizes"
        :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange" />
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
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
#F8F8F8

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
