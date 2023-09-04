<template>
  <div class="front">
    <el-collapse v-model="activeNames" class="front-collapse"
      @change="activeNames = !activeNames; collapseName == '收起' ? collapseName = '展开' : collapseName = '收起'"
      style="width: 100%;">
      <el-collapse-item :title="collapseName" class="collapse-1" name="1">
        <el-form :model="searchForm" label-width="120px">
          <el-form-item label="出库单号" class="front-input">
            <el-input v-model="searchForm.orderCode" />
          </el-form-item>
          <el-form-item label="货品条码" class="front-input">
            <el-input v-model="searchForm.jadeCode" />
          </el-form-item>
          <el-form-item label="所属仓库" class="front-input">
            <el-select v-model="searchForm.desWarehouseId" placeholder="搜索匹配" style="">
              <el-option v-for="item in warehouseList" :key="item.id" :label="item.warehouseName" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商" class="front-input">
            <el-select v-model="searchForm.supplierId" placeholder="搜索匹配" style="" prop="supplierId">
              <el-option v-for="item in supplierList" :key="item.id" :label="item.supplierName" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>

  <!-- <div class="center">
      <el-col>
        <el-text class="center-data">出库总数量</el-text>
        <el-text class="center-data">出库总成本价</el-text>
      </el-col>
    </div> -->

  <div class="tail">
    <div class="tail-action">
      <el-button type="primary">导出明细</el-button>
      <el-button type="primary">打印明细</el-button>
    </div>
    <el-table :data="tableData()" border style="width: 100%" :max-height="collapseName == '收起' ? 400 :700">
      <template v-slot:empty>
        <div class="no-data">暂无数据</div>
      </template>
      <el-table-column v-for="item in outboundDataColumn.data" :prop="item.prop" :min-width="item.minWidth"
        :width="item.width" :max-width="item.maxWidth" :label="item.label" />
      <el-table-column width="100px">
        <template #header>
          <el-popover placement="bottom" trigger="click">
            <template #reference>
              <el-button size="small">显示设置</el-button>
            </template>
            <el-checkbox-group v-model="selectedFilters.data">
              <el-checkbox v-for="item in tableFilter.data" :label="item.label" @change="filterColumns"
                :disabled="item.isdisabled" />
            </el-checkbox-group>
          </el-popover>
        </template>
        <template #default="scope" style="flex: auto;">
          <el-button link type="primary" size="small" @click="openDetails(scope.row)">查看明细</el-button>
          <el-button link type="primary" size="small">编辑备注</el-button>
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
      <el-drawer v-model="drawer"  :direction="direction" size="35%">
        <el-descriptions border size="large" direction="vertical" title="出库单详情">
          <el-descriptions-item label="出库单号">{{rowDetails.orderCode}}</el-descriptions-item>
          <el-descriptions-item label="数量">{{rowDetails.jadeWeight}}</el-descriptions-item>
          <el-descriptions-item label="供应商" width="150">{{rowDetails.supplierName}}</el-descriptions-item>
          <el-descriptions-item label="客户名字">{{rowDetails.clientName}}</el-descriptions-item>
          <el-descriptions-item label="仓位名字" width="150">{{rowDetails.storageName}}</el-descriptions-item>
          <el-descriptions-item label="仓库名字">{{rowDetails.warehouseName}}</el-descriptions-item>
          <el-descriptions-item label="入库时间">{{rowDetails.createTime}}</el-descriptions-item>
          <el-descriptions-item label="添加人">{{rowDetails.createBy}}</el-descriptions-item>
          <el-descriptions-item label="修改时间">{{rowDetails.updateTime}}</el-descriptions-item>
          <el-descriptions-item label="修改人">{{rowDetails.updateBy}}</el-descriptions-item>
        </el-descriptions>
      </el-drawer>
    </div>
  </div>
</template>
  
<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import '@/mock/outbound.js'
import { onMounted } from "vue";
import { getOutboundOrderList, getUserList, } from '@/api/outbound'
import { getSupplierList } from "@/api/user"
import { onBeforeMount } from "vue";
import { getWarehouseList} from '@/api/setting';


export default defineComponent({
  name: "HomeView",
  components: {},
  setup() {
    const rowDetails=ref({})
    const drawer = ref(false)
    const searchForm = reactive({  //出库搜索表单
      jadeCode:'',
      orderCode:'',
      barcode: '',
      supplierId: '',
      desWarehouseId: '',
      count: 0,

    })
    const outboundOrderData = ref([]);
    const supplierList = ref([])//供应商列表
    const clientList = ref([])//客户列表
    const warehouseList=ref([])//仓库列表
    const selectedFilters = reactive({
      data: []
    })
    const outboundDataColumn = reactive({
      data: [
      ]
    })
    const tableFilter = reactive({//表头自定义数组
      data: [
        { label: '出库单单号', prop: 'orderCode', width: '230', isdisabled: true, isSelected: true },
        { label: '数量', prop: 'jadeWeight', width: '60', isSelected: true },
        { label: '出库类型', prop: 'orderType', width: '100', isdisabled: true, isSelected: true },
        { label: '出库人员', prop: 'processorId', width: '100', isdisabled: true, isSelected: true },
        { label: '出库客户', prop: 'clientId', width: '100', isdisabled: true, isSelected: true },
        { label: '出库总销售价', prop: 'jadeSoldPrice', width: '110', isdisabled: true, isSelected: true },
        { label: '到期时间', prop: 'validDate', minWidth: '100', isdisabled: true, isSelected: true },
        { label: '出库时间', prop: 'createTime', minWidth: '100', isdisabled: true, isSelected: true },
        { label: '备注', prop: 'remark', minWidth: '80', maxWidth: '80', isSelected: true },
        { label: '测试1', prop: 'test1', minWidth: '80', maxWidth: '80', isSelected: false },
        { label: '测试2', prop: 'test2', minWidth: '80', maxWidth: '80', isSelected: false },
      ]
    })

    const collapseName = ref('展开');
    const activeNames = ref(false)

    //表格用到的参数
    const state = reactive({//表格用到的参数
      data: {
        page: 1,
        limit: 10,
        total: outboundOrderData.value.length,
      }
    });


    //前端限制分页（tableData为当前展示页表格）
    const tableData = () => {
      return outboundOrderData.value
    };
    //改变页码
    const handleCurrentChange = (e) => {
      state.data.page = e;
    };
    //改变页数限制
    const handleSizeChange = (e) => {
      state.data.limit = e;
    };
    const handleGetOutboundOrderList = (page, limit) => {//获取用户列表
      getOutboundOrderList(page, limit).then((res) => {
        outboundOrderData.value = res.rows
        state.data.total = res.total
      })

    }
    onBeforeMount(() => {
      handleGetOutboundOrderList(state.data.page, state.data.limit)
      getSupplierList().then((res) => {
        supplierList.value = res.rows
      })
      getWarehouseList().then((res) => {
        warehouseList.value = res.rows
      })
    })
    onMounted(() => {
      tableFilter.data.forEach(function (item, index) {
        if (item.isSelected) {
          selectedFilters.data.push(item.label)
          outboundDataColumn.data.push(item)
        }
      })
    })
    const onSearch = () => {
      getOutboundOrderList(state.data.page, state.data.limit, searchForm.orderCode, searchForm.supplierId, searchForm.desWarehouseId).then((res) => {
        outboundOrderData.value = res.rows
        state.data.total = res.total
      })
    }

    const filterColumns = () => {//监听筛选器，实现列的动态增删
      let temp = []
      tableFilter.data.forEach(item_t => {
        selectedFilters.data.forEach(item_s => {
          if (item_t.label == item_s) {
            temp.push(item_t)
          }

        })
      })

      outboundDataColumn.data = temp
    }

    const openDetails = (row) => { //删除仓位
      drawer.value = true
      rowDetails.value=row
    }

    return {
      outboundOrderData, clientList, supplierList,
      searchForm,rowDetails,drawer,warehouseList, supplierList,
      collapseName,
      activeNames,
      outboundDataColumn, selectedFilters, tableFilter,
      tableData,
      filterColumns,
      handleCurrentChange,openDetails, onSearch,
      handleSizeChange, handleGetOutboundOrderList,
      ...toRefs(state),
    };
  },
});


</script>
  #F8F8F8
  
<style rel="stylesheet/scss" lang="scss" scoped>
.front {
  background-color: #fff;
  padding: 10px;

  .front-input {
    width: 320px;
  }
}

.el-collapse-item__content {
  border-bottom-width: 0;
}

.center {
  margin-top: 10px;
  // border-top: 1px solid var(--el-border-color);
  // border-bottom: 1px solid var(--el-border-color);
}

.tail {
  background-color: #FFF;
  margin-top: 40px;
  padding: 10px;
}

.tail-action {
  display: flex;
  margin-bottom: 10px;
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

.el-table {
  .el-button {
    margin-left: 0px; //调整按钮不对齐
  }
}
</style>
  