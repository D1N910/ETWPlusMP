// pages/login/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

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

  },
  getUserInfoFun(e){
    wx.showLoading({
      title: '登录中'
    })
    wx.cloud.callFunction({
      name: 'login',
      data: e.detail.userInfo,
      success(res) {
        console.log(res)
        if (res.result.status==200){
          wx.hideLoading()
          wx.showToast({
            title: '登录成功'
          })
          wx.setStorageSync('hasUserInfo', true)
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  }
})