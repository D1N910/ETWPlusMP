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
    playStatus:1
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
      console.log(audioManager.currentTime)
      if (this.data.maxLength == 0) {
        this.setData({
          maxLength: audioManager.duration
        })
      }
      // 如果是不在拖动才动态改变
      if(!this.data.touchSlip){
        console.log(audioManager.currentTime)
        this.setData({
          playPosition: audioManager.currentTime
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
      wx.showLoading({
        title: '跳转中',
        mask:true
      })
    })
    audioManager.onSeeked(()=>{
      wx.hideLoading()
      this.data.touchSlip = false      
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