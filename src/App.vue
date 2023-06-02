<template>
  <nav>
  </nav>
  <div id="app">
  <!-- 其他页 -->
  <el-container v-if="$route.meta.keepAlive">
   <el-header>
    <!-- 导航栏 -->
    <keep-alive>
     <header-nav></header-nav>
    </keep-alive>
   </el-header>
  <el-container>
   <el-aside width="250px">
    <!-- 侧边栏 -->
    <keep-alive>
     <left></left>
    </keep-alive>
   </el-aside>
   <el-main>
    <!-- Body -->
     <router-view></router-view>
   </el-main>
  </el-container>
  </el-container>

    <!-- 登录页 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import left from '@/layout/left.vue';
import { useRoute, useRouter } from 'vue-router'
const route=useRoute()
 
export default{
  components: {
    left: left
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
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
