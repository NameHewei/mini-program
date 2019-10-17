// pages/content/content.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parentId: '',
    childId: '',
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
   * @des 获取data-x绑定的数据 
   */
  onGetData(res) {
    console.log(res)
    this.setData({
      parentId: res.currentTarget.dataset.parentId,
      childId: res.target.dataset.id
    })
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
      content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  showActionSheet() {
    wx.showActionSheet({
      itemList: ['A', 'B', 'C'],
      success(res) {
        console.log('showActionSheet', res.tapIndex)
      },
    })
  },

  showToast() {
    /** 不掉用隐藏，会默认隐藏 */
    wx.showToast({
      title: 'toast',

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