<template>
  <div class="front">
    <el-form :model="searchForm" label-width="120px">
      <el-form-item class="input" label="手机号">
        <el-input v-model="searchForm.userName" />
      </el-form-item>
      <el-form-item class="input" label="用户名">
        <el-input v-model="searchForm.nickName" />
      </el-form-item>
    </el-form>
    <el-button class="search" type="primary" @click="handleSearch">查询</el-button>
  </div>

  <div class="tail">
    <div class="tail-action">
      <el-button type="primary" @click="dialogVisible1 = true">新增用户</el-button>
      <el-button type="primary" @click="handleChangeStatus">启用/停用</el-button>
    </div>
    <el-table :data="tableData()" border style="width: 100%" @select="selectUser">
      <el-table-column type="selection" min-width="40" />
      <el-table-column type="index" lable="序号" min-width="40" />
      <el-table-column prop="userId" label="用户ID" min-width="60" />
      <el-table-column prop="userName" label="手机号" min-width="60" />
      <el-table-column prop="nickName" label="用户名" min-width="60" />
      <el-table-column prop="roleName" label="角色" min-width="60" :formatter="roleData"/>
      <el-table-column prop="status" label="用户状态" width="100" :filters="[
        { text: '停用', value: 0 },
        { text: '启用', value: 1 },
      ]" :filter-method="filterTag" filter-placement="bottom-end">
        <template #default="scope">
          <el-tag :type="scope.row.status == 0 ? 'success' : 'danger'" disable-transitions>{{ scope.row.status == 1 ? '停用'
            : '启用'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" min-width="60" />
      <el-table-column prop="createTime" label="创建时间" min-width="60" />
      <el-table-column fixed="right" label="Operations" width="120PX">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="openUpdate(scope.row)">编辑</el-button>
          <el-button link type="primary" size="small" @click="handleDeleteUser(scope.row.userId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination v-model:current-page="data.page" v-model:page-size="data.limit"
        layout="prev, pager, next ,total,sizes" v-model:total="data.total" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" />
    </div>
  </div>

  <div class="dialog-list">
    <el-dialog v-model="dialogVisible1" title="新增用户" width="30%" :show-close="false" :close-on-click-modal="true">
      <div>
        <el-form :model="userForm" label-width="120px" :rules="userRules">
          <el-form-item label="手机号" prop="userName" :required="true">
            <el-input v-model="userForm.userName" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="用户名" prop="nickName" :required="true">
            <el-input v-model="userForm.nickName" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="userForm.remark" />
          </el-form-item>
          <el-form-item label="用户密码" :required="true">
            <el-input v-model="userForm.password" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="角色选择">
            <el-select v-model="userForm.roleIds" placeholder="请选择该用户角色">
              <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="handleAddUser">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogVisible2" title="编辑用户" width="30%" :show-close="false">
      <div>
        <el-form :model="userForm" label-width="120px">
          <el-form-item label="手机号">
            <el-input v-model="userForm.userName" />
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="userForm.nickName" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="userForm.remark" />
          </el-form-item>
          <el-form-item label="角色选择">
            <el-select v-model="userForm.roleIds" placeholder="请选择该用户角色">
              <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取消</el-button>
          <el-button type="primary" @click="handleUpdateUser()">
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
import { addUser, getUserList, deleteUser, getRoleList, updateUser, search, changeStatus } from '@/api/auth'
import { onMounted, onBeforeMount } from "vue";

export default defineComponent({
  name: "User",
  components: {},

  setup() {
    let userData = reactive({//表格数据
      data: [],
    });

    const roleList = ref([])
    const searchForm = reactive({
      userName: '',
      nickName: '',
      status: 0,
    });
    const userForm = reactive({
      userName: '',
      nickName: '',
      remark: '',
      password: '',
      roleIds: [3],
      status: 0,
      deptId: 1,
      userId: 0,
    });
    let statusForm = reactive({
      data: {
        userId: 0,
        status: 0,
      }
    });
    const clearForm = () => {
    }
    const filterTag = (value, row) => {
      return row.status == value
    }
    const roleData=(row)=>{
      
      let role=''
      row.roles.forEach((item, index)=>{
        role=role+item.roleName+','
      })
      return role.substring(0, role.length - 1);
    }
    onBeforeMount(() => {//获取数据
      getRoleList().then((res) => {
        roleList.value = res.rows
      })
    })

    onMounted(() => {
      handleGetUserList(state.data.page, state.data.limit)
    })

    let dialogVisible1 = ref(false)
    const dialogVisible2 = ref(false)
    const userRules = reactive({
      userName: [{ required: true, message: '此项不能为空', trigger: 'blur' },
      {
        type: 'number',
        message: '手机号格式不正确',
        trigger: 'blur',
        transform(value) {
          var phonereg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
          if (!phonereg.test(value)) {
            return false
          } else {
            return Number(value)
          }
        }
      }],
      nickName: [{ required: true, message: '此项不能为空', trigger: 'blur' },
      { min: 2, max: 10, message: '长度 在 5 到 10长度之间', trigger: 'blur' }],
    });

    //表格用到的参数
    let state = reactive({
      data: {
        page: 1,
        limit: 10,
        total: userData.data.length,
      }
    });
    //分页处理
    const tableData = () => {
      return userData.data

    };
    const handleCurrentChange = (e) => {//改变页码
      state.data.page = e;
      handleGetUserList(e, state.data.limit)
    }; 
    const handleSizeChange = (e) => {//改变页数限制
      state.data.limit = e;
      handleGetUserList(state.data.page, e)
    };


    const selectUser = (select, row) => {
      statusForm.data.userId = row.userId
      row.status == 0 ? statusForm.data.status = '1' : statusForm.data.status = '0'
    };

    const handleChangeStatus = () => {
      changeStatus(statusForm.data).then(() => {
        handleGetUserList(state.data.page, state.data.limit)
      })
    };


    const handleSearch = () => {
      search(state.data.page, state.data.limit, searchForm.userName, searchForm.nickName).then((res) => {
        userData.data = res.rows
        state.data.total = res.total
      })
    }
    const handleGetUserList = (page, limit) => {//获取用户列表
      getUserList(page, limit).then((res) => {
        userData.data = res.rows
        state.data.total = res.total
      })
    }

    const handleAddUser = () => {    //添加用户
      ElMessageBox.confirm('确认提交?')
        .then(() => {
          let t = userForm.roleIds
          userForm.roleIds = [t]
          addUser(userForm).then(() => {
            dialogVisible1.value = false
            handleGetUserList(state.data.page, state.data.limit)
          }).catch(() => {
            ElMessage.error('提交失败')
          })
        })
        .catch(() => {

        })

    }
    const handleUpdateUser = () => {  //修改用户
      ElMessageBox.confirm('确认提交?')
        .then(() => {
          updateUser(userForm).then(() => {
            dialogVisible2.value = false
            handleGetUserList(state.data.page, state.data.limit)
          })
        })
        .catch(() => {
          // catch error
        })
    }
    const openUpdate = (data) => {
      dialogVisible2.value = true
      userForm.nickName = data.nickName
      userForm.userName = data.userName
      userForm.remark = data.remark
      userForm.userId = data.userId
    }

    const handleDeleteUser = (userId) => {    //删除用户
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
          deleteUser(userId).then(() => {
            handleGetUserList(state.data.page, state.data.limit)
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

    return {
      userData,
      dialogVisible1, dialogVisible2,
      searchForm, userForm,
      roleList, userRules,
      tableData, clearForm, filterTag, selectUser,roleData,
      handleCurrentChange,
      handleSizeChange, openUpdate, handleSearch, handleChangeStatus,
      handleDeleteUser, handleAddUser, handleGetUserList, handleUpdateUser,
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