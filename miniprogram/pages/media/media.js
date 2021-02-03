// pages/media/media.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    localVideo: '',
    localImgpath: ''
  },

  getFile() {
    wx.chooseMessageFile({
      count: 10,
      type: 'image',
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles
      }
    })
  },

  getLocalImg() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        this.setData({ localImgpath: res.tempFilePaths })
        return
        /* 上传图片 */
        wx.showLoading({ icon: 'normal' })
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
          filePath: res.tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success (res){
            const data = res.data
            //do something
            wx.hideLoading()
          },
          fail(){
            wx.hideLoading()
          },
        })
      }
    })
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