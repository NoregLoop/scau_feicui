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
          <el-breadcrumb :separator-icon="ArrowRight"
            style="color: var(--el-text-color-regular);font-size: large;margin-right: 10px;">
            <el-breadcrumb-item :to="{ path: '/' }"
              style="color: var(--el-text-color-regular);font-size: large;margin-left: 10px;">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in navArray"
              style="color: var(--el-text-color-regular);font-size: large;">{{
                item.meta.title
              }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="front-user">
          <span class="user-role" style="color: var(--el-text-color-regular);font-size: large;">
            {{ userInfo.userRoleName }}
          </span>
          <el-dropdown size="small" trigger="hover">
            <span class="user-name">
              {{ userInfo.userName }}
              <el-icon class="el-icon-right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu class="user-control">
                <el-dropdown-item>
                  <el-badge :value="12" class="control-message" is-dot>
                    我的消息
                  </el-badge></el-dropdown-item>
                <el-dropdown-item @click="drawer = true">个人信息</el-dropdown-item>
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

    <div>
      <el-drawer v-model="drawer" title="我的信息" :direction="direction">
        <el-descriptions>
          <el-descriptions-item label="用户名">若依</el-descriptions-item>
          <el-descriptions-item label="手机号">18100000000</el-descriptions-item>
          <el-descriptions-item label="Remarks">
            <el-tag size="small">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Address">1111111</el-descriptions-item>
        </el-descriptions>
      </el-drawer>
    </div>
  </div>
</template>


<script setup>
import { ArrowRight, Expand, Fold, ArrowDown } from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
import { ref, watch } from 'vue';
import tagsView from "./tagsView"
import { useStore } from 'vuex';
import { logout, getInfo } from '@/api/login';
import { onMounted } from 'vue';
import { reactive } from 'vue';
import Cookies from 'js-cookie';
import { ElMessageBox,ElMessage } from 'element-plus';

components: {
  tagsView
}
const drawer = ref(false)
const navArray = ref([])
const store = useStore()
const route = useRoute()
const router = useRouter();

const userInfo = reactive({
  userName: '',
  userCompany: '',
  userRole: '',
  userRoleName: '',
})

onMounted(() => {
  getInfo().then((res) => {
    console.log(res)
    userInfo.userName = res.user.nickName
    userInfo.userRoleName = res.roles[0]
  })
})

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

const handleLogout = () => {
  ElMessageBox.confirm(
    '确认要退出该账号登陆吗?',
    'Warning',
    {
      confirmButtonText: '是',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      Cookies.remove('User-Token')
      Cookies.set('isLogin', false, Boolean)
      store.commit('resetParam', store.state)
      router.push('/login')
      ElMessage({
        type: 'success',
        message: '退出成功',
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消',
      })
    })

}

</script>

<style rel="stylesheet/scss" lang="scss">
#front-breadcrumb {
  display: flex;
  border-bottom: solid;
  height: 30px;

  .sidebarTrigger {
    margin-top: 10px;
  }

  .breadcrumb {
    margin-top: 11px;
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
  margin-left: 160px;
}

.front-user {
  margin-left: auto;
  font-size: small;
  display: flex;
  align-items: flex-end;

  .user-role {
    margin-right: 10px;
  }

  .user-name {
    margin-bottom: 3px;
  }
}

.tagsView {
  margin-top: 2px;
}

.el-dropdown {
  margin-top: 1rem;
  font-size: larger;

}
</style>
