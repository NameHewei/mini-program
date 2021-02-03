// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    function _() {
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
    }

    // 登录
    function a() {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
        }
      })
    }
    // 获取用户信息
    function b() {
      wx.getSetting({
        success: res => {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = res.userInfo
  
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
          }
        }
      })
    }
  },
  globalData: {
    userInfo: null
  },

  // 封装 wx.rquest
  http(data) {
    const {
      header: header = {},
      method: method = 'get',
      data: params,
      success,
      fail,
      loading: loading = true
    } = data;
    if(loading) wx.showLoading()
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
      success: function (res) {
        if(loading) wx.hideLoading()
        success(res)
      },
      fail: function () {
        if(loading) wx.hideLoading()
        if (fail) {
          fail();
        }
      }
    })
  }
})
