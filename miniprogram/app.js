//app.js
App({
  onLaunch: function() {

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true,
      })
    }

    this.globalData = {}
  },

  // 封装 wx.rquest
  http(data) {
    const {
      header: header = {},
      method: method = 'get',
      params,
      success,
    } = data;
    let {
      url
    } = data
    // 某些场合需要单独调用某个域名的接口，若没有调用则使用如下的统一域名
    if (!/http/.test(url)) {
      url = 'http://xxx.xxx:8088' + url
    }
    wx.request({
      method,
      url,
      data: params,
      header: {
        'content-type': 'application/json',
        'Authorization': 'Hewitt',
        ...header
      },
      success: function(res) {
        success(res)
      },
    })
  }
})