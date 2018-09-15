// pages/index/index.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setBackgroundTextStyle({
      textStyle: 'light', // 下拉背景字体、loading 图的样式为dark
    })
    wx.startPullDownRefresh()    
  },
  LoadingResources(){
    clearTimeout(LoadingResourcesSet)
    if (app.gobalData.audioList){
      this.setData({
        dataList: app.gobalData.audioList
      },()=>{
        wx.stopPullDownRefresh()
      })
    }else{
      var LoadingResourcesSet = setTimeout(()=>{
        this.LoadingResources()
      },500)
    }
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
    this.LoadingResources()
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
  /**
   * 尝试停止动画播放 
   */
  StopAudioStop(){

  }
})