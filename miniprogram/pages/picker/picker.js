// pages/picker/picker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    ],
    pickerDateValue: ''
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e)
    this.setData({
      pickerValue: e.detail.value
    })
  },

  timePickerChange(e) {
    this.setData({
      pickerDateValue: e.detail.value
    })
  }
})