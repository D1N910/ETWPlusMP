// pages/audioPage/_components/audio-function-module/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    audioInformationList: {
      type: Object,
      value: {}
    },
    hasUserInfo: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 无需权限更新数据
    updateAudioNormal(e) {
      this.data.audioInformationList[e.currentTarget.dataset.type] = this.data.audioInformationList[e.currentTarget.dataset.type] + 1
      this.setData({
        audioInformationList: this.data.audioInformationList
      })
      wx.cloud.callFunction({
        name: 'updateAudioNormal',
        data: {
          _id: this.data.audioInformationList._id,
          updata: {
            [e.currentTarget.dataset.type]: 1
          }
        }
      })
    },
    // 更新数据
    updateAudio(e) {
      if (!this.data.hasUserInfo){
        wx.navigateTo({
          url: '/pages/login/index',
          success: function(res) {},
          fail: function(res) {},
          complete: function(res) {},
        })
        return false
      }
      var that = this
      var changeNumber = 0

      if (this.data.audioInformationList[`if${e.currentTarget.dataset.type}`]){
        changeNumber = -1
        that.data.audioInformationList[`if${e.currentTarget.dataset.type}`] = false
      }else{
        changeNumber = 1        
        that.data.audioInformationList[`if${e.currentTarget.dataset.type}`] = true        
      }
      that.data.audioInformationList[e.currentTarget.dataset.type] = that.data.audioInformationList[e.currentTarget.dataset.type] + changeNumber
      wx.cloud.callFunction({
        name: 'updateAudio',
        data: {
          _id: this.data.audioInformationList._id,
          updata: {
            [e.currentTarget.dataset.type]: changeNumber
          }
        },
        success(res) {
          console.log(res)
          if (changeNumber==1){
            wx.showToast({
              title: `声东击西:成功 ${e.currentTarget.dataset.type}`,
              icon: 'none'
            })
          }else{
            wx.showToast({
              title: `声东击西:成功取消 ${e.currentTarget.dataset.type}`,
              icon: 'none'
            })
          }
          that.setData({
            audioInformationList: that.data.audioInformationList
          })
        }
      })
    }
  }
})
