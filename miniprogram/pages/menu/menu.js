// pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scanResult: '-',
    currentPage: 1,
    dataList: [],
    pickerValue: 0,
    objectArray: [
      {
        id: 'a',
        name: '美国'
      },
      {
        id: 'c',
        name: '中国'
      },
      {
        id: 'b',
        name: '巴西'
      },
      {
        id: 'b',
        name: '日本'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('attached')
    const arr = [];

    for (let i = 0; i < 12; i++) {
      arr.push({
        id: 'id' + i, num: `num:${i}`, cd: [{ id: 11, num: '121233', name: 'namemem' }]
      })
    }

    this.setData({
      dataList: arr
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      currentPage: 1
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      currentPage: this.data.currentPage + 1,
      dataList: [...this.data.dataList, {id: 'id' + 10, num: `num:10`, cd: [{ id: 13, num: '01213233', name: '0namemem' }]}]
    })
    console.log(this.data.currentPage)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      pickerValue: e.detail.value
    })
  },

  /**
   * 扫描二维码
   */
  handleScan: function() {
    wx.scanCode({
      success: (res) => {
        this.setData({
          scanResult: res.result
        })
      }
    })
  }
})