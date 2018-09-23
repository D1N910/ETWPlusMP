// pages/hotTalk/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotAudioList:[]
  },
  getLunbo() {
    var that = this

    const db = wx.cloud.database()
    db.collection('audioList').orderBy('watch', 'desc').limit(3).get({
      success: res => {
        console.log(res)
        this.setData({
          hotAudioList: [...res.data]
        })
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
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
    this.getLunbo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  jumpToaudioPage(e) {
    wx.navigateTo({
      url: `../audioPage/index?_id=${e.currentTarget.dataset._id}`,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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