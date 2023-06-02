<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="入库单号">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="货品条码">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="供应商">
      <el-select v-model="form.region" placeholder="搜索匹配/扫码">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="仓库编码">
      <el-select v-model="form.region" placeholder="搜索匹配/扫码">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="采购方式">
      <el-select v-model="form.region" placeholder="请选择采购方式">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="货品数量">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="成本价">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="成交价">
      <el-input v-model="form.name" />
    </el-form-item>

    <el-form-item label="数据缓存">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item label="打印">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item label="拍照">
      <el-switch v-model="form.delivery" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">确认入库</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>
