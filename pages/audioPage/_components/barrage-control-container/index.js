// pages/audioPage/_components/Barrage/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    playPosition: {
      type: Number,
      value: 0
    },
    _id: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputFocus:false,
    barrageText: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // input聚焦
    handleInputFocus(){
      if (!wx.getStorageSync('hasUserInfo')) {
        wx.navigateTo({
          url: '/pages/login/index',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        return false
      }
      this.setData({
        inputFocus: true
      })
    },
    // input失焦
    handleInputBlur() {
      this.setData({
        inputFocus: false
      })
    },
    // 输入
    handleInput(e){
      this.setData({
        barrageText: e.detail.value
      })
    },
    // 点击确认
    handleConfirm(){
      if (!wx.getStorageSync('hasUserInfo')) {
        wx.navigateTo({
          url: '/pages/login/index',
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
        return false
      }
      if (this.data.barrageText == ''){
        return false
      }
      var that = this
      let barrageText = this.data.barrageText
      let playPosition = this.data.playPosition
      wx.cloud.callFunction({
        name: 'postBarrage',
        data: {
          barrageText,
          audioPlayTime: playPosition,
          _id: this.data._id
        },
        success(res) {
          console.log(res)
          that.triggerEvent('addNewBarrage', {
            _id: res.result._id,
            barrageText,
            playPosition
          })
          
        }
      })
      that.setData({
        barrageText: ''
      })
      wx.showToast({
        title: '声东击西:弹幕发射成功',
        icon: 'none'
      })
    }
  }
})
