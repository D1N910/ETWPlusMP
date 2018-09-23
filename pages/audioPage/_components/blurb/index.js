// pages/audioPage/_component/blurb/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    audioInformationList:{
      type:Object,
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
    // 复制链接
    copyUrl(e) {
      if (e.target.dataset.url != '0') {
        wx.setClipboardData({
          data: e.target.dataset.url,
          success: function (res) {
            wx.showToast({
              icon: 'none',
              title: '链接成功复制到剪贴板'
            })
          }
        })
      }
    },
  }
})
