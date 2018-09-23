const setStatusBarHeight = (app,that) => {
  if (typeof app.globalData.statusBarHeight != 'undefined') {
    that.setData({
      topStatus: app.globalData.statusBarHeight,
      capsuleHeight: app.globalData.capsuleHeight,
      pageLength: getCurrentPages().length
    })
  }
}

const checkIfLogin = (app, that) => {
  that.data.login = app.globalData.login
  let hasUserInfo = wx.getStorageSync('hasUserInfo')
  that.setData({
    hasUserInfo: hasUserInfo
    }
  )
}

module.exports = {
  setStatusBarHeight: setStatusBarHeight,
  checkIfLogin: checkIfLogin
}