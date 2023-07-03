<template>
  <div class="front">
    <el-form class="left" :model="searchForm" label-width="120px">
      <el-form-item class="left-input" label="供应商状态">
        <el-select v-model="searchForm.region" placeholder="请选择">
          <el-option label="启用" value="shanghai" />
          <el-option label="停用" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item class="left-input" label="供应商编码">
        <el-input v-model="searchForm.region" />
      </el-form-item>
      <el-form-item class="left-input" label="供应商名称">
        <el-input v-model="searchForm.region" />
      </el-form-item>
      <el-form-item class="left-input" label="手机号">
        <el-input v-model="supplierForm.region" />
      </el-form-item>
    </el-form>
    <el-button type="primary" round>查询</el-button>
  </div>



  <div class="tail">
    <div class="tail-action">
      <el-button type="primary" @click="dialogVisible = true">新增供应商</el-button>
      <el-button type="primary">启用/停用</el-button>
    </div>
    <el-table :data="tableData()" border style="width: 100%">
      <el-table-column type="selection" width="40px" />
      <el-table-column type="index" width="50px" min-width="60PX" />
      <el-table-column prop="userId" label="角色ID" min-width="80PX" />
      <el-table-column prop="userName" label="供应商名称" min-width="60PX" />
      <el-table-column prop="userInfo" label="供应商编码" min-width="100PX" />
      <el-table-column prop="userPhone" label="手机号" min-width="70PX" />
      <el-table-column prop="userPhone" label="结算方式" min-width="60PX" />
      <el-table-column prop="userPhone" label="结算比例" min-width="60PX" />
      <el-table-column prop="userPayeeName" label="收款人姓名" min-width="60PX" />
      <el-table-column prop="userAccount" label="收款账号" min-width="100PX" />
      <el-table-column prop="userStatus" label="商户状态" min-width="60PX" />
      <el-table-column prop="createTime" label="创建时间" min-width="60PX" />
      <el-table-column fixed="right" label="Operations" min-width="80PX">
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

  <div class="dialog-list">
    <el-dialog v-model="dialogVisible" title="添加供应商" width="30%" :before-close="handleClose" :show-close="false">
      <div>
        <el-form :model="supplierForm" label-width="120px">
          <el-form-item label="供应商名称">
            <el-input v-model="supplierForm.name" />
          </el-form-item>
          <el-form-item label="手机电话">
            <el-input v-model="supplierForm.phone" />
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="supplierForm.address" />
          </el-form-item>
          <el-form-item label="收款人姓名">
            <el-input v-model="supplierForm.payeeName" />
          </el-form-item>
          <el-form-item label="收款账号">
            <el-input v-model="supplierForm.payeeAccount" />
          </el-form-item>
          <el-form-item label="结算方式">
            <el-radio-group v-model="supplierForm.settlement" class="ml-4">
              <el-radio label="1" size="large">成本价百分比计算</el-radio>
              <el-radio label="2" size="large">标签价百分比计算</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="结算比率">
            <el-select v-model="supplierForm.settleratio" placeholder="请选择采购方式">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="拦截天数">
            <el-select v-model="supplierForm.alertDay" placeholder="请选择采购方式">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="supplierForm.note" />
          </el-form-item>
          <el-form-item label="是否查看客户">
            <el-switch v-model="supplierForm.authority1" />
            <el-text tag="ins" style="padding-left: 20px;color:#1890ff;">是</el-text>
          </el-form-item>
          <el-form-item label="是否查看销售价">
            <el-switch v-model="supplierForm.authority2" />
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
import { ElMessageBox } from 'element-plus'

export default defineComponent({
  name: "HomeView",
  components: {},
  setup() {
    //表格的全数据（这里是自定义的列表，要看分页效果自行往此数组内加数据）
    const supplierData = [
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
    const supplierForm = reactive({
      name: '',
      payeeName: '',
      payeeAccount: '',
      phone: '',
      address: '',
      settlement: '',
      settleratio: '',
      alertDay: '',
      note: '',
      authority1: false,
      authority2: false,
    });
    const searchForm = reactive({

    })
    const dialogVisible = ref(false)

    //表格用到的参数
    const state = reactive({
      page: 1,
      limit: 10,
      total: supplierData.length,
    });
    //前端限制分页（tableData为当前展示页表格）
    const tableData = () => {
      return supplierData.filter(
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
      supplierData,
      dialogVisible,
      searchForm,
      supplierForm,
      tableData,
      handleClose,
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
</style>