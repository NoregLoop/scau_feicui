<template>
  <div class="front">
    <el-form :model="searchForm" label-width="120px">
      <el-form-item class="input" label="供应商名字">
        <el-input v-model="searchForm.name" />
      </el-form-item>
    </el-form>
    <el-button class="search" type="primary">查询</el-button>
  </div>


  <div class="tail">
    <div class="tail-action">
      <el-button type="primary" @click="dialogVisible1 = true">新增供应商</el-button>
    </div>
    <el-table :data="tableData()" border style="width: 100%">
      <el-table-column prop="supplierCode" label="供应商编码" min-width="60" />
      <el-table-column prop="supplierName" label="供应商名称" min-width="60" />
      <el-table-column prop="contactPerson" label="联系人" min-width="60" />
      <el-table-column prop="bankAccountName" label="账户名" min-width="60" />
      <el-table-column prop="bankAccount" label="账户账号" min-width="60" />
      <el-table-column prop="address" label="地址" min-width="60" />
      <el-table-column prop="telephone" label="手机号" min-width="60" />
      <el-table-column prop="createTime" label="创建时间" min-width="60" />
      <el-table-column prop="remark" label="备注" min-width="60" />
      <el-table-column fixed="right" label="Operations" min-width="60">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleOpenEdit(scope.row)">编辑</el-button>
          <el-button link type="primary" size="small" @click="handleDeleteRole(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination v-model:current-page="data.page" v-model:page-size="data.limit"
        layout="prev, pager, next ,total,sizes" :total="data.total" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" />
    </div>
  </div>

  <div class="dialog-list">
    <el-dialog v-model="dialogVisible1" title="新建供应商" width="30%" :close-on-click-modal="true" :show-close="false">
      <div>
        <el-form :model="supplierForm" label-width="120px" :rules="supplierRules">
          <el-form-item label="供应商编码" prop="supplierCode" :required="true">
            <el-input v-model="supplierForm.supplierCode" />
          </el-form-item>
          <el-form-item label="供应商名字" prop="supplierName" :required="true">
            <el-input v-model="supplierForm.supplierName" />
          </el-form-item>
          <el-form-item label="备注" :required="true">
            <el-input v-model="supplierForm.remark" />
          </el-form-item>
          <el-form-item label="手机号" :required="true">
            <el-input v-model="supplierForm.telephone" />
          </el-form-item>
          <el-form-item label="联系人" :required="true">
            <el-input v-model="supplierForm.contactPerson" />
          </el-form-item>
          <el-form-item label="账户名" :required="true">
            <el-input v-model="supplierForm.bankAccountName" />
          </el-form-item>
          <el-form-item label="账户账号" :required="true">
            <el-input v-model="supplierForm.bankAccount" />
          </el-form-item>
          <el-form-item label="地址" :required="true">
            <el-input v-model="supplierForm.address" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="handleAddSupplier">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogVisible2" title="编辑仓位" width="30%" :before-close="handleClose" :show-close="false">
      <div>
        <el-form :model="supplierForm" label-width="120px">
          <el-form-item label="供应商编码" prop="supplierCode" :required="true">
            <el-input v-model="supplierForm.supplierCode" />
          </el-form-item>
          <el-form-item label="供应商名字" prop="supplierName" :required="true">
            <el-input v-model="supplierForm.supplierName" />
          </el-form-item>
          <el-form-item label="备注" :required="true">
            <el-input v-model="supplierForm.remark" />
          </el-form-item>
          <el-form-item label="手机号" :required="true">
            <el-input v-model="supplierForm.telephone" />
          </el-form-item>
          <el-form-item label="账户名" :required="true">
            <el-input v-model="supplierForm.bankAccountName" />
          </el-form-item>
          <el-form-item label="账户账号" :required="true">
            <el-input v-model="supplierForm.bankAccount" />
          </el-form-item>
          <el-form-item label="地址" :required="true">
            <el-input v-model="supplierForm.address" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取消</el-button>
          <el-button type="primary" @click="handleUpdateSupplier">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>
     
<script >
import { ref, defineComponent, reactive, toRefs, } from "vue";
import { ElMessageBox, ElMessage } from 'element-plus'
import { onMounted } from "vue";
import { getSupplierList, addSupplier, deleteSupplier, updateSupplier } from '@/api/user'

export default defineComponent({
  name: "UserRole",
  components: {},

  setup() {
    let supplierData = reactive({
      data: [],
    });
    const supplierForm = reactive({
      supplierName: '',
      supplierCode: '',
      remark: '',
      status: 0,
      createTime: '',
      bankAccountName: '',
      bankAccount: '',
      telephone: '',
      address: '',
      contactPerson: '',
      deptId: "1",
      id: '',
    });
    const searchForm = reactive({
      name: '',

    });
    let dialogVisible1 = ref(false)
    const dialogVisible2 = ref(false)
    const supplierRules = reactive({
      supplierName: [{ required: true, message: '请输入内容', trigger: 'blur' },
      { min: 3, max: 10, message: '账号长度 在 3 到 10长度之间', trigger: 'blur' }],
      supplierCode: [{ required: true, message: '请输入内容', trigger: 'blur' },
      { min: 3, max: 10, message: '账号长度 在 3 到 10长度之间', trigger: 'blur' }],
    });


    //表格用到的参数
    let state = reactive({
      data: {
        page: 1,
        limit: 10,
        total: supplierData.data.length,
      }
    });

    const filterTag = (value, row) => {
      return row.status == value
    }
    onMounted(() => {
      handleGetSupplierList(state.data.page, state.data.limit)
    })


    const handleGetSupplierList = (page, limit) => {
      getSupplierList(page, limit).then((res) => {
        supplierData.data = res.rows
        state.data.total = res.total
      })
    }
    const tableData = () => {
      return supplierData.data
    };
    //改变页码
    const handleCurrentChange = (e) => {
      state.page = e;
      handleGetSupplierList(e, state.data.limit)
    };
    //改变页数限制
    const handleSizeChange = (e) => {
      state.limit = e;
      handleGetSupplierList(state.data.page, e)
    };

    //添加仓位
    const handleAddSupplier = () => {
      ElMessageBox.confirm('确认提交?')
        .then(() => {
          addSupplier(supplierForm).then(() => {
            dialogVisible1.value = false
            handleGetSupplierList(state.data.page, state.data.limit)
          })
        })
        .catch(() => {
          // catch error
        })

    }

    const handleDeleteRole = (supplierId) => { //删除仓位
      ElMessageBox.confirm(
        '是否要删除该用户?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(() => {
          deleteSupplier(supplierId).then(() => {
            handleGetSupplierList(state.data.page, state.data.limit)
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
          })
        }).catch(() => {
          ElMessage({
            type: 'info',
            message: '取消操作',
          })
        })
    }

    const handleOpenEdit = (data) => { //打开编辑仓位
      dialogVisible2.value = true
      supplierForm.supplierCode = data.supplierCode
      supplierForm.supplierName = data.supplierName
      supplierForm.remark = data.remark
      supplierForm.maxCap = data.maxCap
      supplierForm.id = data.id
    }

    const handleUpdateSupplier = () => {  //编辑仓位
      ElMessageBox.confirm('确认提交?')
        .then(() => {
          updateSupplier(supplierForm).then(() => {
            dialogVisible2.value = false
            handleGetSupplierList(state.data.page, state.data.limit)
          })
        })
        .catch(() => {
          // catch error
        })
    }
    const handleClose = (e) => { //提交表单
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
      dialogVisible1,
      dialogVisible2,
      searchForm,
      supplierForm,
      supplierRules,
      tableData, filterTag,
      handleCurrentChange,
      handleSizeChange,
      handleClose,
      handleDeleteRole, handleAddSupplier, handleGetSupplierList, handleUpdateSupplier,
      handleOpenEdit,
      ...toRefs(state),
    };
  },
});
</script>
    
<style rel="stylesheet/scss" lang="scss" scoped>
.front {
  background-color: #fff;
  padding: 10px;
  display: flex;

  .input {
    float: left;
  }

  .search {
    margin-left: 50px;
  }
}

.center {
  margin: 10px;
}

.form-add-checkbox {
  width: 200px;
  height: 260px;
  display: block;
  border: solid 1px #c9c9c9;

  .form-add-checkbox-item {
    width: 180px;
    margin: auto;
  }
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