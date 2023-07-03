import Cookies from 'js-cookie'
export const TagsView = [
  {
    path:'/home',
    title:'首页'
  }
]

export function getList() {
  return Cookies.get(TagsView)
}

export function setList() {
  return Cookies.set(TagsView)
}

export function addItem(tag) {
  rootstate.tagsViewList.push(tag)
}

export function removeItem() {
  return Cookies.TagsView.splice(data.index, 1)
}
export function clearTags(state) {
  state.tagsList = []
}

