<template>
  <div class="front">
    <el-form :model="searchForm" label-width="120px">
      <el-form-item class="input" label="角色名称">
        <el-input v-model="searchForm.name" />
      </el-form-item>
    </el-form>
    <el-button class="search" type="primary">查询</el-button>
  </div>


  <div class="tail">
    <div class="tail-action">
      <el-button type="primary" @click="dialogVisible1 = true">新增</el-button>
      <el-button type="primary">启用</el-button>
    </div>
    <el-table :data="tableData()" border style="width: 100%">
      <el-table-column type="selection" min-width="40" />
      <el-table-column type="index" min-width="40" />
      <el-table-column prop="roleId" label="角色ID" min-width="60" />
      <el-table-column prop="roleName" label="角色名称" min-width="60" />
      <el-table-column prop="roleKey" label="角色权限" min-width="60" />
      <el-table-column prop="status" label="用户状态" width="100" :filters="[
        { text: '启用', value: 1 },
        { text: '停用', value: 0 },
      ]" :filter-method="filterTag" filter-placement="bottom-end">
        <template #default="scope">
          <el-tag :type="scope.row.status == 1 ?'success' :'danger' " disable-transitions>{{ scope.row.status==1?'启用':'停用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="60" />
      <el-table-column prop="createTime" label="创建时间" min-width="60" />
      <el-table-column fixed="right" label="Operations" min-width="60">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleOpenEdit">编辑</el-button>
          <el-button link type="primary" size="small" @click="handleDeleteRole(scope.row.roleId)">删除</el-button>
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
    <el-dialog v-model="dialogVisible1" title="新建角色" width="30%" :close-on-click-modal="true" :show-close="false">
      <div>
        <el-form :model="roleForm" label-width="120px" :rules="roleRules">
          <el-form-item label="角色名称" prop="roleName" :required="true">
            <el-input v-model="roleForm.roleName" />
          </el-form-item>
          <el-form-item label="权限字符" prop="roleName" :required="true">
            <el-input v-model="roleForm.roleKey" />
          </el-form-item>
          <el-form-item label="角色顺序" :required="true">
            <el-input v-model="roleForm.roleSort" />
          </el-form-item>
          <el-form-item label="角色权限">
            <el-checkbox-group v-model="roleForm.menuIds" class="form-add-checkbox">
              <el-checkbox label="001" class="form-add-checkbox-item">入库管理</el-checkbox>
              <el-checkbox label="002" class="form-add-checkbox-item">出库管理</el-checkbox>
              <el-checkbox label="003" class="form-add-checkbox-item">库存管理</el-checkbox>
              <el-checkbox label="004" class="form-add-checkbox-item">销售管理</el-checkbox>
              <el-checkbox label="005" class="form-add-checkbox-item">财务管理</el-checkbox>
              <el-checkbox label="006" class="form-add-checkbox-item">客户管理</el-checkbox>
              <el-checkbox label="007" class="form-add-checkbox-item">排班管理</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="handleAddRole">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogVisible2" title="编辑用户" width="30%" :before-close="handleClose" :show-close="false">
      <div>
        <el-form :model="roleForm" label-width="120px">
          <el-form-item label="用户名称">
            <el-input v-model="roleForm.userName" />
          </el-form-item>
          <el-form-item label="手机电话">
            <el-input v-model="roleForm.phone" />
          </el-form-item>
          <el-form-item label="用户账号">
            <el-input v-model="roleForm.account" />
          </el-form-item>
          <el-form-item label="用户密码">
            <el-input v-model="roleForm.password" />
          </el-form-item>
          <el-form-item label="角色选择">
            <el-select v-model="roleForm.role" placeholder="请选择该用户角色">
              <el-option label="采购" value="shanghai" />
              <el-option label="管理" value="beijing" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取消</el-button>
          <el-button type="primary" @click="dialogVisible2 = false">
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
import { addRole, getRoleList, deleteRole } from "@/api/auth"

export default defineComponent({
  name: "UserRole",
  components: {},

  setup() {
    let roleData = reactive({
      data: [],
    });
    const roleForm = reactive({
      roleName: '',
      roleKey: '',
      roleSort: '',
      menuIds: [],
      remark: '',
      status: 0,
      password: '',
    });
    const searchForm = reactive({
      name: '',

    });
    let dialogVisible1 = ref(false)
    const dialogVisible2 = ref(false)
    const roleRules = reactive({
      roleName: [{ required: true, message: '请输入内容', trigger: 'blur' },
      { min: 3, max: 10, message: '账号长度 在 3 到 10长度之间', trigger: 'blur' }],
    });


    //表格用到的参数
    let state = reactive({
      data: {
        page: 1,
        limit: 10,
        total: roleData.data.length,
      }
    });

    const filterTag = (value, row) => {
      return row.status == value
    }
    onMounted(() => {
      handleGetRoleList(state.data.page, state.data.limit)
    })


    const handleGetRoleList = (page, limit) => {
      getRoleList(page, limit).then((res) => {
        roleData.data = res.rows
        state.data.total = res.total
      })
    }
    const tableData = () => {
      return roleData.data
    };
    //改变页码
    const handleCurrentChange = (e) => {
      state.page = e;
      handleGetRoleList(e, state.data.limit)
    };
    //改变页数限制
    const handleSizeChange = (e) => {
      state.limit = e;
      handleGetRoleList(state.data.page, e)
    };

    //添加角色
    const handleAddRole = () => {
      ElMessageBox.confirm('确认提交?')
        .then(() => {
          addRole(roleForm).then(() => {
            dialogVisible1.value = false
            handleGetRoleList(state.data.page, state.data.limit)
          })
        })
        .catch(() => {
          // catch error
        })

    }

    const handleDeleteRole = (roleId) => { //删除角色
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
          deleteRole(roleId).then(() => {
            handleGetRoleList(state.data.page, state.data.limit)
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

    const handleOpenEdit = () => { //打开编辑角色
      dialogVisible2.value = true
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
      roleData,
      dialogVisible1,
      dialogVisible2,
      searchForm,
      roleForm,
      roleRules,
      tableData,filterTag,
      handleCurrentChange,
      handleSizeChange,
      handleClose,
      handleDeleteRole, handleAddRole, handleGetRoleList,
      handleOpenEdit,
      ...toRefs(state),
    };
  },
});
</script>
    
<style rel="stylesheet/scss" lang="scss">
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