// pages/content/content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 'this is title',
    arr: ['a', 'b', 'c'],
    judge: false,
    num: 0,
    checked: true,

    screenWidth: 0,
    customModal: false,
  },

  onChange(event) {
    this.setData({
      checked: event.detail
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const query = wx.createSelectorQuery()
    /**
     * @des 当有多个类型的调用 比如 selectViewport select 同时，可以在exec中回掉中获取
     */
    query.select('#screen').boundingClientRect((rect) => {
      console.log(rect)
      this.setData({
        screenWidth: rect.width
      })
    }).exec();

    /**
     * @des 直接获取屏幕宽度等信息
     */
    console.log(wx.getSystemInfoSync())
  },

  handleTap: function() {
    this.setData({
      num: this.data.num + 1
    })
  },

  showLoading() {
    wx.showLoading({
      title: '123',
    })

    setTimeout(function() {
      wx.hideLoading()
    }, 2000)
  },

  showModal() {
    wx.showModal({
      title: 'modal',

    })
  },

  showCustomModal() {
    this.setData({
      customModal: true
    })
  },


  /**
   * 自定义弹出层，防止页面滑动
   */
  catchMove() {},

  /**
   * @des 关闭弹出层
   */
  catchClose() {
    this.setData({
      customModal: false
    })
  }
})