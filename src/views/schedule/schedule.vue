<template>
  <div class="front">
    <el-form :model="searchForm" label-width="120px">
      <el-form-item class="input" label="直播店铺">
        <el-input v-model="searchForm.name" />
      </el-form-item>
    </el-form>
    <el-button class="search" type="primary">查询</el-button>
  </div>


  <div class="tail">
    <div class="tail-action">
      <el-button type="primary" @click="dialogVisible1 = true">新增排班</el-button>
    </div>
    <el-table :data="tableData()" border style="width: 100%">
      <el-table-column prop="scheduleCode" label="排班编号" min-width="60" />
      <el-table-column prop="scheduleName" label="直播店铺" min-width="60" />
      <el-table-column prop="contactPerson" label="直播间编号" min-width="60" />
      <el-table-column prop="startTime" label="直播开始时间" min-width="100" />
      <el-table-column prop="endTime" label="直播结束时间" min-width="100" />
      <el-table-column prop="streamHostId" label="主播" min-width="60" />
      <el-table-column prop="streamShift" label="直播班次" min-width="60" />
      <el-table-column prop="status" label="排班状态" width="100" :filters="[
        { text: '进行中', value: 0 },
        { text: '已结束', value: 1 },
      ]" :filter-method="filterTag" filter-placement="bottom-end">
        <template #default="scope">
          <el-tag :type="scope.row.status == 0 ? 'success' : 'danger'" disable-transitions>{{ scope.row.status == 0 ? '进行中'
            : '已结束'
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="deductionPoints" label="预设扣点" min-width="60" />
      <el-table-column prop="remark" label="直播间联系人" min-width="60" />
      <el-table-column prop="telephone" label="排直播间联系号码" min-width="70" />
      <el-table-column prop="createBy" label="货主卖手" min-width="60" />
      <el-table-column fixed="right" label="操作" min-width="60">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="handleOpenEdit(scope.row)">修改</el-button>
          <el-button link type="primary" size="small" @click="openDetails(scope.row)">详情</el-button>
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
    <div>
      <el-drawer v-model="drawer" title="排班详情" :direction="direction" >
        <el-descriptions border size="large" direction="vertical" title="排班基本信息">
          <el-descriptions-item label="直播店铺">{{rowDetails.streamPlatform}}</el-descriptions-item>
          <el-descriptions-item label="代购费"><el-tag size="small">50</el-tag></el-descriptions-item>
          <el-descriptions-item label="直播班次">{{rowDetails.streamShift}}</el-descriptions-item>
          <el-descriptions-item label="播货开始时间">{{rowDetails.startTime}}</el-descriptions-item>
          <el-descriptions-item label="播货结束时间">{{rowDetails.endTime}}</el-descriptions-item>
          <el-descriptions-item label="扣点比例">{{rowDetails.deductionPoints}}</el-descriptions-item>
          <el-descriptions-item label="添加时间">{{rowDetails.createTime}}</el-descriptions-item>
          <el-descriptions-item label="添加人">{{rowDetails.createBy}}</el-descriptions-item>
          <el-descriptions-item label="修改时间">{{rowDetails.updateTime}}</el-descriptions-item>
          <el-descriptions-item label="修改人">{{rowDetails.updateBy}}</el-descriptions-item>
        </el-descriptions>

        <el-descriptions border size="large" direction="vertical" title="直播人员信息" style="margin-top: 50px;">
          <el-descriptions-item label="售前客服"><el-tag size="small">张三</el-tag></el-descriptions-item>
          <el-descriptions-item label="直播助理"><el-tag size="small">张三</el-tag></el-descriptions-item>
          <el-descriptions-item label="场控"><el-tag size="small">张三</el-tag></el-descriptions-item>
          <el-descriptions-item label="主播"><el-tag size="small">张三</el-tag></el-descriptions-item>
          <el-descriptions-item label="其他人员"><el-tag size="small">张三</el-tag></el-descriptions-item>

        </el-descriptions>
      </el-drawer>
    </div>
    <el-dialog v-model="dialogVisible1" title="新建客户" width="30%" :close-on-click-modal="true" :show-close="false">
      <div>
        <el-form :model="scheduleForm" label-width="120px" :rules="scheduleRules">
          <el-form-item label="客户编码" prop="scheduleCode" :required="true">
            <el-input v-model="scheduleForm.scheduleCode" />
          </el-form-item>
          <el-form-item label="客户名字" prop="scheduleName" :required="true">
            <el-input v-model="scheduleForm.scheduleName" />
          </el-form-item>
          <el-form-item label="备注" :required="true">
            <el-input v-model="scheduleForm.remark" />
          </el-form-item>
          <el-form-item label="手机号" :required="true">
            <el-input v-model="scheduleForm.telephone" />
          </el-form-item>
          <el-form-item label="联系人" :required="true">
            <el-input v-model="scheduleForm.contactPerson" />
          </el-form-item>
          <el-form-item label="客户类型" :required="true">
            <el-input v-model="scheduleForm.scheduleType" />
          </el-form-item>
          <el-form-item label="出借金额上限" :required="true">
            <el-input v-model="scheduleForm.lendMoneyLimit" />
          </el-form-item>
          <el-form-item label="出借数量上限" :required="true">
            <el-input v-model="scheduleForm.lendAmountLimit" />
          </el-form-item>
          <el-form-item label="地址" :required="true">
            <el-input v-model="scheduleForm.address" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取消</el-button>
          <el-button type="primary" @click="handleAddSchedule">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogVisible2" title="编辑仓位" width="30%" :before-close="handleClose" :show-close="false">
      <div>
        <el-form :model="scheduleForm" label-width="120px">
          <el-form-item label="客户编码" prop="scheduleCode" :required="true">
            <el-input v-model="scheduleForm.scheduleCode" />
          </el-form-item>
          <el-form-item label="客户名字" prop="scheduleName" :required="true">
            <el-input v-model="scheduleForm.scheduleName" />
          </el-form-item>
          <el-form-item label="备注" :required="true">
            <el-input v-model="scheduleForm.remark" />
          </el-form-item>
          <el-form-item label="手机号" :required="true">
            <el-input v-model="scheduleForm.telephone" />
          </el-form-item>
          <el-form-item label="出借金额上限" :required="true">
            <el-input v-model="scheduleForm.lendMoneyLimit" />
          </el-form-item>
          <el-form-item label="出借数量上限" :required="true">
            <el-input v-model="scheduleForm.lendAmountLimit" />
          </el-form-item>
          <el-form-item label="地址" :required="true">
            <el-input v-model="scheduleForm.address" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取消</el-button>
          <el-button type="primary" @click="handleUpdateSchedule">
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
import { getScheduleList,addSchedule } from '@/api/schedule'

export default defineComponent({
  name: "UserRole",
  components: {},

  setup() {
    const drawer = ref(false)
    const dialogVisible1 = ref(false)
    const dialogVisible2 = ref(false)
    const scheduleData = reactive({
      data: [],
    });
    const scheduleForm = reactive({
      scheduleName: '',
      scheduleCode: '',
      remark: '',
      status: 0,

    });
    const searchForm = reactive({
      name: '',

    });
    const rowDetails=ref({
      streamShift:'',
      streamPlatform:'',
      createBy:'',
      createTime:'',
      startTime: "2023-07-05 08:00:00",
			endTime: "2023-07-06 08:00:00",
      updateBy: "",
			updateTime: null,
      deductionPoints:1,
    })

    const scheduleRules = reactive({
      scheduleName: [{ required: true, message: '请输入内容', trigger: 'blur' },
      { min: 3, max: 10, message: '账号长度 在 3 到 10长度之间', trigger: 'blur' }],
      scheduleCode: [{ required: true, message: '请输入内容', trigger: 'blur' },
      { min: 3, max: 10, message: '账号长度 在 3 到 10长度之间', trigger: 'blur' }],
    });


    //表格用到的参数
    let state = reactive({
      data: {
        page: 1,
        limit: 10,
        total: scheduleData.data.length,
      }
    });

    const filterTag = (value, row) => {
      return row.status == value
    }
    onMounted(() => {
      handleGetScheduleList(state.data.page, state.data.limit)
    })


    const handleGetScheduleList = (page, limit) => {
      getScheduleList(page, limit).then((res) => {
        scheduleData.data = res.rows
        state.data.total = res.total
      })
    }
    const tableData = () => {
      return scheduleData.data
    };
    //改变页码
    const handleCurrentChange = (e) => {
      state.page = e;
      handleGetScheduleList(e, state.data.limit)
    };
    //改变页数限制
    const handleSizeChange = (e) => {
      state.limit = e;
      handleGetScheduleList(state.data.page, e)
    };

    //添加排班
    const handleAddSchedule = () => {
      ElMessageBox.confirm('确认提交?')
        .then(() => {
          addSchedule(scheduleForm).then(() => {
            dialogVisible1.value = false
            handleGetScheduleList(state.data.page, state.data.limit)
          })
        })
        .catch(() => {
          // catch error
        })

    }

    const openDetails = (row) => { //删除仓位
      drawer.value = true
      rowDetails.value=row
    }

    const handleOpenEdit = (data) => { //打开编辑仓位
      dialogVisible2.value = true
      scheduleForm.scheduleCode = data.scheduleCode
      scheduleForm.scheduleName = data.scheduleName
      scheduleForm.remark = data.remark
      scheduleForm.maxCap = data.maxCap
      scheduleForm.id = data.id
    }

    const handleUpdateSchedule = () => {  //编辑仓位
      ElMessageBox.confirm('确认提交?')
        .then(() => {
          updateSchedule(scheduleForm).then(() => {
            dialogVisible2.value = false
            handleGetScheduleList(state.data.page, state.data.limit)
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
      scheduleData,drawer,rowDetails,
      dialogVisible1,
      dialogVisible2,
      searchForm,
      scheduleForm,
      scheduleRules,
      tableData, filterTag,
      handleCurrentChange,
      handleSizeChange,
      handleClose,
      openDetails, handleAddSchedule, handleGetScheduleList, handleUpdateSchedule,
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

  /deep/ .form-add-checkbox-item {
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