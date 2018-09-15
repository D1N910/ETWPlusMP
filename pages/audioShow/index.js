// pages/audioShow/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**
   * 尝试停止动画播放 
   */
  StopAudioStop() {
    console.log('ddd')
    var that = this
    wx.createSelectorQuery().select('#the-id').fields({
      rect: true
    }, function (res) {
      var animation = wx.createAnimation({
        duration: 0,
        timingFunction: 'ease',
      })

      that.animation = animation

      animation.step()

      var thisRight = res.left

      that.setData({
        loading: animation
      }, () => {
        that.setData({
          right: `${thisRight}px`
        })
      })
      console.log(res)
    }).exec()
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})