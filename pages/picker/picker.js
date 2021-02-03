// pages/picker/picker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrayIndex: 0,
    arrayList: ['大家好', '数组', '你好'],
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

  bindArrayPicker: function (e) {
    this.setData({
      arrayIndex: e.detail.value
    })
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