// pages/index/index.js
var app = getApp()
var loadingInterval
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    isRefreshing: false,
    outTime: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setBackgroundTextStyle({
      textStyle: 'dark'
    })
    wx.startPullDownRefresh()    
  },
  LoadingResources(){
    clearTimeout(LoadingResourcesSet)
    // 如果超时
    if (this.data.outTime>=50) {
      wx.stopPullDownRefresh()
      this.setData({
        isRefreshing: false
      })
      return false
    }
    if (app.gobalData.audioList){
      this.setData({
        dataList: app.gobalData.audioList
      },()=>{
        setTimeout(()=>{
          wx.stopPullDownRefresh()
          this.setData({
            isRefreshing: false
          })
        }, 1000)
      })
    }else{
      var LoadingResourcesSet = setTimeout(()=>{
        this.data.outTime++
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
    clearInterval(loadingInterval)
    this.LoadingResources()
    // if (this.data.isRefreshing) {
    //   return
    // }
    this.setData({
      isRefreshing: true
    },()=>{
      // loading 动效
      loadingInterval = setInterval(()=>{
        this.loadingAniamtion()
      },1200)
    })
  },

  /**
   * loading 动效
   */
  loadingAniamtion() {
    var loadingAniamtionData = wx.createAnimation({
      duration: 600,
      timingFunction: 'ease',
    })

    this.loadingAniamtionData = loadingAniamtionData

    loadingAniamtionData.rotateX(360).step()

    this.setData({
      loading: loadingAniamtionData.export()
    })
    setTimeout(()=>{
      loadingAniamtionData.rotateX(-360).step()

      this.setData({
        loading: loadingAniamtionData.export()
      })

    },600)
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