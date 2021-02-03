// components/custom/custom.js
Component({
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
      console.log('detached')
    },
  },

  /**
   * 组件的属性列表
   */
  properties: {
    list: Array
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentUnfold: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @des 点击折叠
     */
    onTapArrow: function (event) {
      const { currentUnfold } = this.data;
      let { target: { id } } = event;
      if (currentUnfold === id) id = '';
      this.setData({
        currentUnfold: id
      })
    },
  }
})