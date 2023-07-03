<template>
  <el-menu router :default-active="route.path" default-active="2" class="menu" :collapse="store.state.sidebarIsCollaspe"
    :unique-opened="true" @open="" @close="">
    <el-sub-menu class="menu-sub" index="1">
      <template #title>
        <el-icon>
          <Printer />
        </el-icon>
        <span>入库管理</span>
      </template>
      <el-menu-item index="/inbound/action">入库操作</el-menu-item>
      <el-menu-item index="/inbound/return">还货入库</el-menu-item>
      <el-menu-item index="/inbound/record">入库单列表</el-menu-item>
    </el-sub-menu>
    <el-sub-menu class="menu-sub" index="2">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>出库管理</span>
      </template>
      <el-menu-item index="/outbound/action">出库操作</el-menu-item>
      <el-menu-item index="/outbound/order">出库单列表</el-menu-item>
      <el-menu-item index="/outbound/record">出库货品列表</el-menu-item>
    </el-sub-menu>
    <el-sub-menu class="menu-sub" index="3">
      <template #title>
        <el-icon>
          <Box />
        </el-icon>
        <span>库存管理</span>
      </template>
      <el-menu-item index="/inventorymanage">在线货仓管理</el-menu-item>
      <el-menu-item index="/inventoryrecord">货品列表</el-menu-item>
    </el-sub-menu>
    <el-sub-menu class="menu-sub" index="4">
      <template #title>
        <el-icon>
          <CreditCard />
        </el-icon>
        <span>财务管理</span>
      </template>
      <el-menu-item index="/lend">供应商结账</el-menu-item>
      <el-menu-item index="/saled">出借客户结账</el-menu-item>
      <el-menu-item index="/return">卖手提成</el-menu-item>
      <el-menu-item index="/return">结算历史</el-menu-item>
    </el-sub-menu>
    <el-sub-menu class="menu-sub" index="5">
      <template #title>
        <el-icon>
          <ShoppingTrolley />
        </el-icon>
        <span>销售管理</span>
      </template>
      <el-menu-item index="/sale/lend">未还货列表</el-menu-item>
      <el-menu-item index="/sale/saled">已售列表</el-menu-item>
      <el-menu-item index="/sale/return">退货列表</el-menu-item>
    </el-sub-menu>
    <el-sub-menu class="menu-sub" index="6">
      <template #title>
        <el-icon>
          <User />
        </el-icon>
        <span>客户管理</span>
      </template>
      <el-menu-item index="/custom/supplier">供应商管理</el-menu-item>
      <el-menu-item index="/custom/custom">出借客户管理</el-menu-item>
    </el-sub-menu>
    <el-sub-menu class="menu-sub" index="7">
      <template #title>
        <el-icon>
          <Timer />
        </el-icon>
        <span>排班管理</span>
      </template>
      <el-menu-item index="/schedule">排班操作</el-menu-item>
      <el-menu-item index="/store">店铺管理</el-menu-item>
      <el-menu-item index="/">基础配置</el-menu-item>
    </el-sub-menu>
    <el-sub-menu class="menu-sub" index="8">
      <template #title>
        <el-icon>
          <Setting />
        </el-icon>
        <span>系统配置</span>
      </template>
      <el-menu-item index="/role">仓库配置</el-menu-item>
      <el-menu-item index="/role">品类管理</el-menu-item>
      <el-menu-item index="/role">基础配置</el-menu-item>
    </el-sub-menu>

    <el-sub-menu class="menu-sub" index="9">
      <template #title>
        <el-icon>
          <Setting />
        </el-icon>
        <span>权限管理</span>
      </template>
      <el-menu-item index="/permission/role">角色管理</el-menu-item>
      <el-menu-item index="/permission/user">用户管理</el-menu-item>
      <el-menu-item index="/permission/tenant">租户管理</el-menu-item>
    </el-sub-menu>
    <el-menu-item class="menu-sub" index="10">
      <template #title>
        <el-icon>
          <Document />
        </el-icon>
        <span>日志</span>
      </template>
    </el-menu-item>
  </el-menu>

  <div>
  </div>
</template>

<script setup>
import {
  Document, Menu as IconMenu, Setting, User, UserFilled, CreditCard, Printer, Box, ShoppingTrolley, Timer
} from '@element-plus/icons-vue'
import { useRoute, useRouter } from "vue-router"
import { ref, watch } from 'vue'
import { useStore } from 'vuex';
import { reactive } from 'vue';
const route = useRoute()
const router = useRouter()
const store = useStore()



// 监听函数监听路径的变化
watch(
  () => route.path,
  (newValue, oldValue) => {
    // route.matched 目前匹配的是哪个 获得的值赋给  navArray.valu 上面用 v-for遍历值
    const tag = reactive({
      path: newValue,
      title: route.meta.title
    })
    store.commit('addTag', (store.state, tag))
  }
);

</script>

<style rel="stylesheet/scss" lang="scss">
.menu {
  width: 200px;
  min-height: 900px;
}
</style>
