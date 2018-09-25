
// components/miniPlay/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  pageLifetimes: {
    // 组件所在页面的生命周期函数
    show: function () {
      var audioManager = wx.getBackgroundAudioManager()      
      console.log(audioManager.src)
      let inPlay = false
      if(typeof audioManager.src != 'undefined'){
        inPlay = !audioManager.paused
      }
      this.setData({
        inPlay,
        onPlayAudio: wx.getStorageSync('onPlayAudio')
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    inPlay: false,
    onPlayAudio: {}
  },
  /**
   * 组件的方法列表
   */
  methods: {
    navigator2audio(){
      wx.redirectTo({
        url: `/pages/audioPage/index?_id=${this.data.onPlayAudio._id}`,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  }
})
