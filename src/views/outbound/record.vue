<template>
  <div class="front">
    <el-collapse v-model="activeNames" class="front-collapse"
      @change="activeNames = !activeNames; collapseName == '收起' ? collapseName = '展开' : collapseName = '收起'" style="width: 100%;">
      <el-collapse-item :title="collapseName" class="collapse-1" name="1" >
        <el-form :model="searchForm" label-width="120px">
          <el-form-item label="出库单号">
            <el-select v-model="searchForm.lendCustom" placeholder="出借客户">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="货品条码">
            <el-input v-model="searchForm.jadeCode" />
          </el-form-item>
          <el-form-item label="出库人员">
            <el-select v-model="searchForm.storeNo" placeholder="所属仓库">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商">
            <el-select v-model="searchForm.supplier" placeholder="供应商">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
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
    </div>
    <el-table :data="tableData()" border style="width: 100%">
      <el-table-column v-for="item in outboundDataColumn.data" :prop="item.prop" :min-width="item.minWidth" :width="item.width" 
        :max-width="item.maxWidth" :label="item.label" />
      <el-table-column width="100px">
        <template #header>
          <el-popover placement="bottom" trigger="click">
            <template #reference>
              <el-button size="small">显示设置</el-button>
            </template>
            <el-checkbox-group v-model="selectedFilters.data">
              <el-checkbox v-for="item in tableFilter.data" :label="item.label" @change="filterColumns" :disabled="item.isdisabled"/>
            </el-checkbox-group>
          </el-popover>
        </template>
        <template #default style="flex: auto;">
          <el-button link type="primary" size="small">查看明细</el-button>
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
import '@/mock/outbound.js'
import { onMounted,onBeforeMount } from "vue";
import {getOutboundJadeList} from  '@/api/outbound'


export default defineComponent({
  name: "HomeView",
  components: {},
  setup() {
    const searchForm = reactive({  //出库表单数据
      jadeCode: '',
      lendCustom: '',
      storeNo: '',
      supplier: '',
      data: [],
      count: 0,

    })
    const outboundJadeData = ref([]);

    const selectedFilters = reactive({
      data: []
    })
    const outboundDataColumn = reactive({
      data: [
      ]
    })

    const tableFilter = reactive({//表头自定义数组
      data: [
        { label: '出库货品条码', prop: 'outboundno', width:'80',isdisabled:true, isSelected: true },
        { label: '数量', prop: 'outboundNumber', width:'60', isSelected: true },
        { label: '供应商', prop: 'supplier', width:'60', isSelected: true },
        { label: '出库类型', prop: 'outboundType', width:'60',isdisabled:true, isSelected: true },
        { label: '出库人员', prop: 'outboundPeople', width:'60',isdisabled:true, isSelected: true },
        { label: '出库时间', prop: 'outboundTime', minWidth: '100',isdisabled:true,  isSelected: true },
        { label: '测试', prop: 'test', minWidth: '80', maxWidth: '80', isSelected: true },
        { label: '测试1', prop: 'test1', minWidth: '80', maxWidth: '80', isSelected: false  },
        { label: '测试2', prop: 'test2', minWidth: '80', maxWidth: '80', isSelected: false  },
      ]
    })

    const collapseName = ref('展开');
    const activeNames = ref(false)

    //表格用到的参数
    const state = reactive({data:{
      page: 1,
      limit: 10,
      total: outboundJadeData.value.length,
    }

    });


    //前端限制分页（tableData为当前展示页表格）
    const tableData = () => {
      return outboundJadeData.value
    };
    //改变页码
    const handleCurrentChange = (e) => {
      state.page = e;
    };
    //改变页数限制
    const handleSizeChange = (e) => {
      state.limit = e;
    };


    onMounted(() => {
      tableFilter.data.forEach(function (item, index) {
        if (item.isSelected) {
          selectedFilters.data.push(item.label)
          outboundDataColumn.data.push(item)
        }
      })
    })


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



    return {
      outboundJadeData,
      searchForm,
      collapseName,
      activeNames,
      outboundDataColumn, selectedFilters, tableFilter,
      tableData,
      filterColumns,
      handleCurrentChange,
      handleSizeChange,
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
.el-table{
  .el-button{
    margin-left: 0px;//调整按钮不对齐
  }
}
</style>
