<template>
  <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="false">expand</el-radio-button>
    <el-radio-button :label="true">collapse</el-radio-button>
  </el-radio-group> -->
  <el-menu router :default-active="route.path" default-active="2" class="menu" :collapse="isCollapse" @open="" @close="">
    <el-sub-menu class="menu-sub" index="1">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        <span>入库管理</span>
      </template>
      <el-menu-item index="/inboundaction">入库操作</el-menu-item>
      <el-menu-item index="/inboundrecord">入库单管理</el-menu-item>
      <el-menu-item index="/login">item three</el-menu-item>
    </el-sub-menu>
    <el-sub-menu class="menu-sub" index="2">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>出库管理</span>
      </template>
      <el-menu-item index="1-1">出库操作</el-menu-item>
      <el-menu-item index="/outboundrecord">出库单管理</el-menu-item>
      <el-menu-item index="1-3">item three</el-menu-item>
    </el-sub-menu>
    <el-sub-menu class="menu-sub" index="3" disabled>
      <template #title>
        <el-icon>
          <document />
        </el-icon>
        <span>货品管理</span>
      </template>
    </el-sub-menu>
    <el-sub-menu class="menu-sub" index="4">
      <template #title>
        <el-icon>
          <Setting />
        </el-icon>
        <span>用户管理</span>
      </template>
    </el-sub-menu>
  </el-menu>
  <div>
    <router-view></router-view>
  </div>
</template>

<script setup>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import{useRoute,useRouter} from "vue-router"
const route=useRoute()

</script>

<style rel="stylesheet/scss" lang="scss">
.menu{
  width: 200px;
  min-height: 1000px;
}

</style>
