import { setStatusBarHeight } from "../../utils/util.js"
var app = getApp()
// pages/searchPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    participantList:[],
    historySearchList:[],
    hotAudioList:[],
    allAudioList:[],
    searchValue: ''
  },
  cancel(){
    wx.navigateBack({
      delta: 1
    })
  },
  handleInput(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setStatusBarHeight(app,this)
    this.getLunbo()
  },
  getLunbo() {
    var that = this

    const db = wx.cloud.database()
    const _ = db.command
    db.collection('participant').where({
      identify:'guest'
    }).count({
      success(res) {
        that.data.guestListCount = res.total
      }
    })

    db.collection('participant').where({
      identify: 'guest'
    }).get({
      success: res => {
        console.log(res)
        that.data.participantList.push(...res.data)
        that.setData({
          participantList: that.data.participantList
        })
        if (that.data.participantList.length < that.data.guestListCount) {
          that.getAllList()
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
      }
    })
    

  },
  getAllList(){
    var that = this

    const db = wx.cloud.database()
    const _ = db.command
    db.collection.collection('participant').where({
      identify: 'guest'
    }).skip(this.data.participantList.length).get({
      success: res => {
        console.log(res)
        that.data.participantList.push(...res.data)
        that.setData({
          participantList: that.data.participantList
        })
        if (that.data.participantList.length < that.data.guestListCount){
          that.getAllList()          
        }
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let historySearchList = wx.getStorageSync('historySearchList')
    if (historySearchList) {
      this.setData({
        historySearchList
      })
    }
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