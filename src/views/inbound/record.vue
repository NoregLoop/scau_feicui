<template>
  <div class="front">
    <el-collapse v-model="activeNames" class="front-collapse"
      @change="activeNames = !activeNames; collapseName == '收起' ? collapseName = '展开' : collapseName = '收起'">
      <el-collapse-item :title="collapseName" class="collapse-1" name="1">
        <el-form :model="searchForm" label-width="120px">
          <el-form-item label="入库单号" class="front-input">
            <el-select v-model="searchForm.lendCustom" placeholder="出借客户">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="货品条码" class="front-input">
            <el-input v-model="searchForm.jadeCode" />
          </el-form-item>
          <el-form-item label="所属仓库" class="front-input">
            <el-select v-model="searchForm.storeNo" placeholder="所属仓库">
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="供应商" class="front-input">
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

  <div class="tail">
    <div class="tail-action">
      <el-button type="primary">导出明细</el-button>
      <el-button type="primary">打印明细</el-button>
    </div>
    <el-table :data="tableData()" border style="width: 100%" :max-height="collapseName == '收起' ? 400 :850">
      <template v-slot:empty>
        <div class="no-data">暂无数据</div>
      </template>
      <el-table-column type="selection" width="40" />
      <el-table-column>
        <template #default="scope">
          <el-image :src="'http://47.106.116.146:8080/profile' + scope.row.imageUrl" fit="contain"
            style="max-height: 70px;max-width: 50px;" :preview-teleported="true" :lazy="true"
            :preview-src-list="imgPreview" @click="previewSrcList(scope.row.imageUrl)"></el-image>
        </template>
      </el-table-column>
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
        <template #default>
          <el-button link type="primary" size="small">查看明细</el-button>
          <!-- <el-button link type="primary" size="small">编辑备注</el-button>
          <el-button link type="primary" size="small">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination v-model:current-page="data.page" v-model:page-size="data.limit"
        layout="prev, pager, next ,total,sizes" v-model:total="data.total" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" />
    </div>
  </div>
</template>
  
<script>
import { defineComponent, reactive, toRefs, ref } from "vue";
import '@/mock/inbound.js'
import { onMounted, onBeforeMount } from "vue";
import { getJadeList } from '@/api/inbound'


export default defineComponent({
  name: "jadeInboundList",
  components: {},
  setup() {
    const searchForm = reactive({  //入库表单数据
      jadeCode: '',
      lendCustom: '',
      storeNo: '',
      supplier: '',
      data: [],
      count: 0,

    })
    const jadeListData = ref([]);//表格数据

    const selectedFilters = reactive({//选中的列
      data: []
    })
    const inboundDataColumn = reactive({//总共的列
      data: [
      ]
    })
    const imgPreview = ref([])
    const tableFilter = reactive({//表头自定义数组
      data: [
        { label: '货品编码', prop: 'jadeCode', width: '200', isdisabled: true, isSelected: true },
        { label: '入库单单号', prop: 'orderCode', width: '200', isdisabled: true, isSelected: true },
        { label: '数量', prop: 'jadeWeight', width: '60', isSelected: true },
        { label: '成本价', prop: 'costPrice', width: '60', isSelected: true },
        { label: '标签价', prop: 'sellingPrice', Width: '60', isSelected: false },
        { label: '供应商', prop: 'supplierName', width: '70', isSelected: true },
        { label: '货品状态', prop: 'status', width: '70', isSelected: true },
        { label: '客户名字', prop: 'clientName', width: '70', isSelected: false },
        { label: '入库仓库', prop: 'warehouseId', width: '70', isSelected: false },
        { label: '入库类型', prop: 'inboundTypeName', width: '90', isdisabled: true, isSelected: true },
        { label: '入库人员', prop: 'inboundPeople', width: '90', isdisabled: true, isSelected: true },
        { label: '入库时间', prop: 'createTime', minWidth: '100', isdisabled: true, isSelected: true },
        { label: '备注', prop: 'remark', minWidth: '80', maxWidth: '80', isSelected: true },
        { label: '测试1', prop: 'test1', minWidth: '80', maxWidth: '80', isSelected: false },
        { label: '测试2', prop: 'test2', minWidth: '80', maxWidth: '80', isSelected: false },
      ]
    })

    const collapseName = ref('展开');
    const activeNames = ref(false)

    //分页处理
    const state = reactive({//表格用到的参数
      data: {
        page: 1,
        limit: 10,
        total: jadeListData.value.length,
      }
    });
    const tableData = () => {
      return jadeListData.value
    };
    const handleCurrentChange = (e) => {//改变页码
      state.data.page = e;
      handleGetJadeList(e, state.data.limit)
    };
    const handleSizeChange = (e) => {//改变页数限制
      state.data.limit = e;
      handleGetJadeList(state.data.page, e)
    };
    const handleGetJadeList = (page, limit) => {//获取用户列表
      getJadeList(page, limit).then((res) => {
        jadeListData.value = res.rows
        state.data.total = res.total
      })
    }

    onBeforeMount(() => {
      handleGetJadeList(state.data.page, state.data.limit)
    })

    onMounted(() => {
      // handleGetJadeList(state.data.page, state.data.limit)
      tableFilter.data.forEach(function (item, index) {
        if (item.isSelected) {
          selectedFilters.data.push(item.label)
          inboundDataColumn.data.push(item)
        }
      })
    })

    const previewSrcList = (imgUrl) => {
      imgPreview.value = []
      imgPreview.value.push('http://47.106.116.146:8080/profile' + imgUrl)
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
      jadeListData, imgPreview,
      searchForm,
      collapseName,
      activeNames,
      inboundDataColumn, selectedFilters, tableFilter,
      tableData,
      filterColumns,
      handleCurrentChange, previewSrcList,
      handleSizeChange, handleGetJadeList,
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
  .front-input{
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
  