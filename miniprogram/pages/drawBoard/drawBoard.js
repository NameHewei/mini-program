let ctx = null;
/** 是否点击开始 */
let start = false;
/** 记录起始位置 */
let startX = 0;
let startY = 0;
let windowWidth = 0;
let canvasHeight = 200;

Page({
  data: {
    start: 'no',
    end: 'yes',
    imgUrl: ''
  },

  onReady: function () {
    ctx = wx.createCanvasContext('drawBoard');

    wx.getSystemInfo({
      success: (res) => {
        windowWidth= res.windowWidth
      }
    })
  },

  handleTouchStart(e) {
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'green';
    startX = e.touches[0].x;
    startY = e.touches[0].y;
  },

  handleTouchMove(e) {
    this.handleDraw(e.touches[0].x, e.touches[0].y)
  },

  handleDraw(x, y){
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      /** 将结束位置设置为下一次起始位置 */
      startX= x;
      startY= y;
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.draw(true);
  },

  handleTouchEnd() {

  },

  handleClear() {
    ctx.clearRect(0, 0, windowWidth, canvasHeight);
    ctx.draw();
  },

  handleExportPhoto() {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: windowWidth,
      height: canvasHeight,
      canvasId: 'drawBoard',
      success: (res) => {
        this.setData({
          imgUrl: res.tempFilePath
        })
        /** 将图片保存到本地 */
        // wx.saveImageToPhotosAlbum({
        //   filePath: res.tempFilePath,
        //   success(res) { 
        //     wx.showToast({
        //       title: '成功',
        //       icon: 'success',
        //       duration: 2000
        //     })
        //   }
        // })

        /** 上传图片 */
        // wx.uploadFile({
        //   url: 'https://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //   filePath:  res.tempFilePath,
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success(res) {
        //     const data = res.data
        //     //do something
        //   }
        // })
      }
    })
  }
})