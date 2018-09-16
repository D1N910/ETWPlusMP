const setStatusBarHeight = (app,that) => {
  console.log(app.gobalData.statusBarHeight)
  if (typeof app.gobalData.statusBarHeight != 'undefined') {
    that.setData({
      topStatus: app.gobalData.statusBarHeight,
      capsuleHeight: app.gobalData.capsuleHeight
    })
  }
}

module.exports = {
  setStatusBarHeight: setStatusBarHeight
}
