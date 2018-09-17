// 定义全局的音频
var audioManager = wx.getBackgroundAudioManager()
// pages/audioPage/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverImage: 'https://images.fireside.fm/podcasts/images/8/8dd8a56f-9636-415a-8c00-f9ca6778e511/episodes/e/efe15a9a-af08-4209-ba89-36ff79dfca60/header.jpg',
    audioUrl:'https://aphid.fireside.fm/d/1437767933/8dd8a56f-9636-415a-8c00-f9ca6778e511/efe15a9a-af08-4209-ba89-36ff79dfca60.mp3',
    audioTitle: '声东击西',
    audioEpname: '声东击西',
    audioSinger: '张晶，徐涛',
    audioWebUrl: 'https://music.163.com/#/song?id=299939',
    logoVisiable: true,
    playPosition: 0,
    maxLength: 0,
    touchSlip: false,
    playStatus:1,
    ifShowLoading: false,
    onTimeUpdate: '0:00',
    allTime: '0:00'
  },

  /**
   * 图片加载完成
   */
  haveLoad(){
    // 图片加载完成后隐藏logo
    this.setData({
      logoVisiable:false      
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
      if(!this.data.touchSlip){
        let minuteInt = parseInt(audioManager.currentTime / 60)
        let secondInt = parseInt((audioManager.currentTime / 60 - minuteInt) * 60)
        let nowTimeMinutes = minuteInt < 10 ? '0' + minuteInt : minuteInt
        let nowTimeSecond = secondInt < 10 ? '0' + secondInt : secondInt
        this.setData({
          playPosition: audioManager.currentTime,
          onTimeUpdate: `${nowTimeMinutes}:${nowTimeSecond}`
        })
      }
    })
    // 监听背景音频暂停事件
    audioManager.onPause(()=>{
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
    audioManager.onWaiting(()=>{
      this.setData({
        ifShowLoading: false
      })
    })
    // 监听音频进入可以播放状态的事件，但不保证后面可以流畅播放
    audioManager.onCanplay(()=>{
      wx.hideLoading()
      this.setData({
        ifShowLoading: true
      })
    })
    // 监听背景音频自然停止事件
    audioManager.onEnded(()=>{
      this.setData({
        playStatus: 1
      })
      console.log(audioManager.src)
    })
    audioManager.src = this.data.audioUrl
    audioManager.title = this.data.audioTitle
    audioManager.epname = this.data.audioEpname
    audioManager.singer = this.data.audioSinger
    audioManager.WebUrl = this.data.audioWebUrl
    audioManager.coverImgUrl = this.data.coverImage
  },
  /**
   * 更改完成
   */
  handleSliderChange(e){
    this.seekAudio(e.detail.value)
  },
  /**
   * 开始更改
   */
  handleChangeing(){
    this.data.touchSlip = true
  },
  /**
   * 跳转页面
   */
  seekAudio(currentTime){
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
  }
})