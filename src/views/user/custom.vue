<template>
  <div class="front">
    <el-form class="left" :model="searchForm" label-width="120px">
      <el-form-item class="left-input" label="客户名称">
        <el-input v-model="searchForm.name" />
      </el-form-item>
      <el-form-item class="left-input" label="手机号">
        <el-input v-model="searchForm.phone" />
      </el-form-item>
    </el-form>
    <el-button type="primary" round>查询</el-button>
  </div>


  <div class="tail">
    <div class="tail-action">
    <el-button type="primary" @click="dialogVisible = true">新增客户</el-button>
    <el-button type="primary">启用/停用</el-button>
  </div>
    <el-table :data="tableData()" border style="width: 100%">
      <el-table-column type="selection" width="40px" />
      <el-table-column type="index" width="50" />
      <el-table-column prop="userId" label="角色ID" />
      <el-table-column prop="userName" label="客户名称" />
      <el-table-column prop="userInfo" label="客户编码" />
      <el-table-column prop="userType" label="客户类型" />
      <el-table-column prop="userPhone" label="客户电话" />
      <el-table-column prop="userHead" label="负责人" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column fixed="right" label="Operations" width="120PX">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination v-model:current-page="page" v-model:page-size="limit"
        layout="prev, pager, next ,total,sizes" :total="total" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" />
    </div>
  </div>

  <div class="dialog-list">
    <el-dialog v-model="dialogVisible" title="添加客户" width="30%" :before-close="handleClose" :show-close="false">
      <div>
        <el-form :model="searchForm" label-width="120px">
          <el-form-item label="客户名称">
            <el-input v-model="searchForm.name" />
          </el-form-item>
          <el-form-item label="手机电话">
            <el-input v-model="searchForm.name" />
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="searchForm.name" />
          </el-form-item>
          <el-form-item label="收款人姓名">
            <el-input v-model="searchForm.name" />
          </el-form-item>
          <el-form-item label="收款账号">
            <el-input v-model="searchForm.name" />
          </el-form-item>
          <el-form-item label="货品条码">
            <el-input v-model="searchForm.date1" />
          </el-form-item>
          <el-form-item label="结算方式">
            <el-radio-group v-model="radio1" class="ml-4">
              <el-radio label="1" size="large">成本价百分比计算</el-radio>
              <el-radio label="2" size="large">标签价百分比计算</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="结算比率">
            <el-select v-model="searchForm.data" placeholder="请选择采购方式">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="拦截天数">
            <el-select v-model="searchForm.data" placeholder="请选择采购方式">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="searchForm.date1" />
          </el-form-item>
          <el-form-item label="是否查看客户">
            <el-switch v-model="searchForm.date1" />
            <el-text tag="ins" style="padding-left: 20px;color:#1890ff;">是</el-text>
          </el-form-item>
          <el-form-item label="是否查看销售价">
            <el-switch v-model="searchForm.date1" />
            <el-text tag="ins" style="padding-left: 20px;color:#1890ff;">是</el-text>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
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
        userId: "scau40401",
        userName: "Tom",
        userInfo: "这是测试人员",
      },
      {
        userId: "scau40400",
        userName: "Jerry",
        userInfo: "这是测试人员",
      },
      {
        userId: "scau40403",
        userName: "sofi",
        userInfo: "这是测试人员",
      },

    ];
    const searchForm = reactive({
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: '',
      isstore: '',
      isprint: '',
      isphoto: '',
    });
    const dialogVisible = ref(false)

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
    //提交表单
    const handleClose = (e) => {
      ElMessageBox.confirm('确认提交?')
        .then(() => {
          done()
        })
        .catch(() => {
          // catch error
        })
    }

    return {
      allTableData,
      dialogVisible,
      searchForm,
      tableData,
      handleCurrentChange,
      handleClose,
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
</style>