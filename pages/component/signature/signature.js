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

Component({
  /** 组件的属性列表 */
  properties: {},

  /** 组件的初始数据 */
  data: {
    show: false,
    buttons: [{
        type: 'default',
        className: 'clear',
        text: '清除',
        value: 0
      },
      {
        type: 'primary',
        className: 'sure',
        text: '确定',
        value: 1
      }
    ]
  },

  lifetimes: {
    ready() {
      this.initSignaure()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    triggerShow() {
      this.setData({
        show: !this.data.show
      })
    },

    /* 清除与确定 */
    buttontap(e) {
      const index = e.detail.index
      wx.showLoading()
      if (index === 0) {
        this.handleClear()
        wx.hideLoading()
      } else {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: canvasWidth,
          height: canvasHeight,
          canvas: canvas,
          success: (res) => {
            /** 上传图片 */
            wx.uploadFile({
              url: 'xxx', //仅为示例，非真实的接口地址
              filePath: res.tempFilePath,
              name: 'file',
              header: {
                Authorization: ''
              },
              formData: {
              },
              success: (res) => {
                try {
                  const data =  JSON.parse(res.data)
                  this.triggerEvent('callback', data.data)
                  this.setData({ show: false })
                } catch (error) {
                  this.triggerEvent('callback', {})
                }
                wx.hideLoading()
              },
              fail:() => {
                wx.hideLoading()
              }
            })
          },
          fail: () => {
            wx.hideLoading()
          }
        })
      }
    },

    initSignaure() {
      const query = this.createSelectorQuery()
      query.select('#idSignature')
        .fields({
          node: true,
          size: true
        })
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
      startX = e.touches[0].x;
      startY = e.touches[0].y;
    },

    handleTouchMove(e) {
      handleDraw(e.changedTouches[0].x, e.changedTouches[0].y)
    },

    handleTouchEnd(e) {
      // console.log(e)
    },

    handleClear() {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    },

    catchMove() {}
  }
})