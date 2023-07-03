import { createStore } from 'vuex'
import user from './user'

export default createStore({
  state: {
    sidebarOpened: true,
    tagsViewList: [{
      path: '/home',
      title: '首页'
    }
    ],
  },
  getters: {
    tagsViewList:state=>state.tagsViewList 
  },
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    /**
     * 添加 tags
     */
    addTag(state, tag) {

      const isFind = state.tagsViewList.find(function (item)  {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        state.tagsViewList.push(tag)
      }
    },
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTag(state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
      } 
    },
  },
  actions: {
  },
  modules: {
    user:user,
  }
})

