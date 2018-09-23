import { checkIfLogin } from "../../utils/util.js"
var app = getApp()
// 定义全局的音频
var audioManager = wx.getBackgroundAudioManager()

// pages/audioPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    limit:6,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo: {},
    hasUserInfo: false,
    ifInAllScreen: false,
    inAllScreen:[],// 全屏
    toNone: [],// 缩小屏幕
    hiddenController: false,// 隐藏控制器
    playPosition: 0,
    maxLength: 0,
    touchSlip: false,
    playStatus:1,
    ifShowLoading: false,
    onTimeUpdate: '00:00',
    allTime: '',
    percent: 0,
    nowTimeSecond:0,
    nowTimeMinutes: 0,
    audioInformationList: [],
    ifping: 0,
    
    current: 0,
    commentList: [],
    barrageList: [],
    getBarrageList:[],
    totalComment: 0
  },

  // 最小化
  ToMinimize() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    var animationToNone = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation
    this.animationToNone = animationToNone

    animation.height('600rpx').step()
    animationToNone.height('calc(100vh - 600rpx)').step()

    this.setData({
      inAllScreen: animation.export(),
      toNone: animationToNone.export()
    })
  },

  // 最大化
  ToMaximize() {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    var animationToNone = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation
    this.animationToNone = animationToNone

    animation.height('100vh').step()
    animationToNone.height('0').step()

    this.setData({
      inAllScreen: animation.export(),
      toNone: animationToNone.export()      
    })

  },

  /**
   * 点击导航栏
   */
  clickNav(e){
    this.setData({
      ifping: parseInt(e.detail.currentTarget.dataset.nav),
      current: parseInt(e.detail.currentTarget.dataset.nav)
    })
  },
  swiperChange(e){
    this.setData({
      ifping: e.detail.current
    })
  },
  /**
   * 更改完成
   */
  // handleSliderChange(e){
  //   this.data.touchSlip = false
  //   this.seekAudio(e.detail.value)
  // },
  /**
   * 跳转进度
   */
  seekAudio(currentTime){
    if (this.data.playStatus){
      audioManager.play()
    }
    audioManager.seek(currentTime)
    audioManager.onSeeking(()=>{
      this.setData({
        ifShowLoading: false
      })
    })
    audioManager.onSeeked(()=>{
      this.setData({
        ifShowLoading: true
      })   
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.data._id = options._id || '5b9a850f97880d3b822d5dd7'
    wx.cloud.init({
      env: 'etwplus-test-485c18'
    })
    this.getList(this.data._id)
    this.getBarrage(this.data._id)
    // 获得音频信息
    wx.cloud.callFunction({
      name: 'getAudio',
      data:{
        _id: this.data._id
      },
      success(res) {
        console.log(res)
        that.setData({
          audioInformationList: res.result.data
        }, () => {
          // 音频链接
          audioManager.src = that.data.audioInformationList.audioUrl;
          // 音频标题
          audioManager.title = that.data.audioInformationList.title;
          // 专辑名
          audioManager.epname = '声东击西'
          audioManager.WebUrl = 'https://www.etw.fm/'
          let audioSinger = ''
          for (let i in that.data.audioInformationList.participant) {
            for (let j in that.data.audioInformationList.participant[i]) {
              audioSinger += ` ${that.data.audioInformationList.participant[i][j].name}`
            }
          }
          audioManager.singer = audioSinger
          audioManager.coverImgUrl = that.data.audioInformationList.header
        })
      }
    })

    // 播放进度变化的时候更改进度
    audioManager.onTimeUpdate(() => {
      if (this.data.maxLength == 0) {
        let minuteInt = parseInt(audioManager.duration / 60)
        let secondInt = parseInt((audioManager.duration / 60 - minuteInt) * 60)
        let allTimeSecond = secondInt < 10 ? '0' + secondInt : secondInt
        let allTimeMinutes = minuteInt < 10 ? '0' + minuteInt : minuteInt
        this.setData({
          maxLength: audioManager.duration,
          allTime: `${allTimeMinutes}:${allTimeSecond}`
        })
      }
      // 如果是不在拖动才动态改变
      if (!this.data.touchSlip) {
        let minuteInt = parseInt(audioManager.currentTime / 60)
        let secondInt = parseInt((audioManager.currentTime / 60 - minuteInt) * 60)
        let nowTimeMinutes = minuteInt < 10 ? '0' + minuteInt : minuteInt
        let nowTimeSecond = secondInt < 10 ? '0' + secondInt : secondInt
        // 提高性能，每一秒才刷新一次
        if (this.data.nowTimeMinutes != minuteInt || this.data.nowTimeSecond != secondInt){
          this.data.nowTimeMinutes = minuteInt          
          this.data.nowTimeSecond = secondInt
          this.setData({
            percent: audioManager.buffered / audioManager.duration * 100,
            playPosition: audioManager.currentTime,
            onTimeUpdate: `${nowTimeMinutes}:${nowTimeSecond}`
          })
        }
      }
    })
    // 监听背景音频暂停事件
    audioManager.onPause(() => {
      this.setData({
        playStatus: 1
      })
    })
    // 监听背景音频播放事件
    audioManager.onPlay(() => {
      this.setData({
        playStatus: 0
      })
      wx.hideLoading()
    })
    // 监听音频加载中事件，当音频因为数据不足，需要停下来加载时会触发
    audioManager.onWaiting(() => {
      this.setData({
        ifShowLoading: false
      })
    })
    // 监听音频进入可以播放状态的事件，但不保证后面可以流畅播放
    audioManager.onCanplay(() => {
      wx.hideLoading()
      this.setData({
        ifShowLoading: true
      })
    })
    // 监听背景音频自然停止事件
    audioManager.onEnded(() => {
      this.setData({
        playStatus: 1
      })
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
    checkIfLogin(app, this)
    this.hiddenControl(false)
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
    return {
      title: this.data.audioInformationList.title,
      path: `pages/audioPage/index?_id=${this.data._id}`
    }
  },
  // 播放条修改事件
  handSlider(e){
    if (e.detail.touchSlip){
      this.data.touchSlip = e.detail.touchSlip      
    }else{
      this.data.touchSlip = e.detail.touchSlip      
      this.seekAudio(e.detail.value)
    }
  },
  /**
   * 点击播放
   */
  handlePlay(){
    if (typeof audioManager.src == 'undefined' || audioManager.src == '') {
      audioManager.src = this.data.audioInformationList.audioUrl;
    }else{
      audioManager.play()
    }
  },
  /**
   * 点击暂停
   */
  handlePause(){
    audioManager.pause()
  },
  /**
   * 点击停止
   */
  handleStop(){
    audioManager.stop()
  },
  // 隐藏控制器
  hiddenControl(ifshow){
    if (ifshow) {
      this.setData({
        hiddenController: true
      })    
    }else{
      this.setData({
        hiddenController: false
      })    
    }

  },
  barrageControlContainerTap(){
    console.log('点击了弹幕')
  },
  // 点击了主播放器
  handleVudiPlayertap(){
    this.hiddenControl(!this.data.hiddenController)
  },

  // 获得评论
  getList(_id){
    const db = wx.cloud.database()

    var that = this
    db.collection('comment').where({
      audioId: _id
    }).count({
      success: function (res) {
        that.setData({
          totalComment: res.total
        })
      }
    })
    console.log(_id)
    db.collection('comment').where({
      audioId: _id
    }).orderBy('saveTime', 'desc').limit(this.data.limit).get().then(res=>{
      let nowDate = new Date()
      for(let i in res.data){
        let thisDate = new Date(res.data[i].saveTime)
        let cha = nowDate.getTime() - thisDate.getTime()
        if ( cha < 86400000){
          if (cha/1000/60 <=1){
            res.data[i].saveTime = '刚刚'
          } else if (cha/1000/60 <60){
            res.data[i].saveTime = `${Math.round(cha/1000/60)}分钟前`      
          }else{
            res.data[i].saveTime = `${Math.round(cha/1000/60/60)}小时前`      
          }
        } else if (cha < 172800000){
          res.data[i].saveTime = '一天前'
        }else if(thisDate.getFullYear()==now.getFullYear()){
          res.data[i].saveTime = `${thisDate.getMonth() + 1 < 10 ? '0' + (thisDate.getMonth() + 1) : thisDate.getMonth() + 1}月${thisDate.getDate() < 10 ? '0' + thisDate.getDate() : thisDate.getDate()}日`          
        }
        console.log(res.data[i].saveTime)
      }
      that.data.commentList.push(...res.data)
      that.setData({
        commentList: that.data.commentList
      })
    })
      .catch(res=>console.error(res))
  },

  // 获得弹幕
  getBarrage(_id) {
    const db = wx.cloud.database()
    var that = this
    db.collection('barrage').where({
      audioId: _id
    }).count({
      success: function (res) {
        that.setData({
          totalBarrage: res.total
        })
      }
    })
    console.log(_id)
    db.collection('barrage').where({
      audioId: _id
    }).orderBy('audioPlayTime', 'asc').get().then(res => {
      that.setData({
        getBarrageList: [...res.data]
      },()=>{
        that.StarShootbarrage()
      })
    })
      .catch(res => console.error(res))
  },
  StarShootbarrage() {
    for (let i in this.data.getBarrageList){
      setTimeout(()=>{
        this.data.barrageList.push(this.data.getBarrageList[i])
        this.setData({
          barrageList: this.data.barrageList
        })
      }, this.data.getBarrageList.audioPlayTime)
    }
  },
  addNewBarrage(e){
    let newBarrage = {}
    let userInfo = wx.getStorageSync('userInfo')
    for(let i in e.detail){
      newBarrage[i] = e.detail[i]
    }
    newBarrage.avatarUrl = userInfo.avatarUrl
    newBarrage.nickName = userInfo.nickName
    this.data.barrageList.push(newBarrage)
    this.setData({
      barrageList: this.data.barrageList
    })
  }
})