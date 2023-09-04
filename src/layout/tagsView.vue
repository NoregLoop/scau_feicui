<template>
  <transition>
    <div class="tags-view-container">
      <el-scrollbar id="tags-view-list" class="tags"
        v-bind:class="{ id01: store.state.sidebarIsCollaspe, id02: !store.state.sidebarIsCollaspe }">
        <router-link class="tags-view-item" v-for="(tag, index) in store.state.tagsViewList" :to="{ path: tag.path }"
          @contextmenu.prevent="openMenu($event, index)">
          {{ tag.title }}
          <el-icon class="close" v-if="isActive(tag)" @click="closeTags(index, tag)">
            <CloseBold />
          </el-icon>
        </router-link>
      </el-scrollbar>
    </div>
  </transition>
</template>

<script setup>
import { onMounted } from 'vue';
import { CloseBold } from '@element-plus/icons-vue'
import { ref, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'


const route = useRoute()
const store = useStore()
const router = useRouter()
const selectIndex = ref(0)
const visible = ref(false)
const menuStyle = reactive({
  left: 0,
  top: 0
})

onMounted(() => {

})

const isActive = (tag) => {
  return tag.path == route.path
}
const isAffiix = tag => {
  return tag.meta && tag.meta.affix
}
// contextMenu 相关


const openMenu = (e, index) => {
  const { x, y } = e
  menuStyle.left = x + 'px'
  menuStyle.top = y + 'px'
  selectIndex.value = index
  visible.value = true
}


const closeTags = (index, tag) => {
  //如果删除的是当前页面，自动定位到上一个页面
  if (isActive(tag)) {
    let tag_pre = store.state.tagsViewList[index - 1]
    store.commit('removeTag', {
      type: 'index',
      index: index
    })
    // router.removeRoute(tag)
    // router.push(tag_pre)
  }
}


const closeMenu = () => {
  visible.value = false
}

/**
 * 监听变化
 */
watch(visible, val => {
  if (val) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})



</script>

<style rel="stylesheet/scss" lang="scss">
.tags-view-container {
  height: 30px;
}

#tags-view-list {
  display: flex;
  width: 80%;
  transition: margin-left 0.5s ease-in-out;
}

.tags-view-item {
  border: solid 1px;
  padding: 1px;
  border-radius: 10%;
  margin-left: 10px;
  font-size: small;
  font-family: SimSun, STSong, serif;

}

//变换样式动画
#tags-view-list--expanded {
  margin-left: 200px;
}

#tags-view-list--collapsed {
  margin-left: 60;
}

//变换样式
.id01 {
  margin-left: 60px;
}

.id02 {
  margin-left: 200px;
}

//去掉标签页下划线
a {
  text-decoration: none;
}

.router-link-active {
  text-decoration: none;
}
</style>