<template>
  <div id="app">
    <!-- 其他页 -->
    <el-container v-if="$route.meta.keepAlive">
      <el-header>
        <!-- 导航栏 -->
        <keep-alive>
          <top></top>
        </keep-alive>
      </el-header>
      <el-container>
        <el-aside width="sideWidth+'px'">
          <!-- 侧边栏 -->
          <keep-alive>
            <left></left>
          </keep-alive>
        </el-aside>
        <el-main style="padding-top: 3px;">
          <!-- Body -->
          <el-config-provider :locale="locale"> <!-- 中文配置-->
            <router-view v-slot="{ Component, route }">
              <transition :name="route.meta.transition">
                <component :is="Component" />
              </transition>
            </router-view>
          </el-config-provider>
        </el-main>
      </el-container>
    </el-container>

    <!-- 登录页 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import left from '@/layout/left.vue';
import top from '@/layout/top.vue'
import { ref } from 'vue';
import { ElConfigProvider } from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn'
export default {
  components: {
    left: left,
    top: top
  },
  setup() {
    const sideWidth = ref(180)

    return {

    }
  }
}

</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #F8F8F8;
}

body {
  margin: 0;
  padding: 0;
}

top {
  width: 100%;
}
</style>
