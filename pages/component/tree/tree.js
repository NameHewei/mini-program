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
      console.log('parent', this.data.treeData)
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
    handleCallback(e){
      console.log(e)
    }
  }
})
