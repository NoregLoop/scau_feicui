<template>
  <div class="front">
    <el-collapse v-model="activeNames" class="front-collapse"
      @change="activeNames = !activeNames; collapseName == '收起' ? collapseName = '展开' : collapseName = '收起'">
      <el-collapse-item :title="collapseName" class="collapse-1" name="1">
        <el-form :model="searchForm" label-width="120px">
          <el-form-item label="入库单号" class="front-input">
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

  <div class="tail">
    <div class="tail-action">
      <el-button type="primary">导出明细</el-button>
      <el-button type="primary">打印入库单</el-button>
      <el-button type="primary">打印明细</el-button>
    </div>
    <el-table :data="tableData()" border style="width: 100%" :max-height="collapseName == '收起' ? 400 : 650">
      <template v-slot:empty>
        <div class="no-data">暂无数据</div>
      </template>
      <el-table-column type="selection" width="40" />
      <el-table-column v-for="item in inboundDataColumn.data" :prop="item.prop" :min-width="item.minWidth"
        :width="item.width" :max-width="item.maxWidth" :label="item.label" />
      <el-table-column width="100px" fixed="right">
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
        <template #default="scope">
          <el-button link type="primary" size="small" @click="openDetails(scope.row)">查看明细</el-button>
          <el-button link type="primary" size="small">编辑备注</el-button>
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
    <div>
      <el-drawer v-model="drawer" :direction="direction" size="35%">
        <el-descriptions border size="large" direction="vertical" title="入库单详情">
          <el-descriptions-item label="入库单号">{{ rowDetails.orderCode }}</el-descriptions-item>
          <el-descriptions-item label="数量">{{ rowDetails.jadeWeight }}</el-descriptions-item>
          <el-descriptions-item label="供应商" width="150">{{ rowDetails.supplierName }}</el-descriptions-item>
          <el-descriptions-item label="客户名字">{{ rowDetails.clientName }}</el-descriptions-item>
          <el-descriptions-item label="仓位名字" width="150">{{ rowDetails.storageName }}</el-descriptions-item>
          <el-descriptions-item label="仓库名字">{{ rowDetails.warehouseName }}</el-descriptions-item>
          <el-descriptions-item label="入库时间">{{ rowDetails.createTime }}</el-descriptions-item>
          <el-descriptions-item label="添加人">{{ rowDetails.createBy }}</el-descriptions-item>
          <el-descriptions-item label="修改时间">{{ rowDetails.updateTime }}</el-descriptions-item>
          <el-descriptions-item label="修改人">{{ rowDetails.updateBy }}</el-descriptions-item>
        </el-descriptions>
      </el-drawer>
    </div>
  </div>
</template>
  
<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import '@/mock/inbound.js'
import { onMounted, onBeforeMount } from "vue";
import { getInboundOrderList } from '@/api/inbound'
import { getWarehouseList, getStorageList } from '@/api/setting';
import { getSupplierList } from "@/api/user"
import { getToken } from '@/utils/auth'
export default defineComponent({
  name: "HomeView",
  components: {},
  setup() {
    const rowDetails = ref({})
    const drawer = ref(false)
    const searchForm = reactive({  //入库查询表单数据
      jadeCode: '',
      orderCode: '',
      desWarehouseId: '',
      supplierId: '',
      data: [],
      count: 0,
    })
    const inboundOrderData = reactive({//表格数据
      data: [
      ]
    });

    const selectedFilters = reactive({
      data: []
    })
    const inboundDataColumn = reactive({
      data: [
      ]
    })
    const supplierList = ref([
    ])
    const warehouseList = ref([
    ])
    const tableFilter = reactive({//表头自定义数组
      data: [
        { label: '入库单单号', prop: 'orderCode', width: '200', isdisabled: true, isSelected: true },
        { label: '数量', prop: 'jadeWeight', width: '60', isSelected: true },
        { label: '总成本价', prop: 'jadeCost', width: '90', isSelected: true },
        // { label: '总标签价', prop: 'jadeTagPrice', Width: '90', isSelected: true },
        { label: '供应商', prop: 'supplierName', width: '70', isSelected: true },
        { label: '客户名字', prop: 'clientName', width: '90', isSelected: true },
        { label: '入库仓库', prop: 'warehouseName', width: '90', isSelected: true },
        { label: '入库仓位', prop: 'storageName', width: '90', isSelected: true },
        { label: '入库类型', prop: 'inboundTypeName', width: '90', isdisabled: true, isSelected: true },
        { label: '入库人员', prop: 'inboundPeople', width: '90', isdisabled: true, isSelected: true },
        { label: '入库时间', prop: 'createTime', minWidth: '100', isdisabled: true, isSelected: true },
        { label: '备注', prop: 'remark', minWidth: '80', isSelected: true },
        // { label: '测试1', prop: 'test1', minWidth: '80', maxWidth: '80', isSelected: true },
        // { label: '测试2', prop: 'test2', minWidth: '80', maxWidth: '80', isSelected: true },
        // { label: '测试3', prop: 'test3', minWidth: '130', maxWidth: '130', isSelected: true },
      ]
    })

    const collapseName = ref('展开');
    const activeNames = ref(false)

    //分页处理
    const state = reactive({//表格用到的参数
      data: {
        page: 1,
        limit: 10,
        total: inboundOrderData.data.length,
      }
    });
    const tableData = () => {
      return inboundOrderData.data
    };
    const handleCurrentChange = (e) => {//改变页码
      state.data.page = e;
      handleGetInboundOrderList(e, state.data.limit)
    };
    const handleSizeChange = (e) => {//改变页数限制
      state.data.limit = e;
      handleGetInboundOrderList(state.data.page, e)
    };

    const handleGetInboundOrderList = (page, limit) => {//获取入库单列表
      getInboundOrderList(page, limit).then((res) => {
        inboundOrderData.data = res.rows
        state.data.total = res.total
      })
    }


    onBeforeMount(() => {
      getSupplierList().then((res) => {
        supplierList.value = res.rows
      })
      getWarehouseList().then((res) => {
        warehouseList.value = res.rows
      })
      handleGetInboundOrderList(state.data.page, state.data.limit)
    })

    onMounted(() => {
      tableFilter.data.forEach(function (item, index) {
        if (item.isSelected) {
          selectedFilters.data.push(item.label)
          inboundDataColumn.data.push(item)
        }
      })
    })
    const onSearch = () => {
      getInboundOrderList(state.data.page, state.data.limit, searchForm.orderCode, searchForm.supplierId, searchForm.desWarehouseId).then((res) => {
        inboundOrderData.data = res.rows
        state.data.total = res.total
      })
    }

    const openDetails = (row) => { //删除仓位
      drawer.value = true
      rowDetails.value = row
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
      inboundDataColumn.data = temp
    }



    return {
      inboundOrderData,
      searchForm, rowDetails, drawer,
      collapseName, warehouseList, supplierList,
      activeNames,
      inboundDataColumn, selectedFilters, tableFilter,
      tableData,
      filterColumns, openDetails,
      handleCurrentChange, handleSizeChange,
      handleGetInboundOrderList, onSearch,
      ...toRefs(state),
    };
  },
});


</script>
  #F8F8F8
  
<style rel="stylesheet/scss" lang="scss" scoped>
.front {
  background-color: #FFF;
  padding: 10px;

  .front-input {
    width: 320px;
  }
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
  