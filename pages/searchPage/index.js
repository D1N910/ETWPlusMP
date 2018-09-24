import { setStatusBarHeight } from "../../utils/util.js"
var app = getApp()
// pages/searchPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    db.collection('audioList').get({
      success: res => {
        console.log(res)
        this.setData({
          allAudioList: [...res.data]
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
  search(e){
    if (e.target.dataset.history){
      this.data.searchValue = e.target.dataset.history
      this.setData({
        searchValue: this.data.searchValue 
      })
    }
    if(this.data.historySearchList.indexOf(this.data.searchValue)==-1){
      this.data.historySearchList.unshift(this.data.searchValue)
    }else{
      this.data.historySearchList.splice(this.data.historySearchList.indexOf(this.data.searchValue),1)
      this.data.historySearchList.unshift(this.data.searchValue)   
    }
    wx.setStorageSync('historySearchList', this.data.historySearchList)

    this.setData({
      historySearchList: this.data.historySearchList
    })
    let searchValue = ['audioId','title','about']
    let hotAudioList = []
    for (let i in this.data.allAudioList){
      let haveAdd = 0
      for (let j of searchValue){
        if ((''+this.data.allAudioList[i][j]).indexOf(this.data.searchValue)!=-1){
          hotAudioList.push(this.data.allAudioList[i])
          haveAdd = 1
          break
        }
      }
      if (!haveAdd){
        for (let j of this.data.allAudioList[i].keywords) {
          if (('' + this.data.allAudioList[i].keywords[j]).indexOf(this.data.searchValue) != -1) {
            hotAudioList.push(this.data.allAudioList[i])
            haveAdd = 1
            break
          }
        }
      }
    }
    wx.showToast({
      title: `声东击西：共${hotAudioList.length}条结果`,
      icon: 'none'
    })
    this.setData({
      hotAudioList
    })
  },
  clearHistory(){
    this.setData({
      historySearchList:[]
    },()=>{
      wx.setStorageSync('historySearchList', this.data.historySearchList)
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