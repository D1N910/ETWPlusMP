import { setStatusBarHeight } from "../../utils/util.js"

// pages/index/index.js
var app = getApp()
var loadingInterval
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    movableViewX:'0rpx',
    userConainerShow:true,
    dataList:[],
    blockAnimation: [],
    isRefreshing: false,
    outTime: 0,
    randomAudio:[]
  },
  /**
   * 跳转页面
   */
  jumpToaudioPage(e) {
    wx.navigateTo({
      url: `../audioPage/index?_id=${e.currentTarget.dataset._id}`,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  navigator2guests(){
    wx.navigateTo({
      url: '../guests/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setStatusBarHeight(app,this)
    wx.setBackgroundTextStyle({
      textStyle: 'dark'
    })
    wx.startPullDownRefresh()   

    const db = wx.cloud.database()
    db.collection('barrage').get({
      success: res => {
        for(let i in res.data){
          res.data[i].audioPlayTime = `${parseInt(res.data[i].audioPlayTime / 60)}分${parseInt((res.data[i].audioPlayTime / 60 - parseInt(res.data[i].audioPlayTime / 60)) * 60)}秒`
        }
        this.setData({
          barrage: [...res.data]
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
  navigator2search(){
    wx.navigateTo({
      url: '../searchPage/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  LoadingResources(){
    clearTimeout(LoadingResourcesSet)
    // 如果超时
    if (this.data.outTime>30) {
      wx.stopPullDownRefresh()
      this.setData({
        isRefreshing: false
      })
      wx.showModal({
        title: '加载超时',
        content: '请检查您的网络',
        showCancel:false
      })
      return false
    }
    if (app.globalData.audioList){
      this.setData({
        dataList: app.globalData.audioList
      },()=>{
        setTimeout(()=>{
          clearInterval(loadingInterval)
          wx.stopPullDownRefresh()
          this.setData({
            isRefreshing: false
          })

          var blockAnimation = wx.createAnimation({
            duration: 300,
            timingFunction: 'ease',
          })

          this.blockAnimation = blockAnimation

          blockAnimation.rotateX(180).opacity(0).step()

          this.setData({
            blockAnimation: blockAnimation.export()
          })
          setTimeout(()=>{

            blockAnimation.rotateX(360).opacity(1).step()

            this.setData({
              blockAnimation: blockAnimation.export()
            })
          },400)
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
    if (wx.getStorageSync('hasUserInfo')) {
      this.setData({
        hasUserInfo: true,
        userInformation: wx.getStorageSync('userInfo')
      })
    }
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('audioList').count({
      success(res) {
        that.data.audioListCount = res.total
        let Rand = Math.random()
        let randNumber = Math.round(Rand * res.total)
        if(randNumber==0){
          randNumber=1
        }else{
          if (randNumber == res.total){
            randNumber = res.total - 1
          }
        }
        db.collection('audioList').skip(randNumber).limit(1).get({
          success(res) {
            that.data.randomAudio = res.data[0]
            that.setData({
              randomAudio: that.data.randomAudio
            })
          }
        })
      }
    })
  },
  RandomListen(){
    wx.navigateTo({
      url: `../audioPage/index?_id=${this.data.randomAudio._id ||'5b9a924a97880d3b822d62ab'}`,
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

  },
  /**
   * 隐藏用户
   */
  showUser(){
    console.log('ddd')
    this.setData({
      userConainerShow: false
    },()=>{
      this.setData({
        movableViewX: '1000rpx'
      })
    })
  },
  /**
   * 隐藏用户
   */
  hiddenUser(){
    this.setData({
      movableViewX: '0rpx'
    },()=>{
      setTimeout(()=>{
        this.setData({
          userConainerShow: true
        })
      },200)
    })
  },
  showThanks(){
    wx.showModal({
      title: '感谢您的支持',
      content: '拥有这个徽章，说明您曾今支持过声东击西，并且找到了考拉彩蛋，输入了正确的考拉密码。日后声东击西ETWPlus将推出一些针对支持者的福利更新。请继续支持我们！',
      showCancel:false,
      confirmColor:"#e44a4b"
    })
  }
})