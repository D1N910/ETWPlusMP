const audioPlay = (url) => {
  console.log(app.gobalData.statusBarHeight)
  if (typeof app.gobalData.statusBarHeight != 'undefined') {
    that.setData({
      topStatus: app.gobalData.statusBarHeight,
      capsuleHeight: app.gobalData.capsuleHeight
    })
  }
}

module.exports = {
  audioPlay: audioPlay
}