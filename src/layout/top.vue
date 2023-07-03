<template>
  <div>

    <transition>
      <div id="front-breadcrumb"
        v-bind:class="{ id01: store.state.sidebarIsCollaspe, id02: !store.state.sidebarIsCollaspe }">
        <div class="sidebarTrigger">
          <el-icon v-if="!store.state.sidebarIsCollaspe" class="rigger" @click="trigger()">
            <Fold />
          </el-icon>
        </div>
        <div class="sidebarTrigger">
          <el-icon v-if="store.state.sidebarIsCollaspe" class="rigger" @click="trigger()">
            <Expand />
          </el-icon>
        </div>
        <div class="breadcrumb">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in navArray">{{
              item.meta.title
            }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="front-content">
          <el-avatar :size="32" class="mr-3" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
          <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
            小刘翡翠
          </span>
          <el-dropdown size="small" trigger="hover">
            <span class="el-dropdown-link">
              梁老板
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>我的信息</el-dropdown-item>
                <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

    </transition>
    <div class="tagsView">
      <tagsView />
    </div>

  </div>
</template>


<script setup>
import { ArrowRight, Expand, Fold,ArrowDown } from '@element-plus/icons-vue';
import { useRoute,useRouter} from 'vue-router';
import { ref,watch } from 'vue';
import tagsView from "./tagsView"
import { useStore } from 'vuex';
import { logout } from '@/api/login';

components: {
  tagsView
}

const navArray = ref([])
const store = useStore()
const route = useRoute()
const router = useRouter();

// 监听函数监听路径的变化
watch(
  () => route.path,
  (newValue, oldValue) => {
    // route.matched 目前匹配的是哪个 获得的值赋给  navArray.valu 上面用 v-for遍历值
    navArray.value = route.matched;
  }
);
const goback = () => {
  //点击了返回按钮
  router.back();
};

const trigger = () => {
  store.state.sidebarIsCollaspe = !store.state.sidebarIsCollaspe
}

const handleLogout=()=>{
  router.push('/login')
}

</script>

<style rel="stylesheet/scss" lang="scss">
#front-breadcrumb {
  display: flex;
  border-bottom: solid;
  height: 35px;

  .sidebarTrigger {
    margin-top: 15px;
  }

  .breadcrumb {
    margin-top: 16px;
  }

  transition: margin-left 0.5s ease-in-out;
}

//变换样式动画
#front-breadcrumb--expanded {
  margin-left: 200px;
}

#front-breadcrumb--collapsed {
  margin-left: 60;
}

//变换样式
.id01 {
  margin-left: 60px;
}

.id02 {
  margin-left: 200px;
}

.front-content {
  margin-left: auto;
  font-size: small;
}



.el-dropdown {
  margin-top: 1rem;
  font-size: larger;
}
</style>
