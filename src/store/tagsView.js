
const tagsView = {
  state: {
    sidebarIsCollaspe: false,
    tagsViewList:[],
  },

  mutations: {
    triggerSidebar(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    /**
     * 添加 tags
     */
    addTag(state, tag) {
      const isFind = state.tagsViewList.map(function (item)  {
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
  }
}
export default tagsView