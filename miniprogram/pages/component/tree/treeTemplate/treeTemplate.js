// pages/component/tree/tree.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    treeData: {
      type: Array,
      default: []
    }
  },

  lifetimes: {
    attached(){
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCallback(e) {
      this.triggerEvent('callback', e.detail)
    },
    handleTap(e) {
      this.triggerEvent('callback', { id: e.currentTarget.dataset.id})
    }
  }
})
