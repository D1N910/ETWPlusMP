// pages/audioPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverImage: 'https://images.fireside.fm/podcasts/images/8/8dd8a56f-9636-415a-8c00-f9ca6778e511/episodes/e/efe15a9a-af08-4209-ba89-36ff79dfca60/header.jpg',
    audioUrl:'https://aphid.fireside.fm/d/1437767933/8dd8a56f-9636-415a-8c00-f9ca6778e511/efe15a9a-af08-4209-ba89-36ff79dfca60.mp3',
    logoVisiable: true
  },

  /**
   * 图片加载完成
   */
  haveLoad(){
    this.setData({
      logoVisiable:false      
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

  }
})