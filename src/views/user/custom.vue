<template>
  <div class="front">
    <el-form :model="searchForm" label-width="120px">
      <el-form-item class="input" label="客户名字">
        <el-input v-model="searchForm.name" />
      </el-form-item>
    </el-form>
    <el-button class="search" type="primary">查询</el-button>
  </div>


  <div class="tail">
    <div class="tail-action">
      <el-button type="primary" @click="dialogVisible1 = true">新增客户</el-button>
    </div>
    <el-table :data="tableData()" border style="width: 100%">
      <el-table-column prop="clientCode" label="客户编码" min-width="60" />
      <el-table-column prop="clientName" label="客户名称" min-width="60" />
      <el-table-column prop="contactPerson" label="联系人" min-width="60" />
      <el-table-column prop="clientType" label="客户类型" min-width="60" />
      <el-table-column prop="lendMoneyLimit" label="出借金额上限" min-width="60" />
      <el-table-column prop="lendAmountLimit" label="出借数量上限" min-width="60" />
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
    <el-dialog v-model="dialogVisible1" title="新建客户" width="30%" :close-on-click-modal="true" :show-close="false">
      <div>
        <el-form :model="clientForm" label-width="120px" :rules="clientRules">
          <el-form-item label="客户编码" prop="clientCode" :required="true">
            <el-input v-model="clientForm.clientCode" />
          </el-form-item>
          <el-form-item label="客户名字" prop="clientName" :required="true">
            <el-input v-model="clientForm.clientName" />
          </el-form-item>
          <el-form-item label="备注" :required="true">
            <el-input v-model="clientForm.remark" />
          </el-form-item>
          <el-form-item label="手机号" :required="true">
            <el-input v-model="clientForm.telephone" />
          </el-form-item>
          <el-form-item label="联系人" :required="true">
            <el-input v-model="clientForm.contactPerson" />
          </el-form-item>
          <el-form-item label="客户类型" :required="true">
            <el-input v-model="clientForm.clientType" />
          </el-form-item>
          <el-form-item label="出借金额上限" :required="true">
            <el-input v-model="clientForm.lendMoneyLimit" />
          </el-form-item>
          <el-form-item label="出借数量上限" :required="true">
            <el-input v-model="clientForm.lendAmountLimit" />
          </el-form-item>
          <el-form-item label="地址" :required="true">
            <el-input v-model="clientForm.address" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="handleAddClient">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogVisible2" title="编辑仓位" width="30%" :before-close="handleClose" :show-close="false">
      <div>
        <el-form :model="clientForm" label-width="120px">
          <el-form-item label="客户编码" prop="clientCode" :required="true">
            <el-input v-model="clientForm.clientCode" />
          </el-form-item>
          <el-form-item label="客户名字" prop="clientName" :required="true">
            <el-input v-model="clientForm.clientName" />
          </el-form-item>
          <el-form-item label="备注" :required="true">
            <el-input v-model="clientForm.remark" />
          </el-form-item>
          <el-form-item label="手机号" :required="true">
            <el-input v-model="clientForm.telephone" />
          </el-form-item>
          <el-form-item label="出借金额上限" :required="true">
            <el-input v-model="clientForm.lendMoneyLimit" />
          </el-form-item>
          <el-form-item label="出借数量上限" :required="true">
            <el-input v-model="clientForm.lendAmountLimit" />
          </el-form-item>
          <el-form-item label="地址" :required="true">
            <el-input v-model="clientForm.address" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取消</el-button>
          <el-button type="primary" @click="handleUpdateClient">
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
import { getClientList, addClient, deleteClient, updateClient } from '@/api/user'

export default defineComponent({
  name: "UserRole",
  components: {},

  setup() {
    let clientData = reactive({
      data: [],
    });
    const clientForm = reactive({
      clientName: '',
      clientCode: '',
      remark: '',
      status: 0,
      clientType: '',
      createTime: '',
      lendMoneyLimit: '',
      lendAmountLimit: '',
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
    const clientRules = reactive({
      clientName: [{ required: true, message: '请输入内容', trigger: 'blur' },
      { min: 3, max: 10, message: '账号长度 在 3 到 10长度之间', trigger: 'blur' }],
      clientCode: [{ required: true, message: '请输入内容', trigger: 'blur' },
      { min: 3, max: 10, message: '账号长度 在 3 到 10长度之间', trigger: 'blur' }],
    });


    //表格用到的参数
    let state = reactive({
      data: {
        page: 1,
        limit: 10,
        total: clientData.data.length,
      }
    });

    const filterTag = (value, row) => {
      return row.status == value
    }
    onMounted(() => {
      handleGetClientList(state.data.page, state.data.limit)
    })


    const handleGetClientList = (page, limit) => {
      getClientList(page, limit).then((res) => {
        clientData.data = res.rows
        state.data.total = res.total
      })
    }
    const tableData = () => {
      return clientData.data
    };
    //改变页码
    const handleCurrentChange = (e) => {
      state.page = e;
      handleGetClientList(e, state.data.limit)
    };
    //改变页数限制
    const handleSizeChange = (e) => {
      state.limit = e;
      handleGetClientList(state.data.page, e)
    };

    //添加仓位
    const handleAddClient = () => {
      ElMessageBox.confirm('确认提交?')
        .then(() => {
          addClient(clientForm).then(() => {
            dialogVisible1.value = false
            handleGetClientList(state.data.page, state.data.limit)
          })
        })
        .catch(() => {
          // catch error
        })

    }

    const handleDeleteRole = (clientId) => { //删除仓位
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
          deleteClient(clientId).then(() => {
            handleGetClientList(state.data.page, state.data.limit)
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
      clientForm.clientCode = data.clientCode
      clientForm.clientName = data.clientName
      clientForm.remark = data.remark
      clientForm.maxCap = data.maxCap
      clientForm.id = data.id
    }

    const handleUpdateClient = () => {  //编辑仓位
      ElMessageBox.confirm('确认提交?')
        .then(() => {
          updateClient(clientForm).then(() => {
            dialogVisible2.value = false
            handleGetClientList(state.data.page, state.data.limit)
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
      clientData,
      dialogVisible1,
      dialogVisible2,
      searchForm,
      clientForm,
      clientRules,
      tableData, filterTag,
      handleCurrentChange,
      handleSizeChange,
      handleClose,
      handleDeleteRole, handleAddClient, handleGetClientList, handleUpdateClient,
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