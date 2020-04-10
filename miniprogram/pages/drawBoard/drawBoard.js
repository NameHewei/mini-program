let canvas = null;
let ctx = null;
/** 是否点击开始 */
let start = false;
/** 记录起始位置 */
let startX = 0;
let startY = 0;
let canvasWidth = 0;
let canvasHeight = 0;

function handleDraw(x, y) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  /** 将结束位置设置为下一次起始位置 */
  startX = x;
  startY = y;
  ctx.lineTo(x, y);
  ctx.stroke();
}

Page({
  data: {
    operate: '',
    imgUrl: ''
  },

  onReady: function () {
    const query = wx.createSelectorQuery()
    query.select('#drawBoard')
      .fields({ node: true, size: true })
      .exec((res) => {
        canvas = res[0].node
        ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = res[0].width * dpr
        canvas.height = res[0].height * dpr
        ctx.scale(dpr, dpr)
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#5e5e5e';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        // 使用阴影 消除锯齿
        ctx.shadowBlur = 2;
        ctx.shadowColor = '#5e5e5e';
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
      })
  },

  handleTouchStart(e) {
    console.log(e)
    startX = e.touches[0].x;
    startY = e.touches[0].y;
    this.setData({
      operate: 'start' + Math.random()
    })
  },

  handleTouchMove(e) {
    handleDraw(e.changedTouches[0].x, e.changedTouches[0].y)
    this.setData({
      operate: 'move' + e.touches[0].x
    })
  },

  handleTouchEnd(e) {
    console.log(e)
    this.setData({
      operate: 'end' + e.changedTouches[0].x
    })
  },

  handleClear() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  },

  handleExportPhoto() {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: canvasWidth,
      height: canvasHeight,
      canvas: canvas,
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