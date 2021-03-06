// pages/hotTalk/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    participantList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const db = wx.cloud.database()
    
    db.collection('participant').where({
      identify: 'hosts'
    }).get({
      success: res => {
        console.log(res)
        that.data.participantList.push(...res.data)
        that.setData({
          participantList: that.data.participantList
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
  seeImg1() {
    wx.previewImage({
      urls: ["cloud://etwplus-test-485c18.6574-etwplus-test-485c18/img/下载.png"]
    })
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
  // 查看图片
  seeImg1(){
    wx.previewImage({
      urls: ["cloud://etwplus-test-485c18.6574-etwplus-test-485c18/About/SNJ8uISf.png"]
    })
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