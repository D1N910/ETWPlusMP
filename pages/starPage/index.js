import { setStatusBarHeight } from "../../utils/util.js"
var app = getApp()
// pages/searchPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setStatusBarHeight(app,this)
  },

  getLunbo() {
    var that = this
    this.data.starList = []
    wx.showLoading({
      title: '加载中'
    })
    var that = this

    const db = wx.cloud.database()

    wx.cloud.callFunction({
      // 需调用的云函数名
      name: 'ifhaveLogin',
      // 成功回调
      complete(res){
        wx.hideLoading()
        console.log(res)
        for(let i of res.result.data[0].star){
          db.collection('audioList').doc(i).get({
            success: res => {
              that.data.starList.push(res.data)
              that.setData({
                starList: that.data.starList
              })
            },
            fail: err => {
              wx.showToast({
                icon: 'none',
                title: '查询记录失败'
              })
            }
          })
        }
      }
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
    this.getLunbo()
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

  }
})