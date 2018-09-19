// 定义全局的音频
var audioManager = wx.getBackgroundAudioManager()
// pages/audioPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenController: true,// 隐藏控制器
    topOuterBorderAn: [], // 顶部动画
    controllerAn: [], //控制器动画
    coverImage: '',
    audioUrl:'',
    audioTitle: '',
    audioEpname: '',
    audioSinger: '',
    audioWebUrl: '',
    logoVisiable: true,
    playPosition: 0,
    maxLength: 0,
    touchSlip: false,
    playStatus:1,
    ifShowLoading: false,
    onTimeUpdate: '',
    allTime: '',
    percent: 0
  },

  /**
   * 图片加载完成
   */
  haveLoad(){
    // 图片加载完成后隐藏logo
    this.setData({
      logoVisiable:false      
    })
  },
  /**
   * 更改完成
   */
  handleSliderChange(e){
    this.data.touchSlip = false
    this.seekAudio(e.detail.value)
  },
  /**
   * 开始更改
   */
  handleChangeing(e){
    console.log(e.detail.value)
    let minuteInt = parseInt(e.detail.value / 60)
    let secondInt = parseInt((e.detail.value  / 60 - minuteInt) * 60)
    let nowTimeMinutes = minuteInt < 10 ? '0' + minuteInt : minuteInt
    let nowTimeSecond = secondInt < 10 ? '0' + secondInt : secondInt
    this.setData({
      onTimeUpdate: `${nowTimeMinutes}:${nowTimeSecond}`
    })
    this.data.touchSlip = true
  },
  /**
   * 跳转页面
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
    this.data._id = options._id
    this.data._id = '5b9a850f97880d3b822d5dd7'
    wx.cloud.init({
      env: 'etwplus-test-485c18'
    })
    const db = wx.cloud.database()
    db.collection('audioList').where({
      _id: this.data._id
    }).get({
      success: res => {
        console.log(res.data)
        if (res.data.length>=1){
          audioManager.src = this.data.audioUrl = res.data[0].audioUrl
          audioManager.title = this.data.audioTitle = res.data[0].title
          audioManager.epname = this.data.audioEpname = '声东击西'
          let audioSinger = ''
          for (let i in res.data[0].participant){
            for (let j in res.data[0].participant[i]){
              audioSinger += ` ${res.data[0].participant[i][j].name}`
            }
          }
          audioManager.singer = this.data.audioSinger = audioSinger
          audioManager.WebUrl = this.data.audioWebUrl = 'https://music.163.com/#/song?id=299939'
          audioManager.coverImgUrl = this.data.coverImage = res.data[0].header
          this.setData({
            audioUrl: this.data.audioUrl,
            audioTitle: this.data.audioTitle,
            audioEpname: this.data.audioEpname,
            audioWebUrl: this.data.audioWebUrl,           
            coverImage: this.data.coverImage,
            audioSinger: this.data.audioSinger
          })
        }
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
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
        this.setData({
          percent: audioManager.buffered / audioManager.duration * 100,
          playPosition: audioManager.currentTime,
          onTimeUpdate: `${nowTimeMinutes}:${nowTimeSecond}`
        }, () => {
        })
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
      console.log(audioManager.src)
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
    this.hiddenControl(true)
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

  },

  /**
   * 点击播放
   */
  handlePlay(){
    console.log(audioManager)
    if (typeof audioManager.src == 'undefined' || audioManager.src == '') {
      audioManager.src = this.data.audioUrl
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
      var topOuterBorderAn = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease',
      })
      var controllerAn = wx.createAnimation({
        duration: 400,
        timingFunction: 'ease',
      })
      this.topOuterBorderAn = topOuterBorderAn
      this.controllerAn = controllerAn

      topOuterBorderAn.translateY(80).step()
      controllerAn.translateY(-80).step()
      this.setData({
        topOuterBorderAn: topOuterBorderAn.export(),
        controllerAn: controllerAn.export()
      })
    }else{
      var topOuterBorderAn = wx.createAnimation({
        duration: 0,
        timingFunction: 'step-start',
      })
      var controllerAn = wx.createAnimation({
        duration: 0,
        timingFunction: 'step-start',
      })
      this.topOuterBorderAn = topOuterBorderAn
      this.controllerAn = controllerAn

      topOuterBorderAn.translateY(-80).step()
      controllerAn.translateY(80).step()
      this.setData({
        topOuterBorderAn: topOuterBorderAn.export(),
        controllerAn: controllerAn.export()
      })
    }
    this.data.hiddenController = !ifshow      
  },
  // 点击了主播放器
  handleVudiPlayertap(){
    this.hiddenControl(this.data.hiddenController)
  }
})