// pages/media/media.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localVideo: ''
  },

  /**
   * @des 预览大图
   */
  photoPreview() {
    wx.previewImage({
      current: 'https://w.wallhaven.cc/full/83/wallhaven-839kvo.jpg',
      urls: ['https://w.wallhaven.cc/full/g8/wallhaven-g82533.jpg', 'https://w.wallhaven.cc/full/83/wallhaven-839kvo.jpg'] 
    })
  },

  handleGetLocalVedio() {
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: ['front', 'back'],
      success: (res) => {
        this.setData({
          localVideo: res.tempFilePath
        })
      }
    })
  }
})