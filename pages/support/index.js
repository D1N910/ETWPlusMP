// pages/hotTalk/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    eggCm: '',
    iflogin: false
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
  changeEgg(e){
    this.setData({
      eggCm: e.detail.value
    })
  },
  confirm(){
    wx.showLoading({
      title: '请等待验证'
    })
    var that = this
    wx.cloud.callFunction({
      name: 'beKing',
      data:{
        eggCm: this.data.eggCm
      },
      success(res) {
        wx.hideLoading()
        if (res.result.status == 1200){
          wx.showModal({
            title: '感谢支持',
            content: '多谢你支持我们，给支持声东击西的您加了金主buff,在下一次的更新迭代，您将会看到。',
            showCancel:false,
            confirmColor:"#e44a4b"
          })
          wx.setStorageSync('beking', true)
          that.setData({
            iflogin: false
          })
        }else{
          wx.showModal({
            title: 'hey，抱歉',
            content: '您输入的距离似乎不是上面明信片桑真实的考拉眼睛之间的距离哦。如果您确定捐赠过我们，请联系我们的邮箱：etwstudio@gmail.com',
            showCancel: false,
            confirmColor: "#e44a4b"                        
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (wx.getStorageSync('hasUserInfo') && !wx.getStorageSync('beking')) {
      this.setData({
        iflogin: true
      })
    }
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
      urls:["cloud://etwplus-test-485c18.6574-etwplus-test-485c18/About/jzIpJNkM.png"]
    })
  },
  seeImg2() {
    wx.previewImage({
      urls: ["cloud://etwplus-test-485c18.6574-etwplus-test-485c18/About/SNJ8uISf.png"]
    })
  },
  seeImg3() {
    wx.previewImage({
      urls: ["cloud://etwplus-test-485c18.6574-etwplus-test-485c18/About/c5S7h9bl.jpg"]
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