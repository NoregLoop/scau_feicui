<template>
  <el-menu router :default-active="route.path" default-active="2" class="menu" :collapse="store.state.sidebarIsCollaspe"
    :unique-opened="true" @open="" @close="">
    <el-menu-item index="0" route="/home">
      <el-icon>
        <House />
      </el-icon>
      <span>首页</span>
    </el-menu-item>
    <template v-for="item in store.state.routes " :key="item.id">
      <el-sub-menu v-if="item.children" :index="item.path" :display="item.meta.keepAlive">
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item v-for="item2 in item.children" :key="item2.id" :index="item.path + '/' + item2.path"
          :style="item2.children ? 'display: none' : null">
          {{ item2.children ? null : item2.meta.title }}
        </el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script setup>

import { useRoute, useRouter } from "vue-router"
import { House } from '@element-plus/icons-vue'
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
  width: 160px;
  min-height: 900px;
}
</style>
